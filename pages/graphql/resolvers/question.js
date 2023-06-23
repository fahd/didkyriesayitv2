const Question = {
  Query: {
    questionDetails: async (parent, { questionid }, { models }) => {
      return await models.Questions.findOne({questionid})
    }
  },
  Mutation: {
    saveResponse: async (parent, { questionid, quizid, selectedauthorid, correctid }, { models }) => {
      // in case no selection
      const selected = selectedauthorid || -1;

      return await models.Questions.saveResponse({
        questionid,
        quizid,
        selectedauthorid: selected,
        correct: selected === correctid
      })
    }
  },
  Question: {
    correct: async ({questionid, correct} , args, { models }) => {
      return await models.Questions.findQuestionAuthorCorrect({
        questionid,
        authorid:correct
      })
    },
    times_answered:async ({questionid} , args, { models }) => {
      return await models.Questions.findTimesAnswered({
        questionid
      })
    },
    choices: async ({questionid, correct, incorrect1, incorrect2, incorrect3} , args, { models }) => {
      const authors = [correct, incorrect1, incorrect2, incorrect3];
      const authorids = authors.map(n => parseInt(n));

      return await models.Questions.findQuestionChoices({
        questionid,
        authorids
      });
    },
    no_response: async ({ questionid }, args, { models }) => {
      return models.Questions.findTimesNotResponded({
        questionid
      })
    }
  },
  QuestionChoice: {
    times_selected: async ({questionid, authorid} , args, { models }) => {
      return await models.Questions.findResponseSelectedRate({
        questionid,
        authorid
      })
    },

  }
}

export default Question;