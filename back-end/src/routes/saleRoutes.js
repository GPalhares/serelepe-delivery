const { Router } = require('express');
const saleController = require('../controllers/saleController');

const routes = Router();

routes.get('/', saleController.getAllSales);
routes.get('/:id', saleController.detailedSale);
routes.post('/', saleController.createSale);
routes.put('/orders', saleController.updateSale);

module.exports = routes;
