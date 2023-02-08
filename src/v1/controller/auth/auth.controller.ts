import express from 'express' 

exports.test = async (req: express.Request, res: express.Response, next : express.NextFunction) => {


    console.log(req.body)
    console.log(req.file)

    res.json("This is working")
}