const { Router } = require('express');
const router = Router();
const { Symptoms, SymptomsByPatients } = require('../../models');

router.get('/', async(request, response) => {
    try {
        const allSymptoms = await Symptoms.findAll();
        response.json(allSymptoms);
    } catch (error) {
        response.status(404).send(error.message);
    }
});
router.get('/byId/:symptomId', async(request, response) => {
    try {
        const symptom = await Symptoms.findOne({
            where: { id: request.params.symptomId}
        });
        response.json(symptom);
    } catch (error) {
        response.status(404).send(error.message);
    }
});
router.post('/byId/:symptomId', async(request, response) => {
    try {
        const { patientId, symptomId } = request.body;
        await SymptomsByPatients.create({
            patientId, symptomId
        });
        response.status(200).send('Added new symptom for patient')
    } catch (error) {
        response.status(404).send(error.message);
    }
});
module.exports = router;
