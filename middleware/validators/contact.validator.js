import { body } from 'express-validator';

export const validateContact = [
    body('first_name')
        .notEmpty().withMessage('First name is required')
        .isLength({ min: 2, max: 30 }).withMessage('Must be 2–30 characters'),

    body('last_name')
        .notEmpty().withMessage('Last name is required'),

    body('email')
        .isEmail().withMessage('Invalid email address'),

    body('phone')
        .notEmpty().withMessage('Phone number is required')
        .isNumeric().withMessage('Phone must be numeric')
        .isLength({ min: 11, max: 11 }).withMessage('Must be exactly 11 digits'),
];
