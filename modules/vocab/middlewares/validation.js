
import { body } from 'express-validator';

export const createVocabRules = [

  body('word').isString().notEmpty(),
  body('translation').isString().notEmpty(),
  body('category').isString().notEmpty()

];

export const updateVocabRules = [

  body('word').isString().notEmpty(),
  body('translation').isString().notEmpty(),
  body('category').isString().notEmpty()

];
