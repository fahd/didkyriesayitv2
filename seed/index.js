require('dotenv/config');
const fs = require('fs');
const csv = require('csv-parser');
const { connection } = require('../lib/db');

const seedAuthors = (connection) => {
  return fs.createReadStream('seed/authors.csv')
  .pipe(csv())
  .on('data', async function (row) {
    const { authorid, author_name} = row;
    let queryString = `
      INSERT INTO authors (author_name, avatar_url)
      VALUES ('${author_name}', 'https://avatars.dicebear.com/api/male/${author_name}.svg');
    `
    await connection.query(queryString)
    console.log(`Inserted author #${authorid}`);
  })
}

const seedQuotes = (connection) => {
  return fs.createReadStream('seed/questions.csv')
  .pipe(csv())
  .on('data', async function (row) {
    const { questionid, text, source, source_url, correct, incorrect1, incorrect2, incorrect3} = row;
    let queryString = `
    INSERT INTO questions (correct, incorrect1, incorrect2, incorrect3, text, source, source_url)
    VALUES (${correct}, ${incorrect1}, ${incorrect2}, ${incorrect3}, $$${text}$$, '${source}', $$${source_url}$$);`;
    
    await connection.query(queryString)
    console.log(`Inserted question #${questionid}`);
  })
}


function seed(connection) {
  const c = connection;

  seedAuthors(c)
  .on('end', function () {
    console.log('Authors seeded.');

    seedQuotes(c)
      .on('end', function () {
        console.log(
          'Questions seeded.'
        );
      })
  })
}  

// Run this to get the database populated
seed(connection);