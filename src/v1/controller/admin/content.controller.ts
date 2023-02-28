import express from 'express'

// ! Schema Imports
import ContentSchema from '../../schema/questions/content_schema'
import { StatusCodes } from 'http-status-codes';
import { Utils } from '../../../utils/utils';

exports.allContent = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const [page, limit, skip] = Utils.getPaginationVariables(req.query)

    let content = await ContentSchema.find().skip(skip).limit(limit);;

    const numOfResults = await ContentSchema.count();

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        success: true, 
        data: content,
        currentPage: page,
        pages: Math.ceil(numOfResults / limit),
        numOfResults: numOfResults,
    });
}

exports.createContent= async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    new ContentSchema(req.body).save().then(async (result) => {

        res.status(StatusCodes.OK).json({ status: StatusCodes.OK, success: true, message: "Content Type created successfully", });

    }).catch((err) => {
        if (err.name === "ValidationError") {

            let errors = Utils.returnErrorsMap(err);

            return res.status(StatusCodes.BAD_REQUEST).json({ status: StatusCodes.BAD_REQUEST, message: "Validation Error", errors: errors, success: false });
        }
        res.status(StatusCodes.BAD_GATEWAY).json({ status: StatusCodes.BAD_GATEWAY, message: "Content Type already exists", success: false });
    })
}

exports.updateContent = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const { _id, type } = req.body

    let contentObject = await ContentSchema.findOne({ _id: _id });

    if (contentObject != null) {

        contentObject.updateOne({ type: type }).then(async (result) => {

            res.status(StatusCodes.OK).json({ status: StatusCodes.OK, success: true, message: "Content Type Updated successfully", });

        }).catch((err) => {
            if (err.name === "ValidationError") {

                let errors = Utils.returnErrorsMap(err);

                return res.status(StatusCodes.BAD_REQUEST).json({ status: StatusCodes.BAD_REQUEST, message: "Validation Error", errors: errors, success: false });
            }
            res.status(StatusCodes.BAD_GATEWAY).json({ status: StatusCodes.BAD_GATEWAY, message: "Content Type already exists", success: false });
        })

    } else {
        res.status(StatusCodes.BAD_GATEWAY).json({ status: StatusCodes.BAD_GATEWAY, message: "No Content Type against this id", success: false });
    }

}


exports.deleteContent = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { _id } = req.body

    await ContentSchema.deleteOne({ _id: _id }).then(async (result) => {
        res.status(StatusCodes.OK).json({ status: StatusCodes.OK, success: true, message: "Content Type deleted successfully", });
    }).catch((err) => {
        res.status(StatusCodes.BAD_GATEWAY).json({ status: StatusCodes.BAD_GATEWAY, message: "No Content Type against this id", success: false });
    })

}