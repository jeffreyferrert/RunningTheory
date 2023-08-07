const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateCommentInput = [
    check('author')
        .exists({ checkFalsy: true })
        .withMessage('Must be logged in'),
    check('track')
        .exists({ checkFalsy: true })  //check from a predifined list of cities ???
        .withMessage('Must be on valid track'),
    check('description')
        .exists({ checkFalsy: true })
        .isLength({ min: 5, max: 500 })
        .withMessage('Description must be between 5 and 500 characters'),
    handleValidationErrors
];

module.exports = validateCommentInput;