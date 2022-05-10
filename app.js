require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

// INITIALIZE THE APP
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// ALLOW CORS 
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', "https://zealous-tesla-e014fe.netlify.app")
    //res.setHeader('Access-Control-Allow-Origin', "http://localhost:3000");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next()
})

const devProjectRoutes = require('./routes/devProject.route')
app.use('/devProject', devProjectRoutes)

const aiProjectsRoutes = require('./routes/aiProject.route')
app.use('/aiProject', aiProjectsRoutes)

const emailRoutes = require('./routes/email.route')
app.use('/contact', emailRoutes)



app.use('/', (req,res,next)=>{
    res.status(200).json('Hello Admin Diego')
})
// FUNCTINO TO COONECT TO THE SERVER
const connect = async () =>{
    try {
      await  mongoose.connect(process.env.MONGODB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      })
        
    } catch (error) {
        console.log(error)
    }

    app.listen(process.env.PORT);
    console.log('app is running on port:'+ process.env.PORT)
};

// INITIALIZE SERVER CONNECTION FUNCTION
connect();