import { useMetaMask } from '@/app/hooks/UseMetaMask'
import { formatChainAsNum } from '@/app/utils/format'
import styles from './display.module.css'
import { Box, Button, Container, Stack } from '@mui/material'

const Install = ({ hasProvider }: { hasProvider: boolean | null }) => {
  if (!hasProvider)
    return (
      <Box>
        <Container> To continue you need to install metamask 🏗️ </Container>
      </Box>
    )
  return null
}

const LogIn = ({
  signed,
  hasProvider,
}: {
  signed: boolean | null
  hasProvider: boolean | null
}) => {
  if (!signed && hasProvider)
    return (
      <Box>
        <Container> Please login with metamask </Container>
      </Box>
    )
  return null
}

const ChangeNetwork = ({
  signed,
  changeToGoerlyNetwork,
}: {
  signed: boolean | null
  changeToGoerlyNetwork: () => void
}) => {
  if (signed)
    return (
      <Box>
        <Container>This app is meant to run on Goerly Test Network</Container>
        <Button onClick={() => changeToGoerlyNetwork()}>Change Network</Button>
      </Box>
    )
  return null
}

export const Display = () => {
  const { wallet, hasProvider, changeToGoerlyNetwork } = useMetaMask()

  const signed = wallet.accounts.length > 0
  const signedAndGoerly = signed && formatChainAsNum(wallet.chainId) === 5

  return (
    <Box className={styles.display}>
      <Install hasProvider={hasProvider} />
      <LogIn signed={signed} hasProvider={hasProvider} />

      {signedAndGoerly ? (
        <Box>
          <Container> You are connected to Goerly Network </Container>
        </Box>
      ) : (
        <ChangeNetwork
          signed={signed}
          changeToGoerlyNetwork={changeToGoerlyNetwork}
        />
      )}
    </Box>
  )
}
