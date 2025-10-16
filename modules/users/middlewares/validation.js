
import { body } from 'express-validator';

export const createUserRules = [

  body('username').isString().notEmpty(),
  body('email').isEmail(),
  body('password').isString().isLength({ min: 6 }),
  body('subscription').isIn(['free','premium'])

];

export const updateUserRules = [

  body('username').isString().notEmpty(),
  body('email').isEmail(),
  body('password').isString().isLength({ min: 6 }),
  body('subscription').isIn(['free','premium'])

];
