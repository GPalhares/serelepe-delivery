const express = require('express');
const { Router } = require('express');
const cors = require('cors');
const loginRoute = require('./loginRoutes');
const registerRoute = require('./registerRoutes');

const app = express();

app.use(cors());

const routes = Router();

routes.use('/login', loginRoute);
routes.use('/register', registerRoute);

module.exports = routes;