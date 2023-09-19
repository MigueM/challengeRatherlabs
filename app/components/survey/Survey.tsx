import { useEffect, useState } from 'react'
import { Box, Button } from '@mui/material'
import styles from './survey.module.css'
import Question from './Question'
import Results from './Results'

interface surveyData {
  title: string
  image: string
  questions: any
}

interface SurveyProps {
  surveyData: surveyData
  submitSurvey: () => void
}

interface option {
  index: number
  value: {
    text: string
  }
}

const Survey = ({ surveyData, submitSurvey }: SurveyProps) => {
  const questions = surveyData.questions
  const [surveyStart, setsurveyStart] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState<Object[]>([])
  const [timeLeft, setTimeLeft] = useState<number | null>(
    questions[0]?.lifetimeSeconds || null
  )
  const [questionDisabled, setQuestionDisabled] = useState(true)

  useEffect(() => {
    if (currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex]

      if (!questionDisabled) {
        const timer = setTimeout(() => {
          setQuestionDisabled(true) // Disable the question when time runs out
          if (currentQuestionIndex < questions.length - 1) {
            // Do not automatically move to the next question
            setTimeLeft(null)
          }
        }, currentQuestion.lifetimeSeconds * 1000)

        //display current time
        const countdownInterval = setInterval(() => {
          setTimeLeft((prevTimeLeft) =>
            prevTimeLeft !== null ? prevTimeLeft - 1 : null
          )
        }, 1000)

        return () => {
          clearTimeout(timer), clearInterval(countdownInterval)
        }
      }
    }
  }, [currentQuestionIndex, questionDisabled, questions])

  const nextQuestion = (option: option) => {
    setCurrentQuestionIndex(currentQuestionIndex + 1)
    setQuestionDisabled(false) // Enable the next question
    setTimeLeft(questions[currentQuestionIndex + 1]?.lifetimeSeconds || null)
    // Set the next question's time
    setSelectedOptions([...selectedOptions, option])
  }
  return (
    <Box className={styles.surveyContainer}>
      <h1>{surveyData.title}</h1>
      {!surveyStart && (
        <Button
          variant="contained"
          onClick={() => {
            setsurveyStart(true), setQuestionDisabled(false)
          }}
        >
          Start Survey
        </Button>
      )}
      {surveyStart && currentQuestionIndex < questions.length ? (
        <Question
          question={questions[currentQuestionIndex]}
          nextQuestion={nextQuestion}
          timeLeft={timeLeft}
          questionDisabled={questionDisabled}
        />
      ) : (
        surveyStart && (
          <Results
            questions={questions}
            selectedOptions={selectedOptions}
            submitSurvey={submitSurvey}
          />
        )
      )}
    </Box>
  )
}

export default Survey
