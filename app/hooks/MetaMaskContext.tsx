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
  connectMetaMask: () => Promise<void>
  clearError: () => Promise<void>
  changeToGoerlyNetwork: () => Promise<void>
  addQuizToken: () => Promise<void>
  submitSurvey: (answers: any) => Promise<void>
}

export const MetaMaskContext = createContext<MetaMaskContextData | null>(null)
