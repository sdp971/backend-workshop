
import bcrypt from "bcrypt";
export class UserDAO {
  constructor(db) {
    this.connection = db.connection;
  }

  select() {
    return new Promise((resolve, reject) => {
      const query = 'select * from user';

      this.connection.execute(query, (error, results, fields) => {
        if (error) reject(error);
        if (results[0] === undefined) reject(error);
        if (results.length === 0) reject(new Error(`No user found for`));
        else resolve(results);
      });
    });
  }

  create(firstname, lastname, age, phone_number, password, username) {
    return new Promise((resolve, reject) => {
      bcrypt
        .hash(password, 10)
        .then((hashPassword) => {
          const query =
            'INSERT INTO user(firstname, lastname, age, phone_number, password, username) VALUES(?,?,?,?,?,?)';
          const values = [
            firstname,
            lastname,
            age,
            phone_number,
            hashPassword,
            username,
          ];

          this.connection.execute(query, values, (error, results, fields) => {
            console.log(error, 'erreur');
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          });
        })
        .catch((error) => reject(error));
    });
  }

  authLogin(username, password) {
    return new Promise((resolve, reject) => {
      // const query = ' select * from user where username = ? LIMIT 1';
      const query =
        'select role.id as role, user.* from role join user_role on role.id = user_role.role_id join user on user.id = user_role.user_id where user.username = ?';

      this.connection.execute(query, [username], (err, result) => {
        console.log(result, 'result');
        if (err) return reject(err);
        const hashPassword = result[0].password;
        const userId = result[0].id;
        const userRole = result[0].role;
        bcrypt.compare(password, hashPassword).then((isValid) => {
          resolve({
            isAuthenticated: isValid,
            userId: userId,
            role:userRole
          });
        });
      });
    });
  }

  selectById(id) {
    return new Promise((resolve, reject) => {
      // const query =
      //   ' SELECT firstname, lastname, age, phone_number from user where id = ?';
      const query =
        'select role.id as role, user.firstname, user.lastname, user.age, user.phone_number from role join user_role on role.id = user_role.role_id join user on user.id = user_role.user_id where user.id = ?';
  
      this.connection.execute(query, [id], (err, result) => {
        if (err) return reject(err);
        return resolve(result[0]);
      });
    });
  }

  selectByIdRole(id) {
    return new Promise((resolve, reject) => {
      const query =
        ' select role.name as role ,role.id, user.username from role join user_role on role.id = user_role.role_id join user on user.id = user_role.user_id where user.id = ?';
      this.connection.execute(query, [id], (err, result) => {
        if (err) return reject(err);
        return resolve(result[0]);
      });
    });
  }



  deleteById(id) {
    return new Promise((resolve, reject) => {
       const query = 'DELETE FROM user WHERE user.id = ?';
       const values = [id];
       this.connection.execute(query, values, (error, results, fields) => {
         if (error) reject(error);
        else resolve(results);
       });
     })
   }
}

