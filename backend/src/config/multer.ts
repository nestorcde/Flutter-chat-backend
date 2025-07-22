import multer from 'multer';

const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = multer.diskStorage({
  destination: function(_req, _file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req: any, file, cb) {
    const posicion = file.mimetype.indexOf('/');
    const random = Math.floor(Math.random() * (1000 - 1)) + 1;
    req.body.random = random;
    const extension = file.mimetype.substring(posicion + 1);
    cb(null, `${req.body.uid}${random}.${extension}`);
  }
});

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB
  },
  fileFilter: fileFilter
});