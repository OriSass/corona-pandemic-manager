const { Router } = require('express');
const { response } = require('../../app');
const router = Router();
const { Patients, Cities, Hospitals, Symptoms, CovidTests, SymptomsByPatients } = require('../../models');

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
        const allPatients = await Patients.findAll({
            include: [{ model: Cities, attributes: ['name', 'population'] },
                      { model: Hospitals, attributes: ['name'] },
                      { model: CovidTests, attributes: ['isSick']},
                      { model: SymptomsByPatients, attributes: ['patientId','symptomId'],
                            include: [{ model: Symptoms, attributes: ['name']}] }]
        });
        response.json(allPatients);    
        
    } catch (error) {
        response.status(400).send(error.message);
    }
});
router.get('/byId/:patientId', async(request, response) => {
    try {
        const patientId = request.params.patientId; 
        const patient = await Patients.findOne({
            where: { id: patientId },
            include: [{ model: Cities, attributes: ['name', 'population'] },
                      { model: Hospitals, attributes: ['name'] },
                      { model: CovidTests, attributes: ['isSick']}
                      ,
                      { model: SymptomsByPatients, 
                            include: [{model: Symptoms}]
                        },
            ]});
        response.json(patient);
        
    } catch (error) {
        response.status(400).send(error.message);
    }
});
router.get('/byName/:patientName', async(request, response) => {
    try {
        const patientName = request.params.patientName;
        const patient = await Patients.findOne({
            where: { name: patientName },
            include: [{ model: Cities, attributes: ['name', 'population'] },
                      { model: Hospitals, attributes: ['name'] },
                      { model: CovidTests, attributes: ['isSick']},
                      { 
                          model: SymptomsByPatients,
                            include: [{ model: Symptoms, attributes: ['name']}]
                        }]
        });
        response.json(patient);   
    } catch (error) {
        response.status(400).send(error.message);
    }
});
router.get('/positive', async(request, response) => {
    const positivePatients = await CovidTests.findAll({
        attributes: ["patientId"],
        where: { isSick: true },
        include: [ 
            {
                model: Patients,
                attributes: ['name'],
                include: [
                  { model: Cities, attributes: ['name', 'population'] },
                  { model: Hospitals, attributes: ['name'] },
                  { model: SymptomsByPatients, 
                    include: [{ model: Symptoms, attributes: ['name']}] },
                ]
            }]
    });
    response.json(positivePatients);
});

router.post('/', async(request, response) => {
    try {
        ///console.log(request.body);
        const name = request.body.name;
        await Patients.create(request.body);
        const p = await Patients.findOne({where: {name: name} });
        const id = p.id;
        await CovidTests.create({id: 999, patientId: id});
        const newPatient = await Patients.findOne({
            where: {id},
            include: [{model: CovidTests}]});
        console.log(newPatient);
        response.json(newPatient);
    } catch (error) {
        response.status(400).send(error.message);
    }
})
router.delete('/:patientId', async(request, response) => {
    try {
        const patientId = request.params.patientId
        await Patients.destroy({
            where: {id:patientId}
        });
        response.status(200).send('DELETED PATIENT');
    } catch (error) {
        response.status(404).send(error.message);
    }
})

module.exports = router;