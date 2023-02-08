import multer from 'multer';
import path from 'path'
import fs from 'fs'

const audioStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname + '/../uploads/audio'))
    },

    filename: function (req: any, file: any, cb: any) {
        let filename = file.originalname.toLowerCase().split(' ').join('-')
        cb(null, Date.now() + "-" + filename)
    },

});


const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname + '/../uploads/images'))
    },

    filename: function (req: any, file: any, cb: any) {
        let filename = file.originalname.toLowerCase().split(' ').join('-')
        cb(null, Date.now() + "-" + filename)
    },

});

const uploadAudioMiddleWare = multer(
    {
        storage: audioStorage,
        fileFilter: (req, file, cb) => {
            console.info(`[Upload Audio] file type: ${file.mimetype}`)
            if (file.mimetype == "audio/mpeg") {
                cb(null, true);
            } else {
                cb(null, false);
            }
        }
    }
);


const uploadImagesMiddleWare = multer(
    {
        storage: imageStorage,
        fileFilter: (req, file, cb) => {
            console.info(`[Upload Image] file type: ${file.mimetype}`)
            if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
                cb(null, true);
            } else {
                cb(null, false);
            }
        }
    }
);

const uploader = {
    uploadAudioMiddleWare: uploadAudioMiddleWare,
    uploadImagesMiddleWare: uploadImagesMiddleWare
}

export default uploader;