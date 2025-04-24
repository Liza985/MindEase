import express from 'express';
import { createSurvey, getAllSurveys, getSurveyById, getSurveyByUserId } from '../controllers/survey.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', isAuthenticated, createSurvey);
router.get('/all',  getAllSurveys);
router.get('/:id', getSurveyById);
router.get('/user', isAuthenticated, getSurveyByUserId); 

export default router;