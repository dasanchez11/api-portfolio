const mongoose = require('mongoose');
const Schema = mongoose.Schema

const devProject = new Schema({
    title:{
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    gitHubLink: {
        type: String,
        required: false
    },
    liveLink: {
        type: String,
        required:false
    },
    tags: [
        {
            type: String
        }
    ],
    resources: [
        {type: String}
    ],
    machineLearningId: {
        type: String,
        required:false
    }
})


module.exports = mongoose.model('devProjects',devProject)

