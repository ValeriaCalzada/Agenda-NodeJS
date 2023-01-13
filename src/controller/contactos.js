const contacto = require('./../modules/contacto');
const jwt =  require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    getAll:async (req,res) =>{
        contacto.find({status: 1, userId: req.user._id})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(400).send('Algo salio mal');
        });
    },
    filtrarn: async (req,res) =>{
        const nombre = req.params.nombre;
        contacto.findOne({status: 1, nombre: nombre, userId: req.user._id})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(400).send('Algo salio mal');
        });
    },
    filtrarc: async (req,res) =>{
        const correo = req.params.correo;
        contacto.findOne({status: 1, correo: correo, userId: req.user._id})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(400).send('Algo salio mal');
        });
    },
    ver: async (req, res) =>{
        // jwt verify obtener id del usuario para nomas ver los usuario sagregados por x user
        //header 
            const id =req.params.id;
            contacto.findOne({status: 1 , _id: id, userId: req.user._id})
          // contacto.find({status: 1 , userId: req.user._id})
                .then(data =>{
                res.send(data);
                })
                .catch(err => {
                res.status(400).send('algo salio mal');
                });
    },
    crear: (req,res)=> {
      let datos = req.body;
      datos.userId = req.user._id;
       contacto.create(datos).then(Response =>{
       console.log(Response);
          res.send(Response);
       }).catch(err => {
        res.status(404).send('Favor de verificar los datos ingresados,  el correo ingresado ya se encuentra en uso');
    });  

    }, 
    update:async (req,res)=>{
        const body = req.body;
        const id = req.params.id;
        contacto.findOne( {status: 1, _id: id, userId: req.user._id})
        .then(data => {  
            data.nombre = body.nombre === undefined ? data.nombre : body.nombre;  
            data.telefono = body.telefono === undefined ? data.telefono : body.telefono;                  
            data.correo = body.correo === undefined ? data.correo : body.correo;                    
            data.save().then(() =>  {
                res.send(data)
            });                                                          

        })

        .catch(err => {
            res.status(400).send('algo salio mal');
          });
    }, 
    delete:async (req,res)=>{
        const id = req.params.id;
        contacto.findOne({status :1, _id : id, userId: req.user._id})
        .then(data => {
            data.status = 2;
            data.save();
            res.send('Se ha eliminado el registro');
        })
        .catch(err => {
            res.status(400).send('Algo salio mal');
        });
    }
}