const Quiz = {
  Query: {
    hello: async() => {
      return 'world'
    },
    generateQuiz: async (parent, args, { models }) => {
      const { quizid } = await models.Quiz.createQuiz();
      
      // get 10 questionIds randomly from
      const qs = await models.Quiz.fetchTen();
      const quiz_questions = qs.reduce((m, { questionid = q }) => (m.push({ quizid, questionid }), m), [])
      
      // for each of 10 questions, insert into quiz_questions:
        // quizId
        // questionId
      const quizquestions = await models.Quiz.saveQuizQuestions(quiz_questions);
      const data = {
        quizid,
        quizquestions
      }
      return data;
    },
  },
  QuizQuestion: {
    question: async ({questionid}, args, { models }) => {
      return await models.Questions.findOne({questionid})
    }
  }
}

export default Quiz;