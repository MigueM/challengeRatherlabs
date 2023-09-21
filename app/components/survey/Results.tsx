import { Box, Button, Container, List, ListItem } from '@mui/material'
import styles from './survey.module.css'
import { option, question, selectedOption } from './Survey'

export interface answers {
  surveyID: number
  answIds: string[]
}
interface ResultsProps {
  questions: question[]
  selectedOptions: selectedOption[]
  submitSurvey: (answers: answers) => void
}
const Results = ({
  questions,
  selectedOptions,
  submitSurvey,
}: ResultsProps) => {
  const answIds = selectedOptions.map((option: selectedOption) => option.index)
  const answers = { surveyID: 1, answerIds: answIds }
  return (
    <Box className={styles.surveyResultsContainer}>
      <h3>Thank you for completing the survey</h3>
      <p>Here are your answers:</p>
      <Box className={styles.answersContainer}>
        <List>
          {questions.map((question: question, index: number) => (
            <ListItem key={index}>
              <Container>
                <strong>{question.text}:</strong>{' '}
              </Container>
            </ListItem>
          ))}
        </List>
        <List>
          {selectedOptions.map((option: selectedOption, index: number) => (
            <ListItem key={index}>
              <Container>{option.value.text}</Container>
            </ListItem>
          ))}
        </List>
      </Box>
      <Button variant="contained" onClick={() => submitSurvey(answers)}>
        Submit Survey
      </Button>
    </Box>
  )
}
export default Results
