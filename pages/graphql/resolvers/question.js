const Question = {
  Query: {
    questionDetails: async (parent, { questionid }, { models }) => {
      return await models.Questions.findOne({questionid})
    }
  },
  Question: {
    correct: async ({questionid, correct} , args, { models }) => {
      return await models.Questions.findQuestionAuthorCorrect({
        questionid,
        authorid:correct
      })
    },
    choices: async ({questionid, correct, incorrect1, incorrect2, incorrect3} , args, { models }) => {
      const authors = [correct, incorrect1, incorrect2, incorrect3];
      const authorids = authors.map(n => parseInt(n));

      return await models.Questions.findQuestionChoices({
        questionid,
        authorids
      })
    },
  }
}

export default Question;