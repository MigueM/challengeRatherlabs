import { useState, useEffect, PropsWithChildren, useCallback } from 'react'
import { MetaMaskContext, WalletState } from './MetaMaskContext'
import surveyData from '../survey-sample.json'
import { formatBalance } from '../utils/format'
import detectEthereumProvider from '@metamask/detect-provider'
import { abi } from '../abi'
import { ethers, BrowserProvider, Eip1193Provider } from 'ethers'

const disconnectedState: WalletState = {
  accounts: [],
  balance: '',
  chainId: '',
}

declare global {
  interface Window {
    ethereum: Eip1193Provider & BrowserProvider
  }
}
export const MetaMaskContextProvider = ({ children }: PropsWithChildren) => {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const clearError = () => setErrorMessage('')
  const [wallet, setWallet] = useState(disconnectedState)
  const quizContractAddress = process.env.REACT_APP_QUIZ_CONTRACT_ADDR
  const addrPrefix = process.env.REACT_APP_ACCOUNT_ADD_PREFIX

  const _updateWallet = useCallback(async (providedAccounts?: string[]) => {
    const accounts =
      providedAccounts ||
      (await window.ethereum.request({ method: 'eth_accounts' }))
    if (accounts.length === 0) {
      setWallet(disconnectedState)
      return
    }
    const callObject = {
      to: quizContractAddress,
      data: `0x70a08231000000000000000000000000${accounts[0].slice(2)}`,
    }
    const balance = formatBalance(
      await window.ethereum.request({
        method: 'eth_call',
        params: [callObject, 'latest'],
      })
    )
    const chainId = await window.ethereum.request({
      method: 'eth_chainId',
    })
    setWallet({ accounts, balance, chainId })
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  //memoize functions 👇
  const updateWalletAndAccounts = useCallback(
    () => _updateWallet(),
    [_updateWallet]
  )
  const updateWallet = useCallback(
    (accounts: any) => _updateWallet(accounts),
    [_updateWallet]
  )

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider()
      setHasProvider(Boolean(provider))

      if (provider) {
        updateWalletAndAccounts()
        window.ethereum.on('accountsChanged', updateWallet)
        window.ethereum.on('chainChanged', updateWalletAndAccounts)
      }
    }
    getProvider()
    return () => {
      window.ethereum?.removeListener('accountsChanged', updateWallet)
      window.ethereum?.removeListener('chainChanged', updateWalletAndAccounts)
    }
  }, [updateWallet, updateWalletAndAccounts])

  const connectMetaMask = async () => {
    setIsConnecting(true)
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      clearError()
      updateWallet(accounts)
    } catch (err: any) {
      setErrorMessage(err.message)
    }
    setIsConnecting(false)
  }

  const changeToGoerlyNetwork = async () => {
    if (window.ethereum) {
      try {
        clearError()
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x5' }],
        })
      } catch (error: any) {
        setErrorMessage(error.message)
      }
    }
  }

  const addQuizToken = async () => {
    try {
      clearError()
      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: quizContractAddress,
            symbol: 'QUIZ',
            decimals: 18,
          },
        },
      })
    } catch (error: any) {
      setErrorMessage(error.message)
    }
  }

  interface answers {
    surveyID: number
    answerIds: number[]
  }

  const submitSurvey = async (answers: answers) => {
    const { surveyID, answerIds } = answers
    try {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(quizContractAddress, abi, signer)
      await contract.submit(surveyID, answerIds)
    } catch (error: any) {
      setErrorMessage(error.message)
    }
  }

  return (
    <MetaMaskContext.Provider
      value={{
        wallet,
        hasProvider,
        error: !!errorMessage,
        errorMessage,
        isConnecting,
        surveyData,
        connectMetaMask,
        clearError,
        changeToGoerlyNetwork,
        addQuizToken,
        submitSurvey,
      }}
    >
      {children}
    </MetaMaskContext.Provider>
  )
}
