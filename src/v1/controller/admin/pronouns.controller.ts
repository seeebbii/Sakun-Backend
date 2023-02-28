import express from 'express'

// ! Schema Imports
import PronounSchema from '../../schema/questions/pronoun_schema'
import { StatusCodes } from 'http-status-codes';
import { Utils } from '../../../utils/utils';

exports.allPronouns = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const [page, limit, skip] = Utils.getPaginationVariables(req.query)

    let pronouns = await PronounSchema.find().skip(skip).limit(limit);

    const numOfResults = await PronounSchema.count();

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        success: true, 
        data: pronouns,
        currentPage: page,
        pages: Math.ceil(numOfResults / limit),
        numOfResults: numOfResults,
    });


}

exports.createPronoun = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    new PronounSchema(req.body).save().then(async (result) => {

        res.status(StatusCodes.OK).json({ status: StatusCodes.OK, success: true, message: "Pronoun created successfully", });

    }).catch((err) => {
        if (err.name === "ValidationError") {

            let errors = Utils.returnErrorsMap(err);

            return res.status(StatusCodes.BAD_REQUEST).json({ status: StatusCodes.BAD_REQUEST, message: "Validation Error", errors: errors, success: false });
        }
        res.status(StatusCodes.BAD_GATEWAY).json({ status: StatusCodes.BAD_GATEWAY, message: "Pronoun already exists", success: false });
    })
}

exports.updatePronoun = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const { _id, pronoun } = req.body

    let pronounObject = await PronounSchema.findOne({ _id: _id });

    if (pronounObject != null) {

        pronounObject.updateOne({ pronoun: pronoun }).then(async (result) => {

            res.status(StatusCodes.OK).json({ status: StatusCodes.OK, success: true, message: "Pronoun Updated successfully", });

        }).catch((err) => {
            if (err.name === "ValidationError") {

                let errors = Utils.returnErrorsMap(err);

                return res.status(StatusCodes.BAD_REQUEST).json({ status: StatusCodes.BAD_REQUEST, message: "Validation Error", errors: errors, success: false });
            }
            res.status(StatusCodes.BAD_GATEWAY).json({ status: StatusCodes.BAD_GATEWAY, message: "Pronoun already exists", success: false });
        })

    } else {
        res.status(StatusCodes.BAD_GATEWAY).json({ status: StatusCodes.BAD_GATEWAY, message: "No pronoun against this id", success: false });
    }

}


exports.deletePronoun = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { _id } = req.body

    await PronounSchema.deleteOne({ _id: _id }).then(async (result) => {
        res.status(StatusCodes.OK).json({ status: StatusCodes.OK, success: true, message: "Pronoun deleted successfully", });
    }).catch((err) => {
        res.status(StatusCodes.BAD_GATEWAY).json({ status: StatusCodes.BAD_GATEWAY, message: "No pronoun against this id", success: false });
    })

}