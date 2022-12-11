const mongoose = require('mongoose');

const databaseConnection = (url) =>{
    mongoose.connect(url,{
        useNewUrlParser: true,
    }).then((data) =>{
        console.log(`connection opened ${data.connection.host}`);
    })
} 

module.exports = databaseConnection;