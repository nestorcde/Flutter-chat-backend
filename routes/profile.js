const {Router, response} = require('express');
const { check } = require('express-validator');
const { updateProfile, setUsuarioImage } = require('../controller/profile');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const multer = require('multer');
const fileFilter = (req, file, cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true);
    }else{
        cb(null,false);
    }
};
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb){
        const posicion = file.mimetype.search('/') ;
        const random = Math.floor(Math.random() * (1000 - 1)) + 1;
        req.body.random = random;
        cb(null, req.body.uid +random.toString() +"."+ file.mimetype.trim().substring(posicion+1));
    }
});
const upload = multer({
    storage:storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});
const router = Router();


router.post('/', [
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('telefono','El telefono es obligatorio').notEmpty(),
    check('telefono','El telefono debe ser valido').isMobilePhone('es-PY'),
    validarCampos,
    validarJWT
] , updateProfile);

router.post('/imageProfile', 
            //validarJWT, 
            upload.single('imgProfile'), 
            setUsuarioImage);

module.exports = router;