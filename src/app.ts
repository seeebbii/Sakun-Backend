// ! Important Imports
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import multer from 'multer'
import config from './config/config'
import DbService from './service/db.service'
import fs from 'fs'
import path from 'path'

//! Route Imports (Versioning)
import authRoutesV1 from './v1/routes/auth.routes' 
import adminRoutesV1 from './v1/routes/admin.routes' 

var upload = multer();

const app = express();
dotenv.config();

// ! for parsing application/json
app.use(bodyParser.json())
// ! for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
// ! for parsing multipart/form-data
// app.use(upload.array('files')); 


app.use(cors(), (req, res, next) => { next() })

// Create folders if they do not exists
if(!fs.existsSync(path.join(__dirname + '/v1/uploads'))){
    fs.mkdirSync(path.join(__dirname + '/v1/uploads'))
    fs.mkdirSync(path.join(__dirname + '/v1/uploads/images'))
    fs.mkdirSync(path.join(__dirname + '/v1/uploads/audio'))
    fs.mkdirSync(path.join(__dirname + '/v1/uploads/videos'))
}

app.use('/v1/uploads', express.static(__dirname + "/v1/uploads"))



app.get('/api', (req, res, next) => {
    res.json({
        'message' : `Server is running at Port: ${config.server.port}`,
    }).end()
})

app.get('/api/V1', (req, res, next) => {
    res.json({
        'message' : `This is V1 endpoint`,
    }).end()
})

DbService.init()
const httpServer = app.listen(config.server.port, () => console.log(`Server is running at Port: ${process.env.PORT}`))


//! V1 API ENDPOINTS
app.use('/api/v1/auth', authRoutesV1)
app.use('/api/v1/admin', adminRoutesV1)