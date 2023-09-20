import { Box, Button, List } from '@mui/material'
import styles from './survey.module.css'
import Option from './Option'
import { useState } from 'react'

interface option {
  index: number
  value: {
    text: string
  }
}

interface QuestionProps {
  question: any
  nextQuestion: (selected: option) => void
  timeLeft: number | null
  questionDisabled: boolean
}

const Question = ({
  question,
  nextQuestion,
  timeLeft,
  questionDisabled,
}: QuestionProps) => {
  const blank = { index: '', value: { text: 'didnt answer' } }
  const [selected, setSelected] = useState<any>(blank)

  const handleOptionChange = (value: any, index: any) => {
    const optionCorrection = { index, value }
    setSelected(optionCorrection)
  }
  return (
    <Box className={styles.questionContainer}>
      <h2>{question.text}</h2>
      <img
        key={question.image}
        className={styles.questionImage}
        src={question.image}
        alt={`Question image`}
      />
      {(timeLeft !== null || timeLeft == 0) && (
        <p>Time Left: {timeLeft} seconds</p>
      )}
      {questionDisabled && <p>Run out of time</p>}
      <List className={styles.optionList}>
        {question.options.map((option: any, index: number) => (
          <Option
            key={index}
            option={option}
            index={index}
            selected={selected?.index === index}
            handleOptionChange={handleOptionChange}
            questionDisabled={questionDisabled}
          />
        ))}
      </List>
      <Button
        variant="contained"
        onClick={() => {
          nextQuestion(selected), setSelected(blank)
        }}
        disabled={!(selected.index !== '') && !questionDisabled}
      >
        Next
      </Button>
    </Box>
  )
}

export default Question
