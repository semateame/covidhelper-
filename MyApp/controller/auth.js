const User = require('../model/user')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

exports.Login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    //simple validation
    if (!email || !password) {
        res.status(400).json({ msg: "All fields are required" })
    }

    User.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            const token = jwt.sign({ id: user._id }, 'task', {
                                expiresIn: 3600
                            });
                            res.status(200).json({ token, user: { id: user._id, email: user.email, role: user.role, phone: user.phone } });
                        } else {

                            res.status(400).send({ msg: "Password doesn't match" });
                        }
                    });
            } else {
                res.status(400).send({ msg: "User doesn't exist" });
            }
        }).catch(err => {
            res.status(400).send({ msg: err });
        });
};



exports.Logout = async (req, res) => {

}




exports.Signup = (req, res, next) => {
    const { email, password, phone, role, status, userLocation } = req.body;

    //simple validation
    if (!email || !password || !role || !phone) {
        res.status(400).json({ msg: "All fields are required" })
    }
    //Check existing user
    User.findOne({ email: email })
        .then(userExist => {
            if (userExist) {
                res.status(400).json({ msg: "User already exists" })
            }
            return bcrypt
                .hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        email: email,
                        password: hashedPassword,
                        phone: phone,
                        role: role,
                        status: status,
                        location: userLocation


                    });
                    return user.save()
                })
                .then(user => {
                    const token = jwt.sign({ id: user._id }, 'task', {
                        expiresIn: 3600
                    });
                    res.status(200).json({ token });
                })
        })
        .catch(err => {
            res.status(400).send({ msg: err });
        });
};
