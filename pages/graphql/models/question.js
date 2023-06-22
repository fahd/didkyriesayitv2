import { connection } from '../../../lib/db';

const Questions = {};

Questions.findOne = ({ questionid }) => {
  const queryString = `SELECT * FROM questions WHERE questionid='${questionid}';`;

  return connection
    .query(queryString)
    .then(res => res.rows[0])
    .catch(e => console.error(e.stack));
}

Questions.findAuthor = ({ authorid }) => {
  const queryString = `SELECT * FROM authors WHERE authorid='${authorid}';`;

  return connection
    .query(queryString)
    .then(res => res.rows[0])
    .catch(e => console.error(e.stack));
}

Questions.findQuestionAuthorCorrect = ({ authorid, questionid }) => {
  const queryString = `
    SELECT 
      authorid, 
      author_name,
      avatar_url
    FROM authors
    INNER JOIN questions
    ON
      authors.authorid = questions.correct
    WHERE
      authors.authorid='${authorid}' AND questions.questionid='${questionid}'
  `;

  return connection
    .query(queryString)
    .then(res => res.rows[0])
    .catch(e => console.error(e.stack));
}

Questions.findQuestionChoices = async ({ questionid, authorids }) => {
  
  return connection.query(`
    SELECT 
      authors.authorid, 
      authors.author_name,
      case when questions.correct = authors.authorid then TRUE else FALSE end as correct
    FROM authors 
    INNER JOIN questions 
    ON 
      (
        authors.authorid = questions.correct OR
        authors.authorid = questions.incorrect1 OR
        authors.authorid = questions.incorrect2 OR
        authors.authorid = questions.incorrect3
      )
    WHERE authors.authorid = any($1::int[]) and questions.questionid='${questionid}';
    `, [authorids]
    )
    .then(res => res.rows)
    .catch(e => console.error(e.stack));
}

export default Questions;
