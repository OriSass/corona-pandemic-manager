const { Router } = require('express');

const router = Router();

router.use('/patients', require('./routes/patients'));
router.use('/hospitals', require('./routes/hospitals'));
router.use('/cities', require('./routes/cities'));
router.use('/symptoms', require('./routes/symptoms'));
router.use('/symptomsByPatient', require('./routes/symptomsByPatient'));
router.use('/covidtests', require('./routes/covidTests'));

module.exports = router;