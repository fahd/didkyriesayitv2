import { quizHeader, quizHeaderTitle, quizHeaderQuestion, quizSeparator } from './styles';
const QuizHeader = (props: {
  i:number
}) => {
  const { i } = props;
  return (
    <div>
      <div className={quizHeader}>
        <div className={quizHeaderTitle}>Did Kyrie Say It?</div>
        <div className={quizHeaderQuestion}>{i + 1}/10</div>
      </div>
      <hr className={quizSeparator} />
    </div>
  )
}

export default QuizHeader;