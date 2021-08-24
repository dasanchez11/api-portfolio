const DevProject = require('../models/devProject.models');
const Data = require('../data/data');
const fs = require('fs');
const path = require('path')


// GET Development Projects
exports.getDevProjects = async (req,res,next) => {
    try {
        
        devProject = await DevProject.find().sort({date: -1})
        return res.status(200).json({message:'successfully',project: devProject})

    } catch (error) {
        console.log(error)
    }
}

// POST Development Project
exports.postDevProject = async (req,res,next) => {
    try {
        console.log('hit')
        title= 'Telecom Customer Churn'
        shortDescription= 'Machine Learning model to predict whether or not a customer will Churn'
        gitHubLink= ''
        liveLink= 'telco_costumer'
        image= '../devProjectImages/sonar.jpg'
        tags= ['machineLearning','python']
        machineLearningId='61219c520fd5f3fc9866d583'
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