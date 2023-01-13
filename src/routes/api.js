// get contactos
const express = require('express');
const multer = require('multer');

const router = require('express').Router();
const contactorController =  require('./../controller/contactos');
const usuariosController =  require('./../controller/usuarios');
const authMiddleware = require('../middlewares/auth');

const storage = multer.diskStorage ({
    destination: (req, file, callback) => {
        callback(null, 'uploads'); //errorfirst callback
    },
    filename: (req, file, callback) => {
       // const extension = file.originalname.split('.').pop();
        let nombre = new Date().getTime() + 'jpg';
        callback(null, nombre)
    }
});

const multerStorage = multer.diskStorage(storage);
const upload = multer({storage: multerStorage});

router.use('/contactos', authMiddleware);

router.get('/contactos', contactorController.getAll);
//router.get('/contactos', contactorController.ver);
router.get('/contactos/:id', contactorController.ver);
//router.post('/contactos', express.json(), upload.single('foto'), contactorController.crear);
router.post('/contactos', express.json(), contactorController.crear);
router.get('/contactos/nombre/:nombre', contactorController.filtrarn);
router.get('/contactos/correo/:correo', contactorController.filtrarc);

router.put('/contactos/update/:id', express.json(), contactorController.update);
router.put('/contactos/delete/:id', contactorController.delete);

// usuarios
router.post('/registro', express.json(), usuariosController.registro);
router.post('/login', express.json(),usuariosController.login);

//LOGIN
//router.post('/login', express.json(),)

module.exports = router;
