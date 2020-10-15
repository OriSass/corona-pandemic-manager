const { Router } = require('express');
const router = Router();
const { CovidTests } = require('../../models');
const { Sequelize } = require('sequelize');

router.get('/test-results/:testResult', async(request, response) => {
    try {
        const result = Boolean(parseInt(request.params.testResult))
        const testsByResult = await CovidTests.findAll({
            where: {isSick: result},
            attributes:[[Sequelize.fn("COUNT", Sequelize.col("is_sick")), 'count']],
        });
        //console.log(`$$$$$$$$$$$$ LENGTH: ${testsByResult.length}`);
        // const data = await JSON.stringify(testsByResult);
        // data.count = testsByResult.length; 
        // await JSON.parse(data);
        response.json(testsByResult);
    } catch (error) {
        response.status(404).send(error.message);
    }
});
router.get('/test-results/:patientId', async(request, response) => {
    try {
        const { patientId } = request.params;
        const patientTests = await CovidTests.findAll({where: {patientId}});
        response.json(patientTests);
    } catch (error) {
        response.status(404).send(error.message);
    }
});
// router.put('/:testId', async(request, response) => {
//     try {
//         const { testId } = request.params;
//         const patientTests = await CovidTests.findAll({where: {patientId}});
//         response.json(patientTests);
//     } catch (error) {
//         response.status(404).send(error.message);
//     }
// });
module.exports = router;