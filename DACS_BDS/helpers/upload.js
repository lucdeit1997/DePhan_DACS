const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './public/images/posts'),
    // lưu ảnh post vào thư mục có url = ./public/images/background
    filename: (req, file, cb) => cb(null, file.originalname)
});

function fileFilter(req, file, cb) {
    const { mimetype } = file;
    if (mimetype === 'image/png' || mimetype === 'image/jpeg') {
        // Chỉ dùng png hoặc jgp (jpeg)
        return cb(null, true);
    }
    cb(new Error('File khong dung dinh dang!'));
}

const limits = { fileSize: 1024000 };
// giới hạn 1M = 1x1024 Kb x 1000 byte = 1024000

const upload = multer({ storage, limits, fileFilter });

// upload.single('')
// upload.fields([{},{}])
module.exports = upload;