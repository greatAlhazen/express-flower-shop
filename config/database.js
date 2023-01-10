const mongoose = require('mongoose');

//connection database config
const databaseConnection = (url) =>{
    mongoose.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((data) =>{
        console.log(`connection opened ${data.connection.host}`);
    })
} 

module.exports = databaseConnection;