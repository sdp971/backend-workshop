

export class AuthorDAO {
  constructor(db /**CLASS DATABASE */) {
    // this.db = db;
    this.connection = db.connection;
  }

  create(name) {
    const query = `INSERT INTO author (name) VALUES(?)`;
    const values = [name];

    this.connection.execute(query, values, (error, results, fields) => {
      if (error) throw Error(error);
      console.log(results);
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
}