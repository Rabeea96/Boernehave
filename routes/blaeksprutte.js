const controller = require("../controllers/controller");
const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '../public', 'blaeksprutte.html'));
});

module.exports = router;