const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const crearUsuario = async(req, res = response) => {

    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                ok: false,
                msg: 'Un Usuario existe con ese correo'
            });
        }

        user = new User(req.body);
        
        //! Encripttar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        /*
            * Generacion del token JWT
        */

        const token = await generateJWT(user.id, user.name);
    
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor comuniquese con el administrador',
        });
    }

};

const loginUsuario = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const  user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }
        //! Confirmar con los passwords
        const validPassword = bcrypt.compareSync(password, user.password);
        if(!validPassword){
            res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta',
            });
        }

        /*
            * Generacion del token JWT
        */
        const token = await generateJWT(user.id, user.name);

        res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        });

        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor comuniquese con el administrador',
        });
    }
};

const revalidarToken = async(req, res = response) => {
    const { uid, name } = req

    /*
        * Generacion del token JWT
    */
    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token,
    });
};

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
};