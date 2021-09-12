const Project = require('../models/aiProject.model')


//GET ALL THE PROJECTS 
exports.getAiProjects = async (req,res,next) =>{
    try {
        projects = await Project.find()
        let data = []
        for (let index = 0; index < projects.length; index++) {
            data.push({
                "title": projects[index].title,
                "id": projects[index]._id,
                "metric": projects[index].metric
            })
               
        }
        return res.status(200).json({message:'Projects found', projects:data})
    } catch (error) {
        console.log(error)
    }
    
    
}

//GET A SPECIFIC PROJECT
exports.getAiProject = async (req,res,next) => {
    try {
        const projectId = req.params.aiProjectId
        const project = await Project.find({dir:projectId})
        if(!project){ 
            const error = new Error('Project Not Fount')
            error.statusCode = 404
            throw error
        }
        return res.status(200).json({message:'Project found', project:project[0]})
 
    } catch (error) {
        console.log(error)
    }
}

//POST A NEW PROJECT
exports.postAiProject = async (req,res,next) => {
    
    try { 
        console.log('hit')
     
        dir = 'telco_costumer'
        title = "Customer Churn Prediction"
        goal = 'Create a model to predict whether or not a customer will Churn'
        description = 'Data regarding a specific client information may help predicting wether that customer will or will not churn'
        attributes = ["gender", "SeniorCitizen", "Partner", "Dependents", "tenure", "PhoneService", "MultipleLines", "InternetService", "OnlineSecurity", "OnlineBackup", "DeviceProtection", "TechSupport", "StreamingTV", "StreamingMovies", "Contract", "PaperlessBilling", "PaymentMethod", "MonthlyCharges", "TotalCharges"]
        attributes_info= ["Male or Female", "Dummy(0 or 1)", "Yes or No", "Yes or No", "Number of months the customer has stayed with the company", "Yes or No", "No phone service, No , Yes", "DSL, Fiber, optic, No", "Yes or No", "Yes or No", "Yes or No", "Yes or No", "Yes or No", "Yes or No", "Month-to-month, One year, Two year", "Yes or No", "Electronic check, Mailed check, Bank transfer (automatic), Credit card (automatic)", "The amount charged to the customer monthly", "The total amount charged to the customer"]
        mean_values = ['Female',
                        0,
                        'Yes',
                        'No',
                        1,
                        'No',
                        'No phone service',
                        'DSL',
                        'No',
                        'Yes',
                        'No',
                        'No',
                        'No',
                        'No',
                        'Month-to-month',
                        'Yes',
                        'Electronic check',
                        29.85,
                        29.85]
        metric = 'accuracy: 83%',
        tag='parameters'

        const project = new Project({
            dir : dir,
            title:title,
            goal : goal,
            description: description,
            attributes : attributes,
            attributes_info:attributes_info,
            mean_values : mean_values,
            metric : metric,
            tag:tag
        })

        
        await project.save().then(project=>{
            console.log(project._id)
        })
       
        return res.status(200).json({message:'Project Created'})

    } catch (error) {
        console.log(error)
    }
}
 