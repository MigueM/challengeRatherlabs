import surveyAbi from '../abi.json'
import { WalletState } from './MetaMaskContext'

interface connectMetaMaskProps {
  setIsConnecting: (value: boolean) => void
  setErrorMessage: (value: string) => void
  updateWallet: (accounts: string) => Promise<void>
  clearError: () => void
}
export const connectMetaMask = async ({
  setIsConnecting,
  setErrorMessage,
  updateWallet,
  clearError,
}: connectMetaMaskProps) => {
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

interface changeToGoerlyNetworkProps {
  clearError: () => void
  setErrorMessage: (value: string) => void
}
export const changeToGoerlyNetwork = async ({
  clearError,
  setErrorMessage,
}: changeToGoerlyNetworkProps) => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x5' }],
      })
      clearError()
    } catch (error: any) {
      setErrorMessage(error.message)
    }
  }
}

interface addQuizTokenProps {
  setErrorMessage: (value: string) => void
  quizTokenAddr: string
}
export const addQuizToken = async ({
  setErrorMessage,
  quizTokenAddr,
}: addQuizTokenProps) => {
  try {
    await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: quizTokenAddr,
          symbol: 'QUIZ',
          decimals: 18,
        },
      },
    })
  } catch (error: any) {
    setErrorMessage(error.message)
  }
}

interface submitSurveyProps {
  wallet: WalletState
  quizTokenAddr: string
  web3: any
  setErrorMessage: (value: string) => void
}
export const submitSurvey = async ({
  wallet,
  quizTokenAddr,
  web3,
  setErrorMessage,
}: submitSurveyProps) => {
  let contract = new web3.eth.Contract(surveyAbi, quizTokenAddr)
  try {
    // Call the `submit` method of the smart contract
    const result = await contract.methods.submit(199, [1, 2, 3]).send({
      from: wallet.accounts[0], // Specify the sender's address
      gas: '2000000', // Specify gas limit (adjust as needed)
    })
    // Handle the result of the transaction
    console.log('result', result)
    // You can also listen for events emitted by the contract if needed
    // For example:
    contract.events.MyEvent({}, (error: any, event: any) => {
      if (!error) {
        setErrorMessage(event)
      }
    })
  } catch (error: any) {
    setErrorMessage(error.message)
  }
}
