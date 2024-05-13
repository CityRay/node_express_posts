import multer from 'multer';

export const uploadService = multer({
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB
  },
  fileFilter(req, file, cb) {
    const allowMimetype = ['image/png', 'image/jpg', 'image/jpeg'];
    if (!allowMimetype.includes(file.mimetype)) {
      cb(new Error('檔案格式錯誤，僅限上傳 jpg、jpeg 與 png 格式。'));
    }
    cb(null, true);
  }
}).any();
