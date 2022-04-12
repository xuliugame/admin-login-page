const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {ObjectId} = require('mongodb');

mongoose.connect('mongodb://localhost:27017/files', {
    useNewUrlParser:true
})


const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: {
        type: String,
        set(val) {
            const salt = bcrypt.genSaltSync(10)
            return bcrypt.hashSync(val, salt);
        }
    },
    files: {type: Array, default: [] },
    isAdmin: { type: Boolean, default: false }
})

const FileInfoSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    path: { type: String },
    openers: { type: Array, default: [] },
    owner: { type: ObjectId },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

const User = mongoose.model('User', UserSchema)
const FileInfo = mongoose.model('Files', FileInfoSchema)

module.exports = { User, FileInfo }
