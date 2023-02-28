// ! Important imports
import express from 'express'
import AuthSchema from '../../schema/auth/auth_schema'
import { genSaltSync, hashSync, compareSync } from 'bcrypt'
import { ReasonPhrases, StatusCodes, } from 'http-status-codes'
import { Utils } from '../../../utils/utils'
import Token from '../../middleware/token'

require('dotenv').config()


exports.register = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    req.body.email = req.body.email.toLowerCase() as String;
    // Parsing the payload to Auth Schema
    var authSchema = new AuthSchema(req.body)

    // Checking Duplicate Entries
    const foundUser = await AuthSchema.findOne({ email: authSchema.email });

    if (foundUser == null) {

        // Generating password salt
        const salt = genSaltSync(10);
        authSchema.password = hashSync(authSchema.password, salt);

        // Creating user
        authSchema.save().then(async (result) => {
            // sendOtp(authSchema);

            res.status(StatusCodes.OK).json({ status: StatusCodes.OK, success: true, message: "Account Created Successfully", data: result });

        }).catch((err) => {
            if (err.name === "ValidationError") {

                let errors = Utils.returnErrorsMap(err);

                return res.status(StatusCodes.BAD_REQUEST).json({ status: StatusCodes.BAD_REQUEST, message: "Validation Error", errors: errors, success: false });
            }
            res.status(StatusCodes.BAD_GATEWAY).json({ status: StatusCodes.BAD_GATEWAY, message: err, success: false });
        })

    } else {
        // If the user already exists
        if (foundUser.email === authSchema.email) {
            res.status(StatusCodes.FORBIDDEN).json({ status: StatusCodes.FORBIDDEN, message: "An account with this email is already registered", success: false });
        }

    }

}

exports.login = async (req: express.Request, res: express.Response, next: any) => {

    const { email, password, fcm_token } = req.body;

    var auth = await AuthSchema.findOne({ email: email.toLowerCase() });

    if (auth !== null) {

        const validPassword = compareSync(password, auth.password);

        if (validPassword) {

            auth!.fcm_token = fcm_token;
            const token = Token.generateToken(auth);

            AuthSchema.findOneAndUpdate({ _id: auth.id }, { fcm_token: fcm_token }).then(async (result) => {

                res.status(StatusCodes.OK).json({ status: StatusCodes.OK, success: true, message: "Login successful!", token: token, user: auth });
            }).catch(err => {
                res.status(StatusCodes.NOT_FOUND).json({ status: StatusCodes.NOT_FOUND, success: true, message: err, });
            })

        } else {
            res.status(StatusCodes.NOT_FOUND).json({ status: StatusCodes.NOT_FOUND, message: "Invalid phone or password", success: false });
        }
    } else {
        res.status(StatusCodes.NOT_FOUND).json({ status: StatusCodes.NOT_FOUND, message: "Invalid phone or password", success: false });
    }

}


exports.updateUserProfile = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const userProfile = new AuthSchema(req.body)

    AuthSchema.updateOne({ _id: userProfile._id }, userProfile).then(async (result) => {
        res.status(StatusCodes.OK).json({ status: StatusCodes.OK, success: true, message: "Profile Updated", data: userProfile });
    }).catch((err) => {
        res.status(StatusCodes.BAD_GATEWAY).json({ status: StatusCodes.BAD_GATEWAY, message: err, success: false });
    })
}
