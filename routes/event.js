/*
    * Rutas de Eventos / Event
    * host + /api/event
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validar-jwt');
const router = Router();

const {
    getEvents ,
    newEvent,
    updateEvent,
    deleteEvent,
} = require('../controllers/event');
const { isDate } = require('../helpers/isDate');

router.use(validateJWT);

//* Obtener eventos
router.get('/', getEvents);

//* Crea nuevo evento
router.post(
    '/new',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatorio').custom(isDate),
        check('end', 'Fecha de fin es obligatorio').custom(isDate),
        validarCampos,
    ],
    newEvent
);

//* Actualizar Evento
router.put(
    '/update/:id', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatorio').custom(isDate),
        check('end', 'Fecha de fin es obligatorio').custom(isDate),
        validarCampos,
    ],
    updateEvent
);

//* Delete Evento
router.delete('/delete/:id', deleteEvent);

module.exports = router