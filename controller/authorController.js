import { Database } from "../model/Database.js";
import { AuthorDAO } from "../model/AuthorDAO.js";



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

export { getAuthor };