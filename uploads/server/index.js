const express = require('express');
const path = require('path');
const cors = require('cors')
const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');
const {User} = require('./model');
const SECRET = 'SECRET@qwerty';

async function checkAdmin() {
  const temp = await User.findOne({
    where: {
      username: 'admin'
    }
  })
    if (!temp) {
      await User.create({
        username: 'admin',
        password: 'admin',
        isAdmin: true
      })
    }
}

async function start() {
    const app = express();
    const port = process.env.PORT || 4000;
    app.use(cors())

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use((req, res, next) => {
        const token = req.headers['authorization'];
        if (!token) {
            req.user = null;
            return next();
        } else {
            jwt.verify(token, SECRET, (err, decoded) => {
                if (err) {
                    req.user = null;
                    return next();
                } else {
                    req.user = decoded;
                    return next();
                }
            })
        }
    });
    app.use(express.static(path.join(__dirname, '../build')));
    app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

    app.use('/api', require('./routers'));
    app.use('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../build/index.html'));
    });

    await checkAdmin();
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });

}

start();
