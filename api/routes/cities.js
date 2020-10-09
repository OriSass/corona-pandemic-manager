const { Router } = require('express');
const router = Router();
const { Cities, Patients, CovidTests } = require('../../models');

router.get('/', async(request, response) => {
    try {
        const allCities = await Cities.findAll({
            include: [{
                model: Patients,
                attributes: ["name"],
                include: [{ model: CovidTests, where: {isSick: true}}]             
            }]
        });
        response.json(allCities);  
    } catch (error) {
        response.status(404).send(error.message);
    }
    
});
router.get('/byId/:cityId', async(request, response) => {
    try {
        const city = await Cities.findOne({
            where: { id: request.params.cityId },
            include: [{ model: Patients, attributes: ["name"] }]
        });
        const data = JSON.parse(JSON.stringify(city));
        data.patientCounts = data.Patients.length;
        response.json(data);  
    } catch (error) {
        response.status(404).send(error.message);
    }  
});
router.get('/mostsick', async(request, response) => {
    try {
        let maxPatients = 0;
        const allCities = await Cities.findAll({
            attributes: ["name"],
            include: [{ model: Patients, attributes: ["name"] }]
        });
        const data = JSON.parse(JSON.stringify(allCities));
        for(let i = 0; i < data.length; i++) {
            if(data[i].Patients !== undefined) {
                console.log(maxPatients);
                data[i].patientCount = data[i].Patients.length;
                //console.log(`City ${data[i].id} has ${data[i].patientCount} patients`);
                if(data[i].patientCount > maxPatients){
                    maxPatients = data[i].patientCount;
                }
            }
        }
        console.log(data);
        const sickestCities = data.filter((city) => city.patientCount === maxPatients);
        response.json(sickestCities);  
    } catch (error) {
        response.status(404).send(error.message);
    }  
});
router.put('/:cityId', async(request, response) => {
    try {
        const { name, population } = request.body;
        await Cities.update({ name, population },{ where: {id: request.params.cityId}});
        response.status(200).send("CITY UPDATED"); 
    } catch (error) {
        response.status(404).send(error.message);
    }
})
router.delete('/:cityId', async(request, response) => {
    try {
        await Cities.destroy({where: { id: request.params.cityId }});
        response.status(200).send("CITY DELETED");
    } catch (error) {
        response.status(404).send(error.message);
    }
})
module.exports = router;
