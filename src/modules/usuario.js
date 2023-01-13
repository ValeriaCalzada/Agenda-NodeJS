const { Schema, model } = require('mongoose');
//const { response } = require('express');

//1 activo
// 2 eliminado

const usuarioSchema = new Schema({
    nombre: { type: String},
    correo: {type: String },
    status: {type: Number, default :1},
    password:{ type: String},
    userId: {type: String}
});

module.exports = model('usuarios', usuarioSchema);