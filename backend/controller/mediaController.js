import { Database } from "../model/Database.js";
import { MediaDAO } from "../model/MediaDAO.js";

const db = new Database();
const mediaDAO = new MediaDAO(db);


const getMedia = (req, res) => {

  mediaDAO
    .select()
    .then((data) => {
      // console.log(res)
      res.send(data);
         })
    .catch((err) => {
      res.status(404);
      res.json(err);
    });
}
  
const getMediaById = (req, res) => {
  const mediaId = parseInt(req.params.id, 10);
  mediaDAO
    .selectById(mediaId)
    .then((data) => {
      res.status(200);
      res.json(data);
    })
    .catch((error) => {
      res.status(404);
      res.json({
        message: `Media not found`,
      });
    });
};


const insertMedia = (req, res) => {
  console.log(req,"demande")
  //TODO IF BODY IS VALID
  const { title, isbn, type_id, language_id, genre_id, editor_id,sector_id } = req.body
  console.log(title)
  mediaDAO
    .create(title, isbn, type_id, language_id, genre_id, editor_id,sector_id)
    .then((data) => {
      
      res.status(201);
      res.json({
        message: `Media has been created successfully`,
      });
    })
    .catch((err) => {
      res.status(400);
      res.json(err);
    });
  
  

};

// const getMediaByLanguage = (req, res) => {
//   const { language } = req.params;
//   mediaDAO
//     .filterByLanguage(language)
//     .then((data) => {
//       res.status(200);
//       res.json(data);
//     })
//     .catch((err) => {
//       if (
//         err instanceof Error &&
//         err.message === 'No medias found for the specified language.'
//       ) {
//         res.status(404).json({
//           message: 'No medias found for the specified language.',
//         });
//       } else {
//         res.status(400).json({
//           message: err,
//         });
//       }
//     });
// }
 

const getMediaByFilter = (req, res) => {
  const { filterName, name } = req.params;
 
  mediaDAO
    .filterBy(filterName, name)
    .then((data) => {
      res.status(200);
      res.json(data);
    })
    .catch((err) => {
      if (
        err instanceof Error &&
        err.message === `No medias found for the specified ${filterName}.`
      ) {
        res.status(404).json({
          message: `No medias found for the specified ${filterName}.`,
        });
      } else {
        res.status(400).json({
          message: err,
        });
      }
    });
};

const updateMedia = (req, res) => {

  
  const { title, isbn, type_id, language_id,genre_id,editor_id,sector_id}= req.body
  mediaDAO
    .update(parseInt(req.params.id,10),title, isbn, type_id, language_id, genre_id, editor_id, sector_id)
    .then((data) => {
     
      res.status(201);
       res.json({
        message: `Media has been updated successfully`,
      });
    })
    .catch((err) => {
      
          res.status(400);
          res.json({
            message: err.message,
          });
      })
    
  };

const deleteMedia = (req, res) => {
   console.log(req)
   mediaDAO
     .delete(req.params.id)

     .then((data) => {
       res.sendStatus(204);
     })
     .catch((err) => {
       res.status(404);
       res.json({
         message: `Media not found`,
       });
     });
 };






export {insertMedia,getMedia, deleteMedia, getMediaById,updateMedia,getMediaByFilter}