import { useEffect, useState } from 'react'
import { Box, Button } from '@mui/material'
import styles from './survey.module.css'
import Question from './Question'
import Results, { answers } from './Results'

export interface selectedOption {
  index: number
  value: {
    text: string
  }
}

export interface option {
  text: string
}

export interface question {
  text: string
  image: string
  lifetimeSeconds: number
  options: option[]
}

export interface surveyData {
  title: string
  image: string
  questions: question[]
}

interface SurveyProps {
  surveyData: surveyData
  submitSurvey: (answers: answers) => void
}
const Survey = ({ surveyData, submitSurvey }: SurveyProps) => {
  const questions = surveyData.questions
  const [surveyStart, setsurveyStart] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState<selectedOption[]>([])
  const [timeLeft, setTimeLeft] = useState<number>(
    questions[0]?.lifetimeSeconds || 0
  )
  const [questionDisabled, setQuestionDisabled] = useState(true)

  useEffect(() => {
    if (currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex]

      if (!questionDisabled) {
        const timer = setTimeout(() => {
          setQuestionDisabled(true) // Disable the question when time runs out
          if (currentQuestionIndex < questions.length - 1) {
            setTimeLeft(0) // Do not automatically move to the next question
          }
        }, currentQuestion.lifetimeSeconds * 1000)

        //display current time
        const countdownInterval = setInterval(() => {
          setTimeLeft((prevTimeLeft) =>
            prevTimeLeft !== 0 ? prevTimeLeft - 1 : 0
          )
        }, 1000)

        return () => {
          clearTimeout(timer)
          clearInterval(countdownInterval)
        }
      }
    }
  }, [currentQuestionIndex, questionDisabled, questions])

  const nextQuestion = (selectedOption: selectedOption) => {
    setCurrentQuestionIndex(currentQuestionIndex + 1)
    setQuestionDisabled(false) // Enable the next question
    setTimeLeft(questions[currentQuestionIndex + 1]?.lifetimeSeconds || 0) // Set the next question's time
    setSelectedOptions([...selectedOptions, selectedOption])
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
