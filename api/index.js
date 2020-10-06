const { Router } = require('express');

const router = Router();

router.use('/patients', require('./routes/song'));
router.use('/hospitals', require('./routes/album'));
router.use('/cities', require('./routes/artist'));
router.use('/symptoms', require('./routes/playlist'));
router.use('/covidtests', require('./routes/playlist'));

module.exports = router;