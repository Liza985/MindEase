import express from 'express';
import { addContent, deleteContent, getAllContent, getContentByCategory, getContentById, updateById } from './../controllers/activity.js';
import { isAuthenticated } from '../middlewares/auth.js';


const contentRouter = express.Router();

contentRouter.post('/',isAuthenticated, addContent);
contentRouter.delete('/:id',isAuthenticated, deleteContent);
contentRouter.put('/:id',isAuthenticated, updateById);
contentRouter.get('/',isAuthenticated, getAllContent);
contentRouter.get('/category/:category',isAuthenticated, getContentByCategory);
contentRouter.get('/:id',isAuthenticated,getContentById);

export default contentRouter;