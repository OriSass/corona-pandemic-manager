const { Router } = require('express');
const router = Router();
const { hospitals, patients, covidTests } = require('../../models');
const { Op } = require("sequelize");

router.get('/', async(request, response) => {
    try {
        const allHospitals = await hospitals.findAll();
        response.json(allHospitals);
    } catch (error) {
        response.status(404).send(error.message);
    } 
});
router.get('/respirator_luck', async(request, response) => {
    try {
        const needMoreMachines = [];
        const hospitalsWithRespiratorPatients = await hospitals.findAll({
            include: [ 
                {
                    model: patients,
                    attributes: ["name"],
                    where: { status: "respiratory"}
                }]

        });
        const JsonData = JSON.stringify(hospitalsWithRespiratorPatients); 
        const data = JSON.parse(JsonData);
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            let freeRespirators = data[i].respiratorAmount - data[i].patients.length;
            if(freeRespirators <= 5){
                data[i].freeRespiratorsAmount = freeRespirators;
                needMoreMachines.push(data[i]);
            }
        }
        response.json(needMoreMachines);
    } catch (error) {
        response.status(404).send(error.message);
    } 
});
router.get('/', async(request, response) => {
    try {
        const allHospitals = await hospitals.findAll();
        response.json(allHospitals);
    } catch (error) {
        response.status(404).send(error.message);
    } 
});
module.exports = router;