const Person = require('../models/PersonModel');

var PersonController = {
    createPerson: async (req, res) => {
        try {
            const person = new Person({
                 name: req.body.name 
                });
            
            await person.save();

            return res.status(201).json({error: false, message: "Person added"});
        } catch (err) {
            return res.status(400).json(err.details != null ? err.details[0].message : err);
        }
    },
    updatePerson: async (req, res) => {
        try {
            var {name} = req.body;
            const newPerson = {name};
            
            await Person.findByIdAndUpdate(req.params.id, newPerson);
            return res.status(200).json({error: false, message: "Person updated"});
        } catch (err) {
            return res.status(400).json(err.details != null ? err.details[0].message : err);
        }
    },
    deletePerson: async (req, res) => {
        try {
            await Person.findByIdAndRemove(req.params.id);
            return res.status(200).json({ error: false, message: "Person deletede"});
        } catch (err) {
            return res.status(400).json(err.details != null ? err.details[0].message : err);
        }
    },
    getAllPeople: async (req, res) => {
        try{
            const people = await Person.find();
            res.status(200).json(people);
        }catch(err){
            return res.status(400).json(err.details != null ? err.details[0].message : err);
        }
    }
}

module.exports = PersonController;