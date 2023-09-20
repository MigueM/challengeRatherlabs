import { useContext } from 'react'
import { MetaMaskContext, MetaMaskContextData } from './MetaMaskContext'

export const useMetaMask = (): MetaMaskContextData => {
  const context = useContext(MetaMaskContext)
  if (context === null) {
    throw new Error(
      'useMetaMask must be used within a "MetaMaskContextProvider"'
    )
  }
  return context
}
