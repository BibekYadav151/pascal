const express = require('express');
const router = express.Router();
const {
    getUniversities,
    getUniversity,
    createUniversity,
    updateUniversity,
    deleteUniversity
} = require('../controllers/universityController');

router.route('/')
    .get(getUniversities)
    .post(createUniversity);

router.route('/:id')
    .get(getUniversity)
    .put(updateUniversity)
    .delete(deleteUniversity);

module.exports = router;
