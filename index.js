const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./src/routes/api');
require('dotenv').config();
const {engine} = require('express-handlebars');

const app = express();

app.use(apiRoutes);

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded());

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', '/views');

app.get('', (req,res) => {
    res.send('Hola mundo');
});

//const uri = 'mongodb+srv://testuser:Temporal-2022@cluster0.fsvjwzh.mongodb.net/agenda?retryWrites=true&w=majority';
const uri = process.env.MONGODB;

mongoose.connect(uri, (err) => {
    if (err){
        console.log('No se pudo conectar a la base de datos');
    } else{
        console.log('Se conecto exitosamente a la base de datos');
        app.listen(port, () => {
            const env=process.env.NODE_ENV;
            if (env==='local'){
                console.log('app is running LOCAL in port', +port);
            }else{
            console.log('app is running in port', +port);
            }
        })
    }
});

