const Person = require('../models/PersonModel');

var PersonController = {
    createPerson: async (req, res) => {
        try {
            const person = new Person({
                 name: req.body.name 
                });
            
            await person.save();

            return res.status(201).json({
                data: person,
                message: "Person added"});
        } catch (err) {
            console.error(err);
            return res.status(400).json({
                data: null,
                message: err
            });
        }
    },
    updatePerson: async (req, res) => {
        try {
            var actualPerson = await Person.findOne(req.params.id);
            
            actualPerson = {
                name: req.body.name
            }

            await Person.findByIdAndUpdate(req.params.id,actualPerson);
            
            return res.status(200).json({
                data: actualPerson,
                message: "Person updated"});
        } catch (err) {
            console.error(err);
            return res.status(400).json({
                data: null,
                message: err
            });
        }
    },
    deletePerson: async (req, res) => {
        try {
            const deletedPerson = await Person.findByIdAndRemove(req.params.id);
            
            return res.status(200).json({
                data: deletedPerson,
                message: "Person deletede"
            });
        } catch (err) {
            console.error(err);
            return res.status(200).json({
                data: null,
                message: err
            });
        }
    },
    getAllPeople: async (req, res) => {
        try{
            const people = await Person.find();
            
            return res.status(200).json({
                data: people,
                message: "People list obtained"
            })
        }catch(err){
            return res.status(400).json({
                data: null,
                message: err
            });
        }
    }
}

module.exports = PersonController;