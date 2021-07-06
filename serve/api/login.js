const express = require('express')
const router = express.Router()
const db = require('../db/db.js')
const md5=require('blueimp-md5');


router.post('/api/login', (req, res) => {
    //req:{email,password}
    db.User.findOne({email:req.body.email}, (err, doc) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                err_code:500,
                message:err.message
            })
        } else if (doc){
            if (doc.password === md5(req.body.password)) {
                return res.status(200).json({
                    err_code:0,
                    user:doc,
                    message:'ok'
                })
            } else {
                return res.status(200).json({
                    err_code:1,
                    message:'密码错误'
                })
            }
        }else{
            return res.status(200).json({
                err_code:2,
                message:"账号不存在"
            })
        }
    })
})

module.exports = router
