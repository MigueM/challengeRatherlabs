import { useMetaMask } from '@/app/hooks/UseMetaMask'
import styles from './metaMaskError.module.css'
import { BottomNavigation, Box } from '@mui/material'

export const MetaMaskError = () => {
  const { error, errorMessage, clearError } = useMetaMask()
  return (
    <BottomNavigation
      className={styles.metaMaskError}
      style={
        error ? { backgroundColor: 'brown' } : { backgroundColor: 'black' }
      }
    >
      {error && (
        <Box onClick={clearError}>
          <strong>Error:</strong> {errorMessage}
        </Box>
      )}
    </BottomNavigation>
  )
}
