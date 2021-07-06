const express = require('express')
const router = express.Router()
const db = require('../db/db.js')

//按类别获取文章 {tag}
router.get('/api/articles', (req, res) => {
    // page limit tag
    const tag = req.query.tag
    const page = req.query.page
    const limit = req.query.limit * 1
    const skip = limit * (page - 1)
    if (tag && tag !== '全部') {
        db.Article.find({ tags: tag, isPublish: true }, (err, doc) => {
            if (err) {
                console.log(err)
                return res.status(500).send(err.message)
            } else {
                const pageNum = Math.ceil(doc.length / limit)
                db.Article.find({ tags: tag, isPublish: true }).sort({ date: -1 }).limit(limit).skip(skip).exec()
                    .then(doc => {
                        res.status(200).send({ doc, pageNum })
                    }).catch(err => {
                        console.log(err)
                        return res.status(500).send(err.message)
                    })
            }
        })
    } else {
        db.Article.find({ isPublish: true }, (err, doc) => {
            if (err) {
                console.log(err)
                return res.status(500).send(err.message)
            } else {
                const pageNum = Math.ceil(doc.length / limit)
                db.Article.find({ isPublish: true }).sort({ date: -1 }).limit(limit).skip(skip).exec()
                    .then(doc => {
                        res.status(200).send({ doc, pageNum })
                    }).catch(err => {
                        console.log(err)
                        return res.status(500).send(err.message)
                    })
            }
        })
    }
})

//查询文章 aid
router.get('/api/article/:aid', (req, res) => {
    db.Article.findOne({ aid: req.params.aid }, (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).json({
                err_code: 500,
                message: err.message
            })
        } else {
            res.status(200).send(data)
        }
    })
})

// 删除文章并删除文章下面的评论 aid
router.delete('/api/article/:aid', (req, res) => {
    db.Article.remove({ aid: req.params.aid }, (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).send(err.message)
        } else {
            db.Comment.remove({ articleId: req.params.aid }, (err, data) => {
                if (err) {
                    console.log(err)
                    res.status(501).send(err.message)
                } else {
                    res.status(200).send('删除成功')
                }
            })
        }
    })
})

//修改文章 adi,article(title,tags,content)
router.patch('/api/article/:aid', (req, res) => {
    const article = {
        title: req.body.title,
        tags: req.body.tags,
        date: Date(),
        content: req.body.content,
    }
    db.Article.findOneAndUpdate({ aid: req.params.aid }, article, { new: true }, (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).send(err.message)
        } else {
            res.status(200).send('修改成功')
        }
    })
})

//发布文章 article(title,tags,content)
router.post('/api/article', (req, res) => {
    const article = {
        title: req.body.title,
        content: req.body.content,
        tags: req.body.tags,
        date: new Date(),
        isPublish: true,
        comment_n: 0,
    }

    new db.Article(article).save()
    res.status(200).send('发布成功')
})

//搜索文章 label,text,limit,page
router.post('/api/searchArticles', (req, res) => {
    const text = req.body.text
    const limit = req.body.limit * 1
    const page = req.body.page
    const skip = limit * (page - 1)
    const re = new RegExp(text, 'i')
    db.Article.find({ title: re, isPublish: true }).sort({ date: -1 }).limit(limit).skip(skip).exec()
        .then(article => {
            res.status(200).send(article)
        }).catch(err => {
            console.log(err)
            return res.status(500).send(err.message)
        })
})

module.exports = router
