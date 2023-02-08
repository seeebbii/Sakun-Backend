import express from 'express' 
import httpStatus = require('http-status')

exports.uploadMultipleImages = async (req: express.Request, res: express.Response, next : express.NextFunction) => {

    console.log(req.files)

    if(req.files !== null){


        console.log(req.files?.length)

    }

    if(req.files == null){
        // console.log(httpStatus)
        return res.status(401).json({
            "Success": false,
            "message": "Invalid file type"
        });
    }

    console.log(req.body)
    console.log(req.file)
    res.json("This is working")
}


exports.uploadSingleImage = async (req: express.Request, res: express.Response, next : express.NextFunction) => {

    if(req.file == null){
        // console.log(httpStatus)
        return res.status(401).json({
            "Success": false,
            "message": "Invalid file type"
        });
    }

    res.json("This is working")
}

exports.uploadMultipleAudio = async (req: express.Request, res: express.Response, next : express.NextFunction) => {

    console.log(req.files)

    

    if(req.files == null){
        // console.log(httpStatus)
        return res.status(401).json({
            "Success": false,
            "message": "Invalid file type"
        });

    }else{



        return res.status(401).json({
            "Success": false,
            "message": "Invalid file type"
        });
    }
}

exports.uploadSingleAudio = async (req: express.Request, res: express.Response, next : express.NextFunction) => {

    if(req.file == null){
        // console.log(httpStatus)
        return res.status(401).json({
            "Success": false,
            "message": "Invalid file type"
        });
    }
    
    res.json("This is working")
}