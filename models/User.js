const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    key: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    time:{
        type: String,
        require: true
    },
    finished: {
        type: Boolean,
        require: true
    }
})

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true 
    },
    userName:{
        type: String,
        required: true
    },
    events: [TaskSchema],
    meetings: [TaskSchema],
    projects: [TaskSchema],
    toDos: [TaskSchema]
})

module.exports = mongoose.model('Users', UserSchema)