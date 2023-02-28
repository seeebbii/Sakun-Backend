import express from 'express'

const authController = require('../controller/auth/auth.controller');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.json({
        "message" : "Welcome to auth endpoint"
    })
})


router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/update-user-profile', authController.updateUserProfile);

export default router;