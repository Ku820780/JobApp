// const mongodb = require('mongodb').MongoClient;
const mongoose = require('mongoose');


const Database = async () =>{
    mongoose.connect(process.env.DATABASE_URL, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useCreateIndex: true
    })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err));
}

module.exports = Database
