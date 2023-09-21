import { useState, useEffect, PropsWithChildren, useCallback } from 'react'
import { MetaMaskContext, WalletState } from './MetaMaskContext'
import surveyData from '../survey-sample.json'
import { formatBalance } from '../utils/format'
import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from 'web3'
import { abi } from '../abi'

const disconnectedState: WalletState = {
  accounts: [],
  balance: '',
  chainId: '',
}

declare global {
  interface Window {
    ethereum: any
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

  const getWeb3 = (): Web3 | null => {
    if (typeof window !== 'undefined' && window?.ethereum) {
      return new Web3(window.ethereum)
    } else {
      return null
    }
  }

  const _updateWallet = useCallback(async (providedAccounts?: string[]) => {
    let accounts = []
    if (providedAccounts) {
      accounts = providedAccounts
    } else {
      try {
        clearError()
        const account = await window.ethereum.request({
          method: 'eth_accounts',
        })
        if (Array.isArray(account) && typeof account[0] === 'string') {
          accounts = account
        } else {
          setErrorMessage('Invalid response accounts')
        }
      } catch (err: any) {
        setErrorMessage(err.message)
      }
    }

    if (accounts.length === 0) {
      setWallet(disconnectedState)
      return
    }

    let balance = ''
    try {
      clearError()
      const callObject = {
        to: quizContractAddress,
        data: `${addrPrefix}${accounts[0].slice(2)}`,
      }
      const call = await window.ethereum.request({
        method: 'eth_call',
        params: [callObject, 'latest'],
      })
      balance = formatBalance(call)
    } catch (err: any) {
      setErrorMessage(err.message)
    }

    let chainId = ''
    try {
      clearError()
      const chain = await window.ethereum.request({
        method: 'eth_chainId',
      })
      chainId = chain
    } catch (err: any) {
      setErrorMessage(err.message)
    }

    setWallet({ accounts, balance, chainId })
  }, [])

  const updateWalletAndAccounts = useCallback(
    () => _updateWallet(),
    [_updateWallet]
  )
  const updateWallet = useCallback(
    (accounts: string[]) => _updateWallet(accounts),
    [_updateWallet]
  )

  useEffect(() => {
    const getProvider = async () => {
      let provider: any | null

      try {
        clearError()
        const provider = await detectEthereumProvider()
        setHasProvider(Boolean(provider))
      } catch (err: any) {
        setErrorMessage(err.message)
      }

      if (provider) {
        updateWalletAndAccounts()
        window.ethereum.on('accountsChanged', _updateWallet())
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
      clearError()
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
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
    let contract: any
    const web3 = getWeb3()
    if (web3) {
      contract = new web3.eth.Contract(abi, quizContractAddress)
    } else {
      contract = null
    }

    try {
      const contractSubmit = contract?.methods.submit(surveyID, answerIds)
      clearError()
      await contractSubmit.send({
        from: wallet.accounts[0],
        gas: '2000000',
      })
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
