import express from 'express';
import { getAuthor, insertAuthor, getAuthorById, updateAuthor, deleteAuthor } from './controller/authorController.js';
import { insertMedia,getMedia, deleteMedia,getMediaById,updateMedia,getMediaByFilter } from './controller/mediaController.js';



const router = express.Router();

router.get('/author', getAuthor);
router.post('/author', insertAuthor);
router.get('/author/:id', getAuthorById);
router.put('/author/:id', updateAuthor);
router.delete('/author/:id', deleteAuthor);


router.get('/media', getMedia);
router.get('/media/:id', getMediaById);
// router.get('/media/language/:language', getMediaByLanguage);
router.get('/media/:filterName/:name', getMediaByFilter);
router.post('/media', insertMedia);
router.put('/media/:id', updateMedia);
router.delete('/media/:id', deleteMedia);




export default router;
