const { response } = require('express');
const Event = require('../models/Event');

const getEvents = async(req, res = response) => {
    const events = await Event.find({ user: req.uid }).populate('user', 'name');
    
    return res.status(200).json({
        ok: true,
        events
    });
};

const newEvent = async(req, res = response) => {
    // Verificar que tenga el evento
    const event = new Event(req.body);
    
    try {
        event.user = req.uid;
        const eventSave = await event.save();

        return res.status(200).json({
            ok: true,
            event: eventSave,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        });
    }
};

const updateEvent = async(req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;
    try {
        const event = await Event.findById(eventId);
        
        if(!event)
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        
        if(event.user.toString() !== uid )
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
            
        const newEvent = {...req.body, user: uid}

        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {new: true});


        return res.status(200).json({
            ok: true,
            event: updatedEvent
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        });
    }   
};

const deleteEvent = async(req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;
    try {
        const event = await Event.findById(eventId);
        if(!event)
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        
        if(event.user.toString() !== uid)
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        
        const eventDelete = await Event.findByIdAndDelete(eventId);

        return res.status(200).json({
            ok: true,
            event: eventDelete
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        });
    }
};


module.exports = {
    getEvents,
    newEvent,
    updateEvent,
    deleteEvent,
};