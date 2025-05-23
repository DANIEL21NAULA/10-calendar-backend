/*
    * Rutas de usuarios / Auth
    * host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validar-jwt');
const router = Router();

const {
    crearUsuario ,
    loginUsuario,
    revalidarToken,
} = require('../controllers/auth')

router.post(
    '/new',
    [// * Middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
        validarCampos
    ],
    crearUsuario
);

router.post(
    '/',
    [// * Middlewares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
        validarCampos
    ],
    loginUsuario,
);

router.get('/renew', validateJWT, revalidarToken);


module.exports = router;