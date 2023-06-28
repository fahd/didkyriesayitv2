import { connection } from '../../db';

const Quiz = {};

Quiz.createQuiz = () => {
  const queryString = `INSERT INTO quizzes (completed) VALUES (false) RETURNING quizid`;

  return connection
    .query(queryString)
    .then(res => res.rows[0])
    .catch(e => console.error(e.stack));
}

Quiz.fetchTen = () => {
  const queryString = `
  SELECT questionId FROM questions
  ORDER BY RANDOM()
  LIMIT 10`;
  return connection
    .query(queryString)
    .then(res => res.rows)
    .catch(e => console.error(e.stack));
}

Quiz.saveQuizQuestions = (qq) => {
  let queryString = `
    INSERT INTO quiz_questions (quizid, questionid)
    VALUES `;
  // optimize 😂
  qq.forEach(({ quizid, questionid } = q, i) => {
    queryString += `(${quizid}, ${questionid})${i < qq.length - 1? ',' :''} `;
  })

  queryString += 'RETURNING *';

  return connection
    .query(queryString)
    .then(res => res.rows)
    .catch(e => console.error(e.stack));
}

export default Quiz;
