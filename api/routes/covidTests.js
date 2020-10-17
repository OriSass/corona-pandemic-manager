const { Router } = require('express');
const router = Router();
const { CovidTests } = require('../../models');
const { Sequelize } = require('sequelize');

router.get('/', async(request, response) => {
    try {
        const allTests = await CovidTests.findAll();
        response.json(allTests);
    } catch (error) {
        response.status(404).send(error.message);
    }
});
router.get('/test-results/:testResult', async(request, response) => {
    try {
        const result = Boolean(parseInt(request.params.testResult))
        const testsByResult = await CovidTests.findAll({
            where: {isSick: result},
            attributes:[[Sequelize.fn("COUNT", Sequelize.col("is_sick")), 'count']],
        });
        response.json(testsByResult[0]);
    } catch (error) {
        response.status(404).send(error.message);
    }
});
router.get('/:patientId', async(request, response) => {
    try {
        const { patientId } = request.params;
        const patientTests = await CovidTests.findAll({where: {patientId}});;
        response.json(patientTests[0]);
    } catch (error) {
        response.status(404).send(error.message);
    }
});
router.delete('/:testId', async(request, response) => {
    try {
        const { testId } = request.params;
        await CovidTests.destroy({where: {id: testId}});
        response.status(200).send(`DELETED TEST ${testId}`);
    } catch (error) {
        response.status(404).send(error.message);
    }
});
router.put('/:testId', async(request, response) => {
    try {
        const { testId } = request.params;
        const update = request.body;
        await CovidTests.update(update, {where: {id: testId}});
        response.status(200).send(`UPDATED TEST ${testId}`);
    } catch (error) {
        response.status(404).send(error.message);
    }
});
module.exports = router;