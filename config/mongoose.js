const mongoose = require('mongoose');///req the library

mongoose.connect('mongodb://localhost/vvaidya_db');//connect to the databse

const db = mongoose.connection;//acquire the connection to chekck if it is successful

db.on('error',console.error.bind(console,'error connecting to db'));//error

//up and runnig then print the message
db.once('open',function(){
    console.log('successfully connected to the database');
})