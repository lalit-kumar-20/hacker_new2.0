const express = require('express');

const fetchController= require('../Controllers/fetchControllers');

const router = express.Router();

///studentController.hello();


router.get('/fetch', fetchController.fetchData);


module.exports = router;