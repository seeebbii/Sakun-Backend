import express from 'express'

// ! Schema Imports
import AgeSchema from '../../schema/questions/age_schema'
import { StatusCodes } from 'http-status-codes';
import { Utils } from '../../../utils/utils';

exports.allAge = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const [page, limit, skip] = Utils.getPaginationVariables(req.query)

    let age = await AgeSchema.find().skip(skip).limit(limit);;
    const numOfResults = await AgeSchema.count();

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        success: true,
        data: age,
        currentPage: page,
        pages: Math.ceil(numOfResults / limit),
        numOfResults: numOfResults,
    });

}

exports.createAge = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    new AgeSchema(req.body).save().then(async (result) => {

        res.status(StatusCodes.OK).json({ status: StatusCodes.OK, success: true, message: "Age created successfully", });

    }).catch((err) => {
        if (err.name === "ValidationError") {

            let errors = Utils.returnErrorsMap(err);

            return res.status(StatusCodes.BAD_REQUEST).json({ status: StatusCodes.BAD_REQUEST, message: "Validation Error", errors: errors, success: false });
        }
        res.status(StatusCodes.BAD_GATEWAY).json({ status: StatusCodes.BAD_GATEWAY, message: "Age already exists", success: false });
    })
}

exports.updateAge = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const { _id, age } = req.body

    let ageObject = await AgeSchema.findOne({ _id: _id });

    if (ageObject != null) {

        ageObject.updateOne({ age: age }).then(async (result) => {

            res.status(StatusCodes.OK).json({ status: StatusCodes.OK, success: true, message: "Age Updated successfully", });

        }).catch((err) => {
            if (err.name === "ValidationError") {

                let errors = Utils.returnErrorsMap(err);

                return res.status(StatusCodes.BAD_REQUEST).json({ status: StatusCodes.BAD_REQUEST, message: "Validation Error", errors: errors, success: false });
            }
            res.status(StatusCodes.BAD_GATEWAY).json({ status: StatusCodes.BAD_GATEWAY, message: "Age already exists", success: false });
        })

    } else {
        res.status(StatusCodes.BAD_GATEWAY).json({ status: StatusCodes.BAD_GATEWAY, message: "No Age against this id", success: false });
    }

}


exports.deleteAge = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { _id } = req.body

    await AgeSchema.deleteOne({ _id: _id }).then(async (result) => {
        res.status(StatusCodes.OK).json({ status: StatusCodes.OK, success: true, message: "Age deleted successfully", });
    }).catch((err) => {
        res.status(StatusCodes.BAD_GATEWAY).json({ status: StatusCodes.BAD_GATEWAY, message: "No Age against this id", success: false });
    })

}