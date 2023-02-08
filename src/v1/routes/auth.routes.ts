import express from 'express'
import multer from 'multer';
import path from 'path'
import fs from 'fs'

const authController = require('../controller/auth/auth.controller');
const router = express.Router();



const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, path.join(__dirname + '/../uploads'))
    },
    
    filename: function (req: any, file: any, cb: any) {
        console.log(file)
        cb(null, Date.now() + "-" + file.originalname )
    }
});

const upload = multer({storage: storage,});



router.post('/', upload.single('file'),  authController.test);

export default router;