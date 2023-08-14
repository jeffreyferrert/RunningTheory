const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateTrackInput = [
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ min: 5, max: 140 })
        .withMessage('Track name must be between 5 and 140 characters'),
    check('location')
        .exists({ checkFalsy: true })  //check from a predifined list of cities ???
        .withMessage('Location must be a valid city'),
    check('miles')
        .exists({ checkFalsy: true })
        .withMessage('Miles field is required')
        .isFloat({ min: 0, max: 100 }) // helps remove unreasonable routes
        .withMessage('Miles must be a number between 0 and 100'),
    check('description')
        .exists({ checkFalsy: true })
        .isLength({ min: 5, max: 140 })
        .withMessage('Description must be between 5 and 140 characters'),
    handleValidationErrors
];

module.exports = validateTrackInput;