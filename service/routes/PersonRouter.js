const express = require('express');
const router = express.Router();

const { createPerson, updatePerson, deletePerson, getAllPeople  } = require('../controllers/PersonController');

router.get('/get', getAllPeople);
router.post('/create', createPerson);
router.put('/update/:id', updatePerson);
router.delete('/delete/:id', deletePerson);

module.exports = router;