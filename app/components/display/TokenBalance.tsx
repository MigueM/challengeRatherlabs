import { Box, Button, Container } from '@mui/material'
import { useEffect, useState } from 'react'

interface TokenBalanceData {
  tokenAddress: string
  account: string | null
  wallet: any
  AddQuizToken: () => void
}

const TokenBalance = ({
  tokenAddress,
  account,
  AddQuizToken,
  wallet,
}: TokenBalanceData) => {
  const [balance, setBalance] = useState<string | null>(null)
  const [hasToken, setHasToken] = useState<boolean>(false)

  useEffect(() => {
    if (account && tokenAddress && window.ethereum) {
      // Create a call object for the balanceOf function
      const callObject = {
        to: tokenAddress,
        data: `0x70a08231000000000000000000000000${account.slice(2)}`, // Data for the balanceOf function
      }

      // Send the call request to Metamask
      window.ethereum
        .request({ method: 'eth_call', params: [callObject, 'latest'] })
        .then((result: string) => {
          // Convert the result from hex to decimal
          const balanceDecimal = parseInt(result, 16)
          setBalance(balanceDecimal.toString())
          setHasToken(balanceDecimal > 0)
        })
        .catch((error: Error) => {
          console.error('Error fetching token balance:', error)
        })
    }
  }, [account, tokenAddress])

  return (
    <Box>
      <h2 onClick={AddQuizToken}>
        $QUIZ:
        {wallet.accounts && (balance || 'Loading...')}
      </h2>
      {/* {hasToken ? (
      ) : (
        <Button onClick={AddQuizToken}>Add QUIZ token</Button>
      )} */}
    </Box>
  )
}

export default TokenBalance
