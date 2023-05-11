const { Router } = require('express');
const SellersController = require('../controllers/registerController');

const routes = Router();

routes.get('/', SellersController.getSeller);

module.exports = routes;