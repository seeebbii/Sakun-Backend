import express from 'express'

// ! Schema Imports
import GenreSchema from '../../schema/questions/genre_schema'
import { StatusCodes } from 'http-status-codes';
import { Utils } from '../../../utils/utils';

exports.allGenre = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const [page, limit, skip] = Utils.getPaginationVariables(req.query)

    let genre = await GenreSchema.find().skip(skip).limit(limit);;

    const numOfResults = await GenreSchema.count();

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        success: true, 
        data: genre,
        currentPage: page,
        pages: Math.ceil(numOfResults / limit),
        numOfResults: numOfResults,
    });
}

exports.createGenre = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    new GenreSchema(req.body).save().then(async (result) => {

        res.status(StatusCodes.OK).json({ status: StatusCodes.OK, success: true, message: "Genre created successfully", });

    }).catch((err) => {
        if (err.name === "ValidationError") {

            let errors = Utils.returnErrorsMap(err);

            return res.status(StatusCodes.BAD_REQUEST).json({ status: StatusCodes.BAD_REQUEST, message: "Validation Error", errors: errors, success: false });
        }
        res.status(StatusCodes.BAD_GATEWAY).json({ status: StatusCodes.BAD_GATEWAY, message: "Genre already exists", success: false });
    })
}

exports.updateGenre = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const { _id, genre } = req.body

    let genreObject = await GenreSchema.findOne({ _id: _id });

    if (genreObject != null) {

        genreObject.updateOne({ genre: genre }).then(async (result) => {

            res.status(StatusCodes.OK).json({ status: StatusCodes.OK, success: true, message: "Genre Updated successfully", });

        }).catch((err) => {
            if (err.name === "ValidationError") {

                let errors = Utils.returnErrorsMap(err);

                return res.status(StatusCodes.BAD_REQUEST).json({ status: StatusCodes.BAD_REQUEST, message: "Validation Error", errors: errors, success: false });
            }
            res.status(StatusCodes.BAD_GATEWAY).json({ status: StatusCodes.BAD_GATEWAY, message: "Genre already exists", success: false });
        })

    } else {
        res.status(StatusCodes.BAD_GATEWAY).json({ status: StatusCodes.BAD_GATEWAY, message: "No Genre against this id", success: false });
    }

}


exports.deleteGenre = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { _id } = req.body

    await GenreSchema.deleteOne({ _id: _id }).then(async (result) => {
        res.status(StatusCodes.OK).json({ status: StatusCodes.OK, success: true, message: "Genre deleted successfully", });
    }).catch((err) => {
        res.status(StatusCodes.BAD_GATEWAY).json({ status: StatusCodes.BAD_GATEWAY, message: "No Genre against this id", success: false });
    })

}