const express = require('express');
const router = express.Router();
const {
    getInstituteClasses,
    getInstituteClass,
    createInstituteClass,
    updateInstituteClass,
    deleteInstituteClass
} = require('../controllers/instituteClassController');

router.route('/')
    .get(getInstituteClasses)
    .post(createInstituteClass);

router.route('/:id')
    .get(getInstituteClass)
    .put(updateInstituteClass)
    .delete(deleteInstituteClass);

module.exports = router;
