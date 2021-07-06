const express = require('express')
const router = express.Router()
const db = require('../db/db.js')
const md5 = require('blueimp-md5');

router.post('/api/register', (req, res) => {
    // req:{email,nickname,passname}
    db.User.findOne({ email: req.body.email }, (err, doc) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                err_code: 500,
                message: err.message
            })
        } else if (doc) {
            return res.status(200).json({
                err_code: 1,
                message: "账户已存在"
            })
        } else {
            req.body.password = md5(req.body.password)
            new db.User(req.body).save(function (err, user) {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        err_code: 500,
                        message: err.message
                    })
                } else {
                    return res.status(200).json({
                        err_code: 0,
                        user: user,
                        message:'ok'
                    })
                }
            })
        }
    })
})

module.exports = router

