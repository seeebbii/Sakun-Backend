import jsonwebtoken from 'jsonwebtoken'
import express from 'express';
import * as fs from 'fs';
import AuthSchema from '../schema/auth/auth_schema'
import { StatusCodes } from 'http-status-codes';

class Token {

    static generateToken(payload: Object) {
        var privateKey = fs.readFileSync('private.key');
        var token = jsonwebtoken.sign({ user: payload }, privateKey, { expiresIn: "100d", });
        return token;
    }

    static verifyToken(req: express.Request, res: express.Response, next: any) {
        var privateKey = fs.readFileSync('private.key');
        let token = req.get('authorization');
        if (token) {
            token = token.replace('Bearer ', '');
            jsonwebtoken.verify(token, privateKey, (err, decoded) => {
                if (err) {
                    res.status(StatusCodes.UNAUTHORIZED).json({
                        status: StatusCodes.UNAUTHORIZED,
                        success: false,
                        message: err.message,
                    });
                } else {
                    next();
                }
            });
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({
                status: StatusCodes.UNAUTHORIZED,
                success: false,
                message: 'Access Denied: Unauthorized user',
            })
        }
    }


    static fetchProfile(req: express.Request, res: express.Response, next: any) {
        var privateKey = fs.readFileSync('private.key');
        let token = req.get('authorization');
        if (token) {
            token = token.replace('Bearer ', '');
            jsonwebtoken.verify(token, privateKey, (err, decoded) => {
                if (err) {
                    res.status(StatusCodes.UNAUTHORIZED).json({
                        status: StatusCodes.UNAUTHORIZED,
                        success: false,
                        message: err.message,
                    });
                } else {
                    // parsing JWT payload
                    var parsedObject = JSON.stringify(decoded)
                    var auth = new AuthSchema(JSON.parse(parsedObject)['user'])

                    res.status(StatusCodes.OK).json({ status: StatusCodes.OK, success: true, token: token, user: auth });
                }
            });
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({
                status: StatusCodes.UNAUTHORIZED,
                success: false,
                message: 'Access Denied: Unauthorized user',
            })
        }
    }

    static checkAdminRights(req: express.Request, res: express.Response, next: any) {
        var privateKey = fs.readFileSync('private.key');
        let token = req.get('authorization');
        if (token) {
            token = token.replace('Bearer ', '');
            jsonwebtoken.verify(token, privateKey, (err, decoded) => {
                if (err) {
                    res.status(StatusCodes.UNAUTHORIZED).json({
                        status: StatusCodes.UNAUTHORIZED,
                        success: false,
                        message: err.message,
                    });
                } else {
                    // parsing JWT payload
                    var parsedObject = JSON.stringify(decoded)
                    var authSchema = new AuthSchema(JSON.parse(parsedObject)['user'])
                    // Check if the user has the admin role or not
                    if (authSchema.admin === true) {
                        next();
                    } else {
                        res.status(StatusCodes.UNAUTHORIZED).json({
                            status: StatusCodes.UNAUTHORIZED,
                            success: false,
                            message: "Access Denied: User not admin",
                        });
                    }
                }
            });
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({
                status: StatusCodes.UNAUTHORIZED,
                success: false,
                message: 'Access Denied: Unauthorized user',
            })
        }
    }

}

export default Token;