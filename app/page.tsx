'use client'
import './globals.css'
import styles from './app.module.css'

import { Navigation } from './components/navigation/Navigation'
import { Display } from './components/display/Display'
import { MetaMaskError } from './components/metaMaskError/MetaMaskError'
import { MetaMaskContextProvider } from './hooks/MetaMaskProvider'
import { Box, ThemeProvider } from '@mui/material'
import { darkTheme } from './utils/theme'

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <MetaMaskContextProvider>
        <Box className={styles.appContainer}>
          <Navigation />
          <Display />
          <MetaMaskError />
        </Box>
      </MetaMaskContextProvider>
    </ThemeProvider>
  )
}

export default App
