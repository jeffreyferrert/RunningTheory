const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateTimeInput = [
    check('author')
        .exists({ checkFalsy: true })
        .withMessage('Must be logged in'),
    check('track')
        .exists({ checkFalsy: true })  //check from a predifined list of cities ???
        .withMessage('Must be on valid track'),
    check('seconds')
        .exists({ checkFalsy: true })
        .isInt({ min: 0, max: 59 })
        .withMessage('Seconds must be between 0 and 59'),
    check('minutes')
        .exists({ checkFalsy: true })
        .isInt({ min: 0, max: 59 })
        .withMessage('Minutes must be between 0 and 59'),
    check('hours')
        .exists({ checkFalsy: true })
        .isInt({ min: 0, max: 99 })
        .withMessage('Seconds must be between 0 and 99'),
    handleValidationErrors
];

module.exports = validateTimeInput;