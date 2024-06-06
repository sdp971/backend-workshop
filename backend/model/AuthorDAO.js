export class AuthorDAO {
  constructor(db /**CLASS DATABASE */) {
    // this.db = db;
    this.connection = db.connection;
  }

  create(name) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO author (name) VALUES(?)`;
      const values = [name];
      //      console.log(values, 'values');
      this.connection.execute(query, values, (error, results, fields) => {
        if (error) reject(error);
        else resolve(results);
      });
    });
  }

  select(callback) {
    const query = 'SELECT * FROM author';
    this.connection.execute(query, (error, result, fields) => {
      if (error) {
        console.error(error);
      }
      callback(result, error);
    });
  }

  selectById(id) {
   
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM author where id = ?';
      const values = [id];
      this.connection.execute(query, values, (error, results, fields) => {
        if (error) reject(error);
        if(results[0] === undefined) reject(error);
        resolve(results);
      })
     })
  } 

  update(id,name) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE author SET author.name = ? WHERE author.id = ?';
      const values = [id, name];
      this.connection.execute(query, values, (error, results, fields) => {
           if (error) reject(error);
           resolve(results);
       })
     })
  }

  delete(id) {
    
    return new Promise((resolve, reject) => {
     
      const query = 'DELETE FROM author WHERE author.id = ?';
      const values = [id];
          this.connection.execute(query, values, (error, results, fields) => {
            if (error) reject(error);
            if (results.affectedRows === 0) reject(error);
           
        resolve(results);
       })
     })
  }
}
