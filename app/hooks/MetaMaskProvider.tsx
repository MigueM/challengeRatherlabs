import { useState, useEffect, PropsWithChildren, useCallback } from 'react'
import { MetaMaskContext, WalletState } from './MetaMaskContext'
import {
  connectMetaMask,
  changeToGoerlyNetwork,
  addQuizToken,
  submitSurvey,
} from './MetaMaskFunctions'
import surveyData from '../../survey-sample.json'
import { formatBalance } from '../utils/format'
import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from 'web3'

const disconnectedState: WalletState = {
  accounts: [],
  balance: '',
  chainId: '',
}
//window.etherum error 🤷 tried solving it declaring it with the env.d.ts file but only this works
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
  const quizTokenAddr = '0x437eF217203452317C3C955Cf282b1eE5F6aaF72'
  const quizTokenAddrENV = process.env.QUIZ_TOKEN_ADDR
  const web3 =
    typeof window !== 'undefined' && (window as any)?.ethereum
      ? new Web3((window as any).ethereum)
      : null

  const _updateWallet = useCallback(async (providedAccounts?: any) => {
    const accounts =
      providedAccounts ||
      (await window.ethereum.request({ method: 'eth_accounts' }))
    if (accounts.length === 0) {
      setWallet(disconnectedState)
      return
    }
    const callObject = {
      to: quizTokenAddr,
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

  return (
    <MetaMaskContext.Provider
      value={{
        wallet,
        hasProvider,
        error: !!errorMessage,
        errorMessage,
        isConnecting,
        surveyData,
        connectMetaMask: () =>
          connectMetaMask({
            setIsConnecting,
            setErrorMessage,
            updateWallet,
            clearError,
          }),
        clearError,
        changeToGoerlyNetwork: () =>
          changeToGoerlyNetwork({ clearError, setErrorMessage }),
        addQuizToken: () => addQuizToken({ setErrorMessage, quizTokenAddr }),
        submitSurvey: () =>
          submitSurvey({ wallet, quizTokenAddr, web3, setErrorMessage }),
      }}
    >
      {children}
    </MetaMaskContext.Provider>
  )
}
