const mongoose = require('mongoose');
const mongoURi = 'mongodb://localhost:27017/inotebook';

const connectToMongo = () => {
    mongoose.connect(mongoURi, ()=>{
        console.log('connected to mongo');
    })
}

module.exports = connectToMongo;