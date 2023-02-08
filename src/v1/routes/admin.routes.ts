import express from 'express'
import uploader from '../middleware/uploader';
const adminController = require('../controller/admin/admin.controller');
const router = express.Router();


router.post('/upload-multiple-audio', uploader.uploadAudioMiddleWare.fields([{name: "files", maxCount: 10}]), adminController.uploadMultipleAudio);
router.post('/upload-single-audio', uploader.uploadAudioMiddleWare.single('file'), adminController.uploadSingleAudio);

router.post('/upload-multiple-images', uploader.uploadImagesMiddleWare.fields([{name: "files", maxCount: 10}]), adminController.uploadMultipleImages);
router.post('/upload-single-image', uploader.uploadImagesMiddleWare.single('file'), adminController.uploadSingleImage);

export default router;