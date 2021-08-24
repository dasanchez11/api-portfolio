const mongoose = require('mongoose')

const Schema = mongoose.Schema

const aiProjectSchema = new Schema({
    dir: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    goal: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    attributes: [
        {type: String,
        required: true}
    ],
    attributes_info: [
        {type: String,
        required: true}
    ],
    mean_values: [
        {type: String,
        required: true}
    ],
    metric:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('aiProjects', aiProjectSchema)
