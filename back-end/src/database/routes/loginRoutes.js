const { Router } = require('express');
const loginController = require('../controllers/LoginController');

const routes = Router();

routes.post('/', loginController.login);

module.exports = routes;