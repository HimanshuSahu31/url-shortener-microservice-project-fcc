const router = require('express').Router();
const ShorturlController = require('../controllers/shorturl');

router.post('/new', ShorturlController.shorturl_newurl);

router.get('/:shortUrl', ShorturlController.shorturl_redirect);

module.exports = router;