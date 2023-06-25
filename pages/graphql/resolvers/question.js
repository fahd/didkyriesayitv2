const Question = {
  Query: {
    questionDetails: async (parent, { questionid }, { models }) => {
      return await models.Questions.findOne({questionid})
    }
  },
  Mutation: {
    saveResponse: async (parent, { questionid, quizid, selectedauthorid, correctid, responsetime }, { models }) => {
      // in case no selection
      const selected = selectedauthorid || -1;

      return await models.Questions.saveResponse({
        questionid,
        quizid,
        selectedauthorid: selected,
        responsetime: responsetime,
        correct: selected === correctid
      })
    }
  },
  Question: {
    average_response_time: async ({ questionid }, args, { models }) => {
      return await models.Questions.findAverageResponseTime({
        questionid
      })
    },
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
    choices: async ({ questionid, correct, incorrect1, incorrect2, incorrect3 }, args, { models }) => {
      const authors = [correct, incorrect1, incorrect2, incorrect3];
      const authorids = authors.map(n => parseInt(n));

      return await models.Questions.findQuestionChoices({
        questionid,
        authorids,
        random: false
      });
    },
    choicesRandom: async ({ questionid, correct, incorrect1, incorrect2, incorrect3}, args, { models }) => {
      const authors = [correct, incorrect1, incorrect2, incorrect3];
      const authorids = authors.map(n => parseInt(n));

      
      const choices = await models.Questions.findQuestionChoices({
        questionid,
        authorids,
        random: true
      });
      
      return choices;
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