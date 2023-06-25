import { connection } from '../../../lib/db';

const Questions = {};

Questions.findOne = ({ questionid }) => {
  const queryString = `SELECT * FROM questions WHERE questionid='${questionid}';`;

  return connection
    .query(queryString)
    .then(res => res.rows[0])
    .catch(e => console.error(e.stack));
}

Questions.saveResponse = ({ questionid, quizid, selectedauthorid, correct, responsetime }) => {
  const queryString = `
    INSERT INTO responses (quizId, questionId, authorId, iscorrect, responsetime)
    VALUES (${quizid}, ${questionid}, ${selectedauthorid}, ${correct}, ${responsetime})
    RETURNING *
  `;

  return connection
    .query(queryString)
    .then(res => res.rows[0])
    .catch(e => console.error(e.stack));

}

Questions.findTimesAnswered = ({ questionid }) => {
  const queryString = `
    SELECT
      COUNT(responses.questionid)::int
    FROM responses
    INNER JOIN questions
    ON
      responses.questionid = questions.questionid
    WHERE
      questions.questionid = '${questionid}';
    `;

  return connection
    .query(queryString)
    .then(res => res.rows[0].count)
    .catch(e => console.error(e.stack));

}

Questions.findResponseSelectedRate = ({ questionid, authorid }) => {
  const queryString = `
    SELECT Count(*)::int
    FROM responses 
    INNER JOIN questions
    ON responses.questionid = questions.questionid 
    WHERE 
    responses.authorid='${authorid}'
    AND
    responses.questionid = '${questionid}'
  `
  return connection
    .query(queryString)
    .then(res => res.rows[0].count)
    .catch(e => console.error(e.stack));
}

Questions.findTimesNotResponded = ({ questionid }) => {
  const queryString = `
    SELECT Count(*)::int
    FROM responses 
    INNER JOIN questions
    ON responses.questionid = questions.questionid 
    WHERE 
    responses.authorid='-1'
    AND
    responses.questionid = '${questionid}'`
  
  return connection
    .query(queryString)
    .then(res => res.rows[0].count)
    .catch(e => console.error(e.stack));
}
Questions.findAverageResponseTime = ({ questionid }) => {
  const queryString = `
      SELECT AVG(responses.responsetime)::float
      FROM responses 
      INNER JOIN questions
      ON responses.questionid = questions.questionid 
      WHERE 
      questions.questionid = '${questionid}';
    `
  
  return connection
    .query(queryString)
    .then(res => res.rows[0].avg)
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

Questions.findQuestionChoices = async ({ questionid, authorids, random }) => {
  
  return connection.query(`
    SELECT 
      authors.authorid, 
      authors.author_name,
      case when questions.correct = authors.authorid then TRUE else FALSE end as correct,
      questions.questionid
    FROM authors 
    INNER JOIN questions 
    ON 
      (
        authors.authorid = questions.correct OR
        authors.authorid = questions.incorrect1 OR
        authors.authorid = questions.incorrect2 OR
        authors.authorid = questions.incorrect3
      )
    WHERE authors.authorid = ANY($1::int[]) and questions.questionid='${questionid}'
    ${random ? 'ORDER BY RANDOM()' : ''}
    `, [authorids]
    )
    .then(res => res.rows)
    .catch(e => console.error(e.stack));
}

export default Questions;
