import { AuthorDAO } from './model/AuthorDAO.js';
import { Database } from './model/Database.js';
import { createRandomAuthor } from './services/FakerData.js';
import express from 'express';
import router from './route.js';
const app = express();

const db = new Database();

const authorDAO = new AuthorDAO(db);

const numberAuthors = 5;
const randomAuthor = createRandomAuthor(numberAuthors);

for (let i = 0; i < numberAuthors; i++) {authorDAO.create(randomAuthor[i].name);
 }

app.use('/api', router);

app.listen(3000, () => {
  console.log('Server stared ....');
});


// const query = 'SELECT * FROM author'
// db.connection.query(query, function (error, results, fields) {
//   if (error) throw error;
//   console.log(results);
// })


db.stop();