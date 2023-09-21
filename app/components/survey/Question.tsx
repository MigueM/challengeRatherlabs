import { Box, Button, List } from '@mui/material'
import styles from './survey.module.css'
import Option from './Option'
import { useState } from 'react'
import { option, question, selectedOption } from './Survey'

interface QuestionProps {
  question: question
  nextQuestion: (selected: selectedOption) => void
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
  const [selected, setSelected] = useState<selectedOption | typeof blank>(blank)
  const handleOptionChange = (value: option, index: number) => {
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
        {question.options.map((option: option, index: number) => (
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
