import { createContext } from 'react'

export interface WalletState {
  accounts: string[]
  balance: string
  chainId: string
}

export interface MetaMaskContextData {
  wallet: WalletState
  hasProvider: boolean | null
  error: boolean
  errorMessage: string
  isConnecting: boolean
  surveyData: any
  connectMetaMask: () => void
  clearError: () => void
  changeToGoerlyNetwork: () => void
  addQuizToken: () => Promise<void>
  submitSurvey: () => void
}

export const MetaMaskContext = createContext<MetaMaskContextData>(
  {} as MetaMaskContextData
)
