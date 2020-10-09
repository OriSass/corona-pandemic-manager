const { Router } = require('express');
const router = Router();
const { Symptoms, SymptomsByPatients } = require('../../models');

router.delete('/:patientId', async(request, response) => {
    try {
        const { patientId, symptomId } = request.body;
        await SymptomsByPatients.destroy({
            where: { patientId, symptomId}
        });
        response.status(200).send('Deleted a symptom for specific patient')
    } catch (error) {
        response.status(404).send(error.message);
    }
});
module.exports = router;