import { Database } from '../model/Database.js';
import { AuthorDAO } from '../model/AuthorDAO.js';

const db = new Database();
const authorDAO = new AuthorDAO(db);

const getAuthor = (req, res) => {
  authorDAO.select((data, error) => {
    if (error) {
      res.status(500);
      res.json({
        message: 'Error mysql !',
      });
    }
    res.json(data);
  });
};

const getAuthorById = (req, res) => {
  const authorId = parseInt(req.params.id, 10);
  authorDAO
    .selectById(authorId)
    .then((data) => {
      res.status(200);
      res.json(data);
    })
    .catch((error) => {
      res.status(404);
       res.json({
         message: `Author not found`,
       });
    });
};



const insertAuthor = (req, res) => {
  //TODO IF BODY IS VALID
  authorDAO
    .create(req.body.name)
    .then((data) => {
      res.status(201);
      res.json({
        message: `Author ${req.body.name} created successfully`,
      });
    })
    .catch((err) => {
      res.status(400);
      res.json(err);
    });
};

const updateAuthor = (req, res) => {
  authorDAO
    .update(req.body.name, req.body.id)
    .then((data) => {
      res.status(201);
      res.json({
        message: `Author ${req.body.name} updated successfully`,
      });
    })
    .catch((err) => {
      res.status(400);
      res.json(err);
    });
};

const deleteAuthor = (req, res) => {
  authorDAO
    .delete(req.params.id)

    .then((data) => {
      
      res.sendStatus(204);
    })
    .catch((err) => {
      res.status(404);
      res.json({
        message: `Author not found`,
      });
    });
};

export { getAuthor, insertAuthor, getAuthorById, updateAuthor, deleteAuthor };
