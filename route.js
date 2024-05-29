import express from 'express';
import { getAuthor } from './controller/authorController.js';


const router = express.Router();

router.get('/author', getAuthor);


export default router;
