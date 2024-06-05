import { UserDAO } from '../model/UserDAO.js';
import { Database } from '../model/Database.js';
import generateToken from '../model/generateToken.js';


const db = new Database();
const userDAO = new UserDAO(db);

const getUser = (req, res) => {
  userDAO
    .select()
    .then((data) => {
      // console.log(res)
      res.send(data);
    })
    .catch((err) => {
      res.status(404);
      res.json(err);
    });
};


const checkParams = (req, res) => {
  //TODO FAIRE PLUS DE VERIFICATIONS
  if (!req.body.username || !req.body.password) {
     res
      .status(401)
       .json({
         message: 'Username and password are required'
       });
    return false;
  }
  return true;
}
 

const login = (req, res) => {
  //On doit récupérer les informations
  if (!checkParams(req,res))
  return;
 
  const { username, password } = req.body;

  userDAO.authLogin(username, password)
    .then(({ isAuthenticated, userId,role }) => {
      console.log(userId, "id");
      console.log(role,"role");
      if (!isAuthenticated) {
      return res.status(401).json({ message: 'Authentification failed : invalid login !' });
      }
      return res.status(200).json({
        message: 'Authenticated successfully !',
        token: generateToken({ userId:userId, username :username, role:role})
      })
  })
    .catch(err => {
  return res.status(500).json({ message: 'Something went wrong :-(' });
})
};

const createUser = (req, res) => {

  if (!checkParams(req, res))
  return;




  userDAO
    .create(
      req.body.firstname,
      req.body.lastname,
      req.body.age,
      req.body.phone_number,
      req.body.password,
      req.body.username
    )
    .then((data) => {
      res.status(201).json({
        message: 'User has been created successfully',
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
  
};

const userInfo = (req, res) => { 

  if (req.user.role === 3) {
    console.log("c'est un administratif");
  }

  
  userDAO.selectById(req.user.userId).then((user) => {
      res.json(user);
  }).catch((err) => {
     res.status(500).json({message:"Something went wrong with DB :-("})
   })


}

const getuserRole = (req, res) => { 
  userDAO.selectByIdRole(req.params.id).then((data) => {
    res.status(200).json(data);
  }).catch((err) => {
    res.status(404).json({message :`Role for the user ${id} has been not found !`})
  })
}
const deleteUser = (req, res) => {
 
  if (req.user.role === 3 || parseInt(req.params.id) === req.user.id) {
    userDAO
      .deleteById(req.params.id)
      .then(() => {
        res.status(200).json({
          message: `User n° ${req.params.id} has been deleted successfully`,
        });
      })
      .catch((err) => {
        res.status(404).json(err);
      })
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
};


export { getUser, createUser,login, userInfo, getuserRole, deleteUser };
