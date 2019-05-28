var express = require('express');
var router = express.Router();
var author_controller = require('../controllers/personController');

router.get('/person/:id', author_controller.author_detail);

router.get('/persons', author_controller.get_allPersons);

router.post('/person', author_controller.create_person);

router.delete('/person/:id', author_controller.delete_person);

router.get('/person/:age/:profession', author_controller.get_person_by_age_profession);

module.exports = router;
