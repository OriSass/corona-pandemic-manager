const { Router } = require('express');
const { response } = require('../../app');
const router = Router();
const { patients, cities, hospitals, symptoms, covidTests } = require('../../models');

// configurated error: minimum code duplication
// problem: no access to response

// const tryAndCatch = async(myResponse) => {
//     try {
//         myResponse;
//     } catch (error) {
//         response.status(400).send(error.message);
//     }
// }

router.get('/', async(request, response) => {
    try {
        const allPatients = await patients.findAll({
            include: [{ model: cities, attributes: ['name', 'population'] },
                      { model: hospitals, attributes: ['name'] },
                      { model: symptoms, attributes: ['name'] },
                      { model: covidTests, attributes: ['isSick']}]
        });
        response.json(allPatients);    
        
    } catch (error) {
        response.status(400).send(error.message);
    }
});
router.get('/byId/:patientId', async(request, response) => {
    try {
        const patientId = request.params.patientId; 
        const patient = await patients.findOne({
            where: { id: patientId },
            include: [{ model: cities, attributes: ['name', 'population'] },
                      { model: hospitals, attributes: ['name'] },
                      { model: symptoms, attributes: ['name'] },
                      { model: covidTests, attributes: ['isSick']}]
        });
        response.json(patient);
        
    } catch (error) {
        response.status(400).send(error.message);
    }
});
router.get('/byName/:patientName', async(request, response) => {
    try {
        const patientName = request.params.patientName;
        const patient = await patients.findOne({
            where: { name: patientName },
            include: [{ model: cities, attributes: ['name', 'population'] },
                      { model: hospitals, attributes: ['name'] },
                      { model: symptoms, attributes: ['name'] },
                      { model: covidTests, attributes: ['isSick']}]
        });
        response.json(patient);   
    } catch (error) {
        response.status(400).send(error.message);
    }
});
router.get('/positive', async(request, response) => {
    const positivePatients = await covidTests.findAll({
        attributes: ["patientId"],
        where: { isSick: true },
        include: [ 
            {
                model: patients,
                include: [
                  { model: cities, attributes: ['name', 'population'] },
                  { model: hospitals, attributes: ['name'] },
                  { model: symptoms, attributes: ['name'] },
                  { model: covidTests, attributes: ['isSick']}
                ]
            }]
    });
    response.json(positivePatients);
});

router.post('/', async(request, response) => {
    try {
        await patients.create(request.body);
        response.status(201).send('ADDED PATIENT');
    } catch (error) {
        response.status(400).send(error.message);
    }
})
router.delete('/:patientId', async(request, response) => {
    try {
        const patientId = request.params.patientId
        await patients.destroy({
            where: {id:patientId}
        });
        response.status(200).send('DELETED PATIENT');
    } catch (error) {
        response.status(404).send(error.message);
    }
})

module.exports = router;