const express = require('express')
const router = express.Router()
const db = require('../db/db.js')

router.get('/api/comments', (req, res) => {
    const aid = req.query.aid
    if (req.query.sort === 'date') {
        db.Comment.find({ articleId: aid }).sort({ date: -1 }).exec((err, doc) => {
            if (err) {
                console.log(err)
                res.status(500).send(err.message)
            } else {
                res.status(200).send(doc)
            }
        })
    } else if (req.query.sort === 'like') {
        db.Comment.find({ articleId: aid }).sort({ like: -1 }).exec((err, doc) => {
            if (err) {
                console.log(err)
                res.status(500).send(err.message)
            } else {
                res.status(200).send(doc)
            }
        })
    } else {
        db.Comment.find({ articleId: aid }).exec((err, doc) => {
            if (err) {
                console.log(err)
                res.status(500).send(err.message)
            } else {
                res.status(200).send(doc)
            }
        })
    }
})

router.post('/api/comments', (req, res) => {
    const comment = {
        email: req.body.email,
        avatar: req.body.avatar,
        nickname: req.body.nickname,
        content: req.body.content,
        articleId: req.body.articleId,
        date: new Date(),
        like: 0
    }
    new db.Comment(comment).save().then(() => {
        db.Article.findOneAndUpdate({ aid: req.body.articleId }, { $inc: { comment_n: 1 } }, (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err.message)
            }
        })
        res.status(200).send('send email successfully')
    }).catch(err => {
        console.log(err)
    })

})

router.patch('/api/comments/:id',(req,res)=>{
    if(req.body.option==='add'){
        db.Comment.update({_id:req.params.id},{$inc:{like:1}},(err,data)=>{
            if(err){
                console.log(err)
                res.status(500).send(err.message)
            }else{
                db.User.update({email:req.body.email},{$addToSet:{likeArr:req.params.id}},(err,data)=>{
                    if(err){
                        console.log(err)
                        res.status(500).send(err.message)
                    }else{
                        res.status(200).send('succeed in add like')
                    }
                })
            }
        })
    }else if(req.body.option==='drop'){
        db.Comment.update({_id:req.params.id},{$inc:{like:-1}},(err,data)=>{
            if(err){
                console.log(err)
                res.status(500).send(err.message)
            }else{
                db.User.findOneAndUpdate({email:req.body.email},{$pull:{likeArr:req.params.id}},(err,data)=>{
                    if(err){
                        console.log(err)
                        res.status(500).send(err.message)
                    }else{
                        res.status(200).send('succeed in drop like')
                    }
                })
            }
        })
    }
})

module.exports = router;