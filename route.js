import express from 'express';


const saltRounds = 10;
const myPlaintextPassword = 's0//P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';


import {
  getAuthor,
  insertAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} from './controller/authorController.js';

import {
  insertMedia,
  getMedia,
  deleteMedia,
  getMediaById,
  updateMedia,
  getMediaByFilter,
} from './controller/mediaController.js';
import generateToken from './model/generateToken.js';
import verifyToken from './controller/verifyToken.js';
import { login, createUser, getUser,userInfo, getuserRole,deleteUser } from './controller/userController.js';



const router = express.Router();

router.get('/author', getAuthor);
router.post('/author',verifyToken, insertAuthor);
router.get('/author/:id', getAuthorById);
router.put('/author/:id', updateAuthor);
router.delete('/author/:id', deleteAuthor);


// router.post('/login', (req, res) => { 
//   res.json({
//     token: generateToken({ userId: 2 }),
//   });
// })

// router.get('/token', (req, res, next) => {
//   res.json({
//     token: generateToken({ userId: 2 }),
//   });
// });

router.get('/media', getMedia);
router.get('/media/:id', getMediaById);
// router.get('/media/language/:language', getMediaByLanguage);
router.get('/media/:filterName/:name', getMediaByFilter);
router.post('/media', insertMedia);
router.put('/media/:id', updateMedia);
router.delete('/media/:id', deleteMedia);




// router.post('/user/create', (req, res) => {

//   bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
//      if (err) {
//        return console.error(err);
//      } else {
//        createUser({
//          firstname: req.body.firstname,
//          lastname: req.body.lastname,
//          age: req.body.age,
//          phone_number: req.body.phone_number,
//          password: hash,
//          username: req.body.username,
//        });
//           res
//             .status(200)
//             .send('User created successfully with hashed password');
//      }
        
//     });

//    },createUser);

router.post('/register', createUser)
router.post('/login', login)
router.get('/user-info', verifyToken, userInfo);
router.get('/user-role/:id', getuserRole);

router.delete('/user/:id', verifyToken,deleteUser)
 

export default router;
