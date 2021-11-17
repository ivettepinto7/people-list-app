const Person = require('../models/PersonModel');

var PersonController = {
    createPerson: async (req, res) => {
        try {
            const person = new Person({
                 name: req.body.name 
                });
            
            await person.save();

            return res.json({
                status: "success",
                data: person,
                message: "Person added"});
        } catch (err) {
            console.error(err);
            return res.json({
                status: "error",
                data: null,
                message: err
            });
        }
    },
    updatePerson: async (req, res) => {
        try {
            var {name} = req.body;
            const newPerson = {name};
            
            await Person.findByIdAndUpdate(req.params.id, newPerson);
            return res.json({
                status: "success",
                data: newPerson,
                message: "Person updated"});
        } catch (err) {
            console.error(err);
            return res.json({
                status: "error",
                data: null,
                message: err
            });
        }
    },
    deletePerson: async (req, res) => {
        try {
            const deletedPerson = await Person.findByIdAndRemove(req.params.id);
            return res.json({
                status: "success",
                data: deletedPerson,
                message: "Person deletede"
            });
        } catch (err) {
            console.error(err);
            return res.json({
                status: "error",
                data: null,
                message: err
            });
        }
    },
    getAllPeople: async (req, res) => {
        try{
            const people = await Person.find();
            return res.json({
                status: "success",
                data: people,
                message: "People list obtained"
            })
        }catch(err){
            return res.json({
                status: "error",
                data: null,
                message: err
            });
        }
    }
}

module.exports = PersonController;