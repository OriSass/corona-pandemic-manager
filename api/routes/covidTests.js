const { Router } = require('express');
const router = Router();
const { CovidTests } = require('../../models');

router.get('/test-results/:testResult', async(request, response) => {
    try {
        const result = Boolean(parseInt(request.params.testResult))
        const testsByResult = await CovidTests.findAll({where: {isSick: result}});
        response.json(testsByResult);
    } catch (error) {
        response.status(404).send(error.message);
    }
});
router.get('/test-results/:patientId', async(request, response) => {
    try {
        const { patientId } = request.params;
        const patientTests = await CovidTests.findAll({where: {isSick: result}});
        response.json(testsByResult);
    } catch (error) {
        response.status(404).send(error.message);
    }
});
module.exports = router;