const express = require('express')
const router = express.Router()
const db = require('../db/db.js')
const md5 = require('blueimp-md5');


// 修改账户信息
router.post('/api/user/profile', (req, res) => {
    const user = {
        nickname: req.body.nickname,
        introduce: req.body.introduce,
        gender: req.body.gender,
        birthday: req.body.birthday,
        avatar: req.body.avatar
    }

    db.User.findOneAndUpdate({ _id: req.body._id }, user, { new: true }, (err, doc) => {
        if (err) {
            console.log(err)
            return res.status(500).send(err.message)
        } else {
            return res.status(200).send(doc)
        }
    })
})

// 修改账户密码
router.post('/api/user/setting', (req, res) => {
    const user = {
        password: md5(req.body.newPassword)
    }
    db.User.findOne({ email: req.body.email }, (err, doc) => {
        if (err) {
            return res.status(500).send(err.message)
        } else {
            if (doc.password == md5(req.body.oldPassword)) {
                db.User.findOneAndUpdate({ email: req.body.email }, user, { new: true }, (err, doc) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).send(err.message)
                    } else {
                        return res.status(200).json({
                            err_code: 0,
                            user: doc
                        })
                    }
                })
            } else {
                return res.status(200).json({
                    err_code: 1,
                    message: '密码错误'
                })
            }
        }
    })
})

// 删除账户
router.delete('/api/user', (req, res) => {
    db.User.findOne({ email: req.body.email }, (err, doc) => {
        if (err) {
            console.log(err)
            return res.status(500).send(err.message)
        } else {
            if (doc.password === md5(req.query.password)) {
                db.User.remove({ email: req.body.email }, (err, doc) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).send(err.message)
                    } else {
                        return res.status(200).json({
                            err_code: 0,
                            message: 'ok'
                        })
                    }
                })
            } else {
                return res.status(200).json({
                    err_code: 1,
                    message: '密码错误'
                })
            }
        }
    })
})

router.get('/api/user', (req, res) => {
    db.User.findOne({ email: req.query.email }, (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).send(err.message)
        } else {
            res.status(200).send(data)
        }
    })
})

module.exports = router