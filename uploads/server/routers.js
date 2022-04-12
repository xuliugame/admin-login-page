const express = require('express');
const router = express.Router();
const {User, FileInfo} = require('./model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer');
const {unlink} = require('fs');
const {ObjectId} = require('mongodb');
const SECRET = 'SECRET@qwerty';

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});


const upload = multer({
    storage: storage,
});

router.post('/login', async function (req, res) {
    const user = await User.findOne({
        username: req.body.username,
    });
    if (!user) {
        return res.status(422).send({
            message: 'username is not correct',
        });
    }
    const isPasswordValid = bcrypt.compareSync(
        req.body.password,
        user.password,
    );
    if (!isPasswordValid) {
        return res.status(422).send({
            message: 'password is not valid',
        });
    }
    const token = jwt.sign({
        id: String(user._id),
        username: user.username,
        isAdmin: user.isAdmin,
    }, SECRET);

    res.send({
        name: user.username,
        token,
        isAdmin: user.isAdmin,
    });
});

router.post('/register', async function (req, res) {
    if (!req.body.username || !req.body.password) {
        return res.status(422).send({
            message: 'username or password is required',
        });
    }
    const userTemp = await User.findOne({
        username: req.body.username,
    });
    if (userTemp) {
        return res.status(422).send({
            message: 'username already exists',
        });
    }
    await User.create({
        username: req.body.username,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
    });

    // res.send('register')
    res.send('success');
});
router.get('/files', async function (req, res) {
    const {user} = req;
    if (!user) {
        return res.status(422).send({
            message: 'user is not login',
        });
    }
    const projection = user.isAdmin ? {
        name: 1,
        openers: 1,
        createdAt: 1,
        path: 1,
    } : {
        name: 1,
        createdAt: 1,
        path: 1,
    };
    FileInfo.find({}, projection,
        function (err, files) {
            if (err) {
                return res.status(500).send({
                    message: 'Internal Server Error',
                });
            }
            res.send(files);
        });
});
router.delete('/files/:name', async function (req, res) {
    const {name} = req.params;
    const user = req.user;
    if (!user || !user.isAdmin) {
        return res.status(422).send('user is not admin')
    }
    await FileInfo.deleteOne({name});
    unlink(`uploads/${name}`, (err => {
        if (err) {
            return res.status(500).send({
                message: 'Internal Server Error',
            });
        }
        res.send('success');
    }))
})

router.post('/record', async function (req, res) {
    const {name} = req.body;
    const user = req.user;
    console.log(user);
    if (!user) return res.status(422).send({
        message: 'user is not login',
    });
    const file = await FileInfo.findOneAndUpdate({name}, {
        '$push': {
            openers: {name: user.username, time: Date.now()},
        },
    });
    res.json(file);
});

router.post('/upload', upload.array('file', 1), async function (req, res, next) {
    const file = req.files[0];

    try {

        const user = req.user;
        if (!user) {
            return res.status(422).send({
                message: 'user is not correct',
            });
        }
        if (!file || !file.originalname) {
            return res.status(422).send({
                message: 'file is not correct',
            });
        }
        await FileInfo.create({
            name: file.originalname,
            path: '/',
            owner: ObjectId(user._id),
        });
        res.send('success');
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
        unlink(`uploads/${file.originalname}`, (err) => {
            if (err) {
                console.error(err);
            }
        });
    }
});
module.exports = router;
