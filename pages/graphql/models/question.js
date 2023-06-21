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

export default Questions;
