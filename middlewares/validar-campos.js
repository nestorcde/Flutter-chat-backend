const { validationResult } = require("express-validator");
const { response, request } = require("express");



const validarCampos = ( req = request ,  res = response, next) => {
    const errores = validationResult(req);

    const{ email, password } = req.body;
    
    // console.log('req.body', req.body);
    // console.log("email: ", email);
    // console.log("password: ", password);

    if( !errores.isEmpty()){
        return res.status(401).json({
            ok: false,
            errors: errores.mapped()
        }); 
    }

    next();
};


module.exports = {
    validarCampos
};