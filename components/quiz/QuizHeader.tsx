const QuizHeader = (props: {
  i:number
}) => {
  const { i } = props;
  return (
    <div>
      <div className={`
        flex
        flex-row
        justify-between
        align-center
      `}>
        <div className='font-gtSuperBold text-meta text-xl'>Did Kyrie Say It?</div>
        <div className='font-faktProBlond'>{i + 1}/10</div>
      </div>
      <hr className='my-4 border-separator' />
    </div>
  )
}

export default QuizHeader;