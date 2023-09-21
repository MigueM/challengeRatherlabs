import { createContext } from 'react'
import { surveyData } from '../components/survey/Survey'
import { answers } from '../components/survey/Results'

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
  surveyData: surveyData
  clearError: () => void
  connectMetaMask: () => Promise<void>
  changeToGoerlyNetwork: () => Promise<void>
  addQuizToken: () => Promise<void>
  submitSurvey: (answers: answers) => Promise<void>
}

export const MetaMaskContext = createContext<MetaMaskContextData | null>(null)
