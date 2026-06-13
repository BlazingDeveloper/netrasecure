const express = require('express');
const { scanUrl } = require('../controllers/scanController');
const router = express.Router();
router.post('/', scanUrl);
module.exports = router;
