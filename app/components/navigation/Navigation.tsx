'use client'
import { useMetaMask } from '@/app/hooks/useMetaMask'
import { formatAddress } from '@/app/utils/format'
import styles from './navigation.module.css'
import Link from 'next/link'
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from '@mui/material'

export const Navigation = () => {
  const { wallet, hasProvider, isConnecting, connectMetaMask, addQuizToken } =
    useMetaMask()
  return (
    <AppBar>
      <Toolbar>
        <Typography className={styles.leftNav} variant="h6" component="div">
          Ratherlabs Challenge - frontend developer
        </Typography>
        <Box className={styles.rightNav}>
          {!hasProvider && (
            <Link href="https://metamask.io" target="_blank" rel="noreferrer">
              <Button className={styles.navButton} variant="contained">
                Install MetaMask
              </Button>
            </Link>
          )}
          {hasProvider && wallet.accounts.length < 1 && (
            <Button
              className={styles.navButton}
              disabled={isConnecting}
              onClick={connectMetaMask}
              variant="contained"
            >
              Connect MetaMask
            </Button>
          )}
          {hasProvider && wallet.accounts.length > 0 && (
            <Box className={styles.walletData}>
              <Button variant="text" onClick={() => addQuizToken()}>
                $QUIZ:{wallet.balance}
              </Button>
              <a
                className="text_link tooltip-bottom"
                href={`https://etherscan.io/address/${wallet.accounts[0]}`}
                target="_blank"
                data-tooltip="Open in Block Explorer"
                rel="noreferrer"
              >
                <Button variant="outlined">
                  {formatAddress(wallet.accounts[0])}
                </Button>
              </a>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
