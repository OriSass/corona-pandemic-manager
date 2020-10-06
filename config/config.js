require('dotenv').config();
module.exports = {
  "development": {
    "username": "root",
    "password": "kalia123",
    "database": "covid_19",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "define": {"underscored": true}
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "db_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "define": {"underscored": true}
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
