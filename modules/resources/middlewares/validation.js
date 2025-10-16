
import { body } from 'express-validator';

export const createResourceRules = [

  body('title').isString().notEmpty(),
  body('instructor').isString().notEmpty(),
  body('link').isURL(),
  body('description').isString().notEmpty()

];

export const updateResourceRules = [

  body('title').isString().notEmpty(),
  body('instructor').isString().notEmpty(),
  body('link').isURL(),
  body('description').isString().notEmpty()

];
