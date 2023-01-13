const { Schema, model } = require('mongoose');
//const { response } = require('express');

//1 activo
// 2 eliminado

const contactoSchema = new Schema({
    nombre: { type: String},
    correo: {type: String },
    status: {type: Number, default :1},
    telefono:{ type: String, default : '0'},
    userId: {type: String}
});

module.exports = model('contactos', contactoSchema);