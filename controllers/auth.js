const { response } = require('express');
const { validationResult } = require('express-validator');
const User = require('../models/User');

const crearUsuario = async(req, res = response) => {

    // const { name, email, password } = req.body;

    const user = new User(req.body);

    await user.save();

    res.status(201).json({
        ok: true,
        msg: 'registro',
    });
};

const loginUsuario = (req, res = response) => {
    const { email, password } = req.body;

    res.json({
        ok: true,
        msg: 'login',
        email,
        password,
    });
};

const revalidarToken = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'renew'
    });
};

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
};