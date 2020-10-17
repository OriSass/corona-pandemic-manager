const { Router } = require('express');
const router = Router();
const { Hospitals, Patients, CovidTests } = require('../../models');
const { Sequelize, Op } = require('sequelize');

router.get('/', async(request, response) => {
    try {
        const allHospitals = await Hospitals.findAll();
        response.json(allHospitals);
    } catch (error) {
        response.status(404).send(error.message);
    } 
});
router.get('/byId/:hospitalId', async(request, response) => {
    try {
        const hospital = await Hospitals.findOne({
            where: {id: request.params.hospitalId}
        });
        response.json(hospital);
    } catch (error) {
        response.status(404).send(error.message);
    } 
});
router.get('/respirator_luck', async(request, response) => {
    try {
        // let needMoreMachines = [];
        // const allHospitals = JSON.parse(JSON.stringify(await Hospitals.findAll()));
        // //const allHospitals = await Hospitals.findAll();
        // console.log(allHospitals);
        // await allHospitals.forEach(async(hospital, i) => {
        //     console.log(`\n${i}st HOSPITAL \n`);
        //     const h = JSON.parse(JSON.stringify(await Hospitals.findOne({
        //         where: {id: hospital.id},
        //         include: [ 
        //             {
        //                 model: Patients,
        //                 attributes:[[Sequelize.fn("COUNT", Sequelize.col("status")), 'patientCount']],
        //                 where: { status: "respiratory"}
        //             }]
        //     })));
        //     if(h.Patients.length > 0){
        //         const patientCount = h.Patients[0].patientCount;
        //         //console.log(`Patient Count is: ${patientCount}`);
        //         console.log(`\n${h.name} has patients\n`);
        //         let freeRespirators = h.respiratorAmount - patientCount;
        //         if(freeRespirators < 5){
        //             // data[i].freeRespiratorsAmount = freeRespirators;
        //             console.log(`\n${h.name} NEED MORE MACHINES\n`);
        //             needMoreMachines = [...needMoreMachines, h.name];
        //             //console.log(needMoreMachines);
        //         }
        //     }
        // })
       
        // console.log(`\n\nTHE FOLLOWING HOSPITALS: ${needMoreMachines}`);
        // response.json(needMoreMachines);

        const respiratoryHospitals = JSON.parse(JSON.stringify(await Hospitals.findAll({
            attributes: ["name","respiratorAmount", "id"],
            include: [ 
                {
                    model: Patients,
                    attributes:[[Sequelize.fn("COUNT", Sequelize.col("status")), 'patientCount'], "hospitalId"],
                    where: { status: "respiratory"}
                }],
            group: ["Patients.hospital_id"]

        })));
        const filtered = respiratoryHospitals.filter(hospital => {
            //console.log(hospital.respiratorAmount);
            //console.log('ma count: ' + hospital.Patients[0].patientCount);
            let freeMachines = hospital.respiratorAmount - hospital.Patients[0].patientCount;
            //console.log('free: ' + freeMachines);
            return (freeMachines < 5)})
        console.log(filtered);
        response.json(filtered);
    } catch (error) {
        response.status(404).send(error.message);
    } 
});

module.exports = router;