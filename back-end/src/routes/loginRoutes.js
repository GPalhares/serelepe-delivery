const { Router } = require('express');
const cors = require('cors');
const loginController = require('../controllers/loginController');

const routes = Router();

routes.post('/', cors(), loginController.login);

module.exports = routes;