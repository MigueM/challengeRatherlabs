import { useMetaMask } from '@/app/hooks/UseMetaMask'
import { formatChainAsNum } from '@/app/utils/format'
import styles from './display.module.css'
import { Box, Container, Stack } from '@mui/material'

export const Display = () => {
  const { wallet, hasProvider } = useMetaMask()
  console.log(wallet)
  return (
    <Box className={styles.display}>
      {!hasProvider && (
        <Box>
          <Container> To continue you need to install metamask 🏗️ </Container>
        </Box>
      )}
      {wallet.accounts.length < 1 && (
        <Box>
          <Container> Please login with metamask </Container>
        </Box>
      )}
      {wallet.accounts.length > 0 && (
        <Stack>
          <Container>Wallet Accounts: {wallet.accounts[0]}</Container>
          <Container>Wallet Balance: {wallet.balance}</Container>
          <Container>Hex ChainId: {wallet.chainId}</Container>
          <Container>
            Numeric ChainId: {formatChainAsNum(wallet.chainId)}
          </Container>
        </Stack>
      )}
    </Box>
  )
}
