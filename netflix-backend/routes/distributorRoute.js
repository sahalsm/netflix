const express = require('express');
const distributor_route = express.Router();
const bodyParser = require('body-parser');

distributor_route.use(bodyParser.json());
distributor_route.use(bodyParser.urlencoded({extended:true}));


const distributor_controller = require('../controllers/distributorController');
distributor_route.post('/create-distributor', distributor_controller.createDistributor);
distributor_route.post('/update-distributor', distributor_controller.updateDistributor);
distributor_route.post('/fetch-distributor', distributor_controller.getDistributor);
distributor_route.post('/delete-distributor', distributor_controller.deleteDistributor);
distributor_route.post('/fetch-distributors', distributor_controller.getDistributors);
distributor_route.post('/distributor-payment', distributor_controller.distributorPayment);


module.exports = distributor_route;