import { useMetaMask } from '@/app/hooks/useMetaMask'
import styles from './metaMaskError.module.css'
import { BottomNavigation, Box, Container } from '@mui/material'

export const MetaMaskError = () => {
  const { error, errorMessage, clearError } = useMetaMask()
  return (
    <BottomNavigation
      className={styles.metaMaskError}
      style={
        error ? { backgroundColor: 'brown' } : { backgroundColor: 'unset' }
      }
    >
      {error && (
        <Box onClick={clearError}>
          <Container className={styles.errorMessage}>
            <strong>Error: </strong> {errorMessage}
          </Container>
        </Box>
      )}
    </BottomNavigation>
  )
}
