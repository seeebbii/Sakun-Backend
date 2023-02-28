import express from 'express'
import uploader from '../middleware/uploader';
import Token from '../middleware/token';
const adminController = require('../controller/admin/admin.controller');
const pronounsController = require('../controller/admin/pronouns.controller');
const ageControllerr = require('../controller/admin/age.controller');
const contentController = require('../controller/admin/content.controller');
const genreController = require('../controller/admin/genre.controller');

const router = express.Router();


// Questions Flow

// Pronouns
router.get('/all-pronoun', Token.checkAdminRights, pronounsController.allPronouns);
router.post('/create-pronoun', Token.checkAdminRights, pronounsController.createPronoun);
router.post('/update-pronoun', Token.checkAdminRights, pronounsController.updatePronoun);
router.post('/delete-pronoun', Token.checkAdminRights, pronounsController.deletePronoun);

// Age
router.get('/all-age', Token.checkAdminRights, ageControllerr.allAge);
router.post('/create-age', Token.checkAdminRights, ageControllerr.createAge);
router.post('/update-age', Token.checkAdminRights, ageControllerr.updateAge);
router.post('/delete-age', Token.checkAdminRights, ageControllerr.deleteAge);

// Content
router.get('/all-content', Token.checkAdminRights, contentController.allContent);
router.post('/create-content', Token.checkAdminRights, contentController.createContent);
router.post('/update-content', Token.checkAdminRights, contentController.updateContent);
router.post('/delete-content', Token.checkAdminRights, contentController.deleteContent);


// Genre
router.get('/all-genre', Token.checkAdminRights, genreController.allGenre);
router.post('/create-genre', Token.checkAdminRights, genreController.createGenre);
router.post('/update-genre', Token.checkAdminRights, genreController.updateGenre);
router.post('/delete-genre', Token.checkAdminRights, genreController.deleteGenre);


router.post('/upload-multiple-audio', uploader.uploadAudioMiddleWare.fields([{name: "files", maxCount: 10}]), adminController.uploadMultipleAudio);
router.post('/upload-single-audio', uploader.uploadAudioMiddleWare.single('file'), adminController.uploadSingleAudio);

router.post('/upload-multiple-images', uploader.uploadImagesMiddleWare.fields([{name: "files", maxCount: 10}]), adminController.uploadMultipleImages);
router.post('/upload-single-image', uploader.uploadImagesMiddleWare.single('file'), adminController.uploadSingleImage);

export default router;