
import { body } from 'express-validator';

export const createFeedbackRules = [

  body('userId').isString().notEmpty(),
  body('transcript').isString().notEmpty(),
  body('pronunciationScore').isInt({ min: 0, max: 100 }),
  body('fluencyScore').isInt({ min: 0, max: 100 }),
  body('feedbackText').isString().notEmpty()

];

export const updateFeedbackRules = [

  body('userId').isString().notEmpty(),
  body('transcript').isString().notEmpty(),
  body('pronunciationScore').isInt({ min: 0, max: 100 }),
  body('fluencyScore').isInt({ min: 0, max: 100 }),
  body('feedbackText').isString().notEmpty()

];
