const express = require('express');
const router = express.Router();

const { createPerson, updatePerson, deletePerson, getAllPeople  } = require('../controllers/PersonController');

router.get('/', getAllPeople);
router.post('/', createPerson);
router.put('/:id', updatePerson);
router.delete('/:id', deletePerson);

module.exports = router;