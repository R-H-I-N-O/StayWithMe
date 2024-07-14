const multer = require('multer');

const storage = multer.memoryStorage();

const multerUpload = multer({storage, limits: {
    fileSize: 5 * 1024 * 1024 //5mb
}});

module.exports = multerUpload;