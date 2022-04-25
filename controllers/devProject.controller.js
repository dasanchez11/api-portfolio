const DevProject = require('../models/devProject.models');
const Data = require('../data/data');
const fs = require('fs');
const path = require('path')
const aiProject = require('../models/aiProject.model')


// GET Development Projects
exports.getDevProjects = async (req,res,next) => {
    try {
        devProject = await DevProject.find().sort({date: -1})
        res.status(200).json({message:'successfully',project: devProject})

    } catch (error) {
        console.log("error",error)
        error = new Error()
        error.status(400)
        error.message('fail to load source')
        throw error
    }
}

// POST Development Project
exports.postDevProject = async (req,res,next) => {
    try {

        console.log('hit post point')
        // post machine learning project and return machineLearning Id

        dir = 'bogota_housing'
        title = "Bogotá Residential Prediction"
        goal = 'Create a model to estimate the price of a residential asset in the city of Bogotá'
        description = 'Based on the prices of different assets in the city of Bogotá, a Data Set was created, in order to estimate the value of an asset'
        attributes = ['Business Type', 'Property Type', 'Rooms','Bathrooms', 'Estrato', 'Construction Age', 'Area','Private Area', 'Latitude', 'Longitude']
        attributes_info= ["'venta' o 'Venta y Arriendo'", "'Apartamento' o 'Casa'", "Number of rooms", "number of bathrooms", "Estrato", "'Entre 0 y 5 años','Más de 20 años','Entre 5 y 10 años','Remodelado','Entre 10 y 20 años'", "Area in squared meters", "Private Area in squared meters", "Latitude", "Longitude"]
        mean_values = ['venta', 'Apartamento', 2.0, 1.0, 6.0, 'Entre 0 y 5 años', 102.0,102.0, 4.6533326, -74.083652]
        metric = 'MAE: $105,000,000'

        const aiproject = new aiProject({
            dir : dir,
            title:title,
            goal : goal,
            description: description,
            attributes : attributes,
            attributes_info:attributes_info,
            mean_values : mean_values,
            metric : metric
        })
        let machLearn = ""
        await aiproject.save().then(project => machLearn = project._id)

        // Post Dev Project

        title= 'Bogotá Housing'
        shortDescription= 'Machine Learning project to determine the price of an asset'
        gitHubLink= 'https://github.com/dasanchez11/Bogot-Housing'
        liveLink= 'bogota_housing'
        image= '../devProjectImages/sonar.jpg'
        tags= ['machineLearning','python']
        machineLearningId= machLearn
        resources= ['python', 'scikit-learn','pandas','numpy']

        devProject = new DevProject({
                    title:title,
                    shortDescription:shortDescription,
                    gitHubLink:gitHubLink,
                    liveLink:liveLink,
                    image:image,
                    tags:tags,
                    machineLearningId:machineLearningId,
                    resources:resources,
                })

        await devProject.save()

        return res.status(200).json({message:'Project Created'})
    } catch (error) {
        console.log(error)
    }
}




 
// for (let i = 0; i < Data.length; i++) {
//     title = Data[i].title;
//     shortDescription = Data[i].shortDescription;
//     gitHubLink = Data[i].gitHubLink;
//     liveLink = Data[i].liveLink;
//     try {
//         var bitmap = base64_encode("./devProjectImages/"+title+'.jpg');
//         image = bitmap
        
        
//     } catch (error) {
//         var bitmap = base64_encode("./devProjectImages/"+'API'+'.jpg');
//         image = bitmap
//     }
//     tags = Data[i].tags;
//     machineLearningId = Data[i].machineLearningId;
//     resources = Data[i].resources;


//     devProject = new DevProject({
//         title:title,
//         shortDescription:shortDescription,
//         gitHubLink:gitHubLink,
//         liveLink:liveLink,
//         image:image,
//         tags:tags,
//         machineLearningId:machineLearningId,
//         resources:resources,
//     })

//     await devProject.save()
// }




// function base64_encode(file) {
//     // read binary data
//     var bitmap = fs.readFileSync(file);
//     // convert binary data to base64 encoded string
//     return new Buffer(bitmap).toString('base64');
// }