# Corona Manager Challenge

## Welcome To The Challenge!
We need your help to beat the COVID pandemic !! \
this challenge will test your Back-End skills. you are required to use express.js and sequelize to analyze data from the given data base.


## Table Of Contents

* [Getting Started](#Getting-Started)
* [Tasks](#Tasks) 
* [Rest API](#Rest-API)
* [Database Requirements](#Database-Requirements)
* [Rest API Requirement](#Rest-API-Requirement)

## Getting Started
### Some steps to begin the challenge:
1. Run - npm install in the terminal.(To install all the dependencies in the package.json).
2. Run sequelize init.
3. Add a .env file and store all your configuration data that you will add in the next steps to the config  file for the connection to your dataBase, for example, host, password, user and data-base name(you can add more if you fill so). env file is actually a simple configuration text file that is used to define some variables you want to pass into your application's environment. (Good resource about [Environment Variables](#https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786))
4. Change the config file that is inside your config folder to a javaScript file, that is the way to use the configuration data that is inside the .env file.
Remember to add "require('dotenv').config();" at the top of the config.js file to actually make the data inside the env file readable to the config.js file, and of course don't forget to module.export the config.js file that supposed to be a nested Object.
5. After you defined the config file to js and also changed the reference inside, it suppose to run.
6. Run the client- it will not work until you finish the functionality in the server.

## Tasks
- Use underscore in DB in all the models tables. In node it should perform in camelCase. Hint: ("define": {"underscored": true})
- Create the right migrations and models based on the requirements we give.
- After you created all your models and tables you can copy the build seeders to your seeders, and run the seeders command, that will run the seeders file that you have in your backend (command: npx sequlize-cli db:seed:all)
- Use the Sequelize Paranoid (in all tables), make sure that all models have "deletedAt" column.
- Create an express server that will analyze details from the data base and display it to the client.
- Build [Rest-API](#Rest-API) for each model in the data base.
- Pass all the tests.

## Database Requirements(the test checks that)
### Database
- SQL only!
- Use Sequelize
- Database name has to be called - "covid_19"
- Test DataBase name should be "db_test"
- When submiting change the test section in config file to be:
"test": {
    "username": "root",
    "password": null,
    "database": "db_test",
    "host": "localhost",
    "dialect": "mysql",
    "define": {"underscored": true}
},

### Patients Table
- Columns: id, dateOfBirth, name, symptom, status('sick', 'respiratory', 'recovered', 'dead', 'isolation'), cityId, hospitalId.
### Cities Table
- Columns: id, name, population.
### Hospitals Table
- Columns: id, name, respiratorAmount, maxCapacity. 
### Symptomps Table
- Columns: id, name
### SymptomsByPatients Table
- Columns: id, patientId, symptomId
### CovidTests Table
- Columns: id, patientId, isSick(boolean).


## Rest API Requirements

### Patients
#### GET Methods
- GET "/api/v1/patients" all patients with their city, symptoms, covid test and status. 
- GET "/api/v1/patients/byId/:patientId" patient by id with their city, symptoms, covid test and status.
- GET "/api/v1/patients/byName/:patientName" patient by name with their city, symptoms, covid test and status.
- GET "/api/v1/patients/positive" all patients with covid Tests that are positive.
#### POST Methods
- POST "/api/v1/patients" a new patient with new CovidTests and thier new symptom
#### DELETE Methods
- "/api/v1/patients/:patientId DELETE a patient.

### Hospitals
#### GET Methods
- GET "/api/v1/hospitals" all hospitals with their capacity (maxCapacity), number of respirator (respiratorAmount)
- GET "/api/v1/hospitals/byId/:hospitalId" Hospital by id.
- GET "/api/v1/hospitals/respirator_luck" all the hospitals that need to bring more respirator machines (less than five machines that are available in the hospital).

### Cities
#### GET Methods
- GET "/api/v1/cities" all cities number of sick people in every hospital in the city.
- GET "/api/v1/cities/byId/:cityId" city by id with its number of patients.
- GET "/api/v1/cities/mostsick" the city with the most patients (regardless of their state) as an array as there can be several cities at the top.
#### PUT Methods
- PUT "/api/v1/cities/:cityId" update a city name or population. 
#### DELETE Methods
- DELETE "/api/v1/cities/:cityId" a city.

### Symptoms
#### GET Methods
- GET "/api/v1/symptoms" all symptoms.
- GET "/api/v1/symptoms/byId/:symptomId" symptom by id.
#### POST Methods
- POST "/api/v1/symptoms" add new symptom for patient

#### DELETE Methods
- DELETE  "/api/v1/symptomsByPatient/:patientId" delete symptom by patient id.

### Covid Tests
#### GET Methods
- GET "/api/v1/covidtests/test-results/:testResult" The amount of covid test by result(true- 1/ false- 0)
- GET "/api/v1/covidtests/test-results/:pateintId" All covid tests by patient id.
#### PUT Methods
- PUT "/api/v1/covidtests/:testId update covid test result by the test id. 

#### DELETE Methods
- DELETE a patient with paranoid.
- DELETE "/api/v1/covidtests/:testId a covid test.

## Good Luck!
