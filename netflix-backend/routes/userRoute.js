const express = require('express');
const user_route = express.Router();
const bodyParser = require('body-parser');

user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}));


const user_controller = require('../controllers/userController');
user_route.post('/create-user', user_controller.createUser);
user_route.post('/update-user', user_controller.updateUser);
user_route.post('/fetch-user', user_controller.getUser);
user_route.post('/delete-user', user_controller.deleteUser);
user_route.post('/fetch-users', user_controller.getUsers);
user_route.post('/delete-watchlist', user_controller.deleteWatchlistItem);
user_route.post('/fetch-watchlist', user_controller.fetchWatchlistItems);
user_route.post('/get-recommendation', user_controller.getRecommendation);

module.exports = user_route;