export class MediaDAO {
  constructor(db) {
    this.connection = db.connection;
  }

  select() {
    return new Promise((resolve, reject) => {
      const query =
        'select media.id,media.title,media.isbn, type.name as "type", language.name as "language", genre.name as "genre", editor.name as "editor", sector.name as "sector" from media left join type on media.type_id = type.id   left join language on  media.language_id = language.id  left join genre on media.genre_id = genre.id left join editor on editor.id = media.editor_id left join sector on media.sector_id = sector.id';
     
      this.connection.execute(query, (error, results, fields) => {
        if (error) reject(error);
        if (results[0] === undefined) reject(error);
        else resolve(results);
      });
    });
  }

  selectById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM media where id = ?';
      const values = [id];
      this.connection.execute(query, values, (error, results, fields) => {
        if (error) reject(error);
        if (results[0] === undefined) reject(error);
        resolve(results);
      });
    });
  }

  create(title, isbn, type_id, language_id, genre_id, editor_id, sector_id) {
    return new Promise((resolve, reject) => {
      const query =
        'INSERT INTO media(title,isbn,type_id,language_id,genre_id,editor_id,sector_id) VALUES(?,?,?,?,?,?,?)';
      const values = [
        title,
        isbn,
        type_id,
        language_id,
        genre_id,
        editor_id,
        sector_id,
      ];
      console.log(values, 'values');
      this.connection.execute(query, values, (error, results, fields) => {
        console.log(query, 'results');
        if (
          title === undefined ||
          isbn === undefined ||
          type_id === undefined ||
          genre_id === undefined ||
          editor_id === undefined ||
          sector_id === undefined
        )
          reject(error);
        if (error) reject(error);
        else resolve(results);
      });
    });
  }

  update(id, title, isbn, type, language, genre, editor, sector) {
    console.log(title, isbn, type, language, genre, editor, sector);
    return new Promise((resolve, reject) => {
      const query =
        'UPDATE media SET title = ?, isbn = ?, type_id = ?, language_id = ?, genre_id = ?, editor_id = ?, sector_id = ? WHERE id = ?';
      const values = [title, isbn, type, language, genre, editor, sector, id];
      // const valuesNotNull = [];
      for (let i = 0; i < values.length; i++) {
        console.log(i, ':', values[i]);
      }

      this.connection.execute(query, values, (error, results, fields) => {
        if (error) reject(error);
        resolve(results);
      });
    });
  }

  // filterByLanguage(language) {
  //   return new Promise((resolve, reject) => {
  //     const query =
  //       'select media.id,media.title,media.isbn, type.name as "type", language.name as "language", genre.name as "genre", editor.name as "editor", sector.name as "sector" from media left join type on media.type_id = type.id   left join language on  media.language_id = language.id  left join genre on media.genre_id = genre.id left join editor on editor.id = media.editor_id left join sector on media.sector_id = sector.id where language.name = ?';
  //     const values = [language];
  //     this.connection.execute(query, values, (error, results, fields) => {
  //       console.log(results, 'resultat');
  //       if (error) {
  //         reject(error);
  //       } else if (results.length === 0) {
  //         reject(new Error('No medias found for the specified language.'));
  //       } else {
  //         resolve(results);
  //       }
  //     });
  //   });
  // }

  filterBy(filterName,name) {
    return new Promise((resolve, reject) => {

   
      let query =
        `select media.id,media.title,media.isbn, type.name as "type", language.name as "language", genre.name as "genre", editor.name as "editor", sector.name as "sector" from media left join type on media.type_id = type.id   left join language on  media.language_id = language.id  left join genre on media.genre_id = genre.id left join editor on editor.id = media.editor_id left join sector on media.sector_id = sector.id where`;
      
         switch (filterName) {
           case 'language':
             query += ' language.name = ?';
             break;
           case 'genre':
             query += ' genre.name = ?';
             break;
           case 'sector':
             query += ' sector.name = ?';
             break;
           case 'type':
             query += ' type.name = ?';
             break;
           case 'editor':
             query += ' editor.name = ?';
             break;
         }
      const values = [name];
    
      this.connection.execute(query, values, (error, results, fields) => {
        
        if (error) {
          reject(error);
        } else if (results.length === 0) {
          reject(new Error(`No medias found for the specified ${filterName}.`));
        } else {
          resolve(results);
        }
      });
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM media WHERE media.id = ?';
      const values = [id];
      this.connection.execute(query, values, (error, results, fields) => {
        if (error) reject(error);
        if (results.affectedRows === 0) reject(error);

        resolve(results);
      });
    });
  }
}
