const Question = {
  Query: {
    questionDetails: async (parent, { questionid }, { models }) => {
      return await models.Questions.findOne({questionid})
    }
  },
  Question: {
    correct: async ({correct}, args, { models }) => {
      return await models.Questions.findAuthor({authorid: correct})
    },
    incorrect1: async ({incorrect1}, args, { models }) => {
      return await models.Questions.findAuthor({authorid: incorrect1})
    },
    incorrect2: async ({incorrect2}, args, { models }) => {
      return await models.Questions.findAuthor({authorid: incorrect2})
    },
    incorrect3: async ({incorrect3}, args, { models }) => {
      return await models.Questions.findAuthor({authorid: incorrect3})
    }
  }
}

export default Question;