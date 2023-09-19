import { useMetaMask } from '@/app/hooks/useMetaMask'
import { formatChainAsNum } from '@/app/utils/format'
import styles from './display.module.css'
import { Box, Button, Container } from '@mui/material'
import Survey from '../survey/Survey'

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
  const {
    wallet,
    hasProvider,
    changeToGoerlyNetwork,
    submitSurvey,
    surveyData,
  } = useMetaMask()
  const signed = wallet.accounts.length > 0
  const signedAndGoerly = signed && formatChainAsNum(wallet.chainId) === 5
  return (
    <Box className={styles.display}>
      <Install hasProvider={hasProvider} />
      <LogIn signed={signed} hasProvider={hasProvider} />

      {signedAndGoerly ? (
        <Box>
          <Box className={styles.balanceContainer}>
            <Survey surveyData={surveyData} submitSurvey={submitSurvey} />
          </Box>
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
