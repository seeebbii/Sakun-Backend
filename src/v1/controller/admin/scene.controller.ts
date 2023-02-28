import express from 'express'
import { StatusCodes } from 'http-status-codes';
import { Utils } from '../../../utils/utils';
import ScenesSchema from "../../schema/scenes/scenes_schema";

exports.allScenes = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const [page, limit, skip] = Utils.getPaginationVariables(req.query)

    let scenes = await ScenesSchema.find().skip(skip).limit(limit);;

    const numOfResults = await ScenesSchema.count();

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        success: true, 
        data: scenes,
        currentPage: page,
        pages: Math.ceil(numOfResults / limit),
        numOfResults: numOfResults,
    });
}



exports.createScene = async (req: express.Request, res: express.Response, next: express.NextFunction) => {


}