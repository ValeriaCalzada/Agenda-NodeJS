const jwt = require('jsonwebtoken');
const usuario = require('./../modules/usuario');
require('dotenv').config();
const crypto = require('crypto');

function hashPassword(pwd) {
    return crypto.scryptSync(pwd, 'salt', 24);
}

module.exports = {
    login: (req,res) => {
        const data=req.body;
        const credenciales = {
            correo: data.correo,
            password: hashPassword(data.password)
            //password: data.password
        }

        usuario.findOne(credenciales)
        .then(response =>{
            if (response){
                console.log(response);
                const {_id, nombre, correo} = response;
                const token = jwt.sign({_id, nombre, correo},process.env.SECRETWORD);
                // token 
                //jwt.verify(token, 'H0lamundo', (err, decoded)=> {
                //    console.log(decoded);
               // })
                res.send({token, nombre, correo});
            } else{
                res.sendStatus(401);
            }
        }).catch(err =>{
            res.sendStatus(400);
        })
    },
    registro: (req,res)=> {
        const data = req.body;
        console.log('Datos: ', data);
        if(!data.password || !data.nombre || !data.correo){
            res.sendStatus(400);
            return;
        }
        const hashedPassword = hashPassword(data.password);
        data.password = hashedPassword;
        usuario.create(data).then(response =>{
            const {_id, nombre, correo}=response;
            //res.send({_id, nombre, correo});
            res.render('confirmacion', {nombre, correo})
        }).catch (err =>{
            console.log(err);
            res.sendStatus(400);
            //res.render('confirmacion', {nombre: data.nombre, correo: data.correo})
        });
     },
     formRegistro: (req,res) => {
        res.render('registro');
     }
}