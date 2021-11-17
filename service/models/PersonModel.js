const { Schema, model } = require('mongoose');

var PersonSchema = Schema({
    name: {
        type: "String",
        required: true
    }
},{timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})

module.exports = model('Person',PersonSchema)