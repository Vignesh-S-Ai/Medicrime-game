const express = require('express');
const router = express.Router();
const caseController = require('../controllers/caseController');

router.get('/new', caseController.getNewCase);
router.get('/:id', caseController.getCaseById);

module.exports = router;
