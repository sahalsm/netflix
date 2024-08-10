const express = require('express');
const content_route = express.Router();
const bodyParser = require('body-parser');

content_route.use(bodyParser.json());
content_route.use(bodyParser.urlencoded({extended:true}));


const content_controller = require('../controllers/contentController');
content_route.post('/fetch-contents', content_controller.fetchContents);
content_route.post('/delete-content', content_controller.deleteContent);

module.exports = content_route;