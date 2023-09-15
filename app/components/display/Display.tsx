import { changeNetwork, useMetaMask } from '@/app/hooks/UseMetaMask'
import { formatChainAsNum } from '@/app/utils/format'
import styles from './display.module.css'
import { Box, Button, Container, Stack } from '@mui/material'

export const Display = () => {
  const { wallet, hasProvider, setErrorMessage, clearError } = useMetaMask()
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

      {formatChainAsNum(wallet.chainId) === 5 ? (
        <Box>
          <Container> You are connected to Goerly Network </Container>
        </Box>
      ) : (
        <Box>
          <Container>
            {' '}
            This app is meant to be running on Goerly Test Network{' '}
          </Container>
          <Button
            onClick={() => changeNetwork({ setErrorMessage, clearError })}
          >
            Change Network
          </Button>
        </Box>
      )}
    </Box>
  )
}
