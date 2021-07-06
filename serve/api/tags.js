const express = require('express')
const router = express.Router()
const db = require('../db/db.js')

router.get('/api/tags', (req, res) => {
    db.Article.find({ isPublish: true }).distinct('tags', (err, doc) => {
        if (err) {
            console.log(err)
            res.status(500).send(err.message)
        } else {
            res.status(200).send(doc)
        }
    })
})

module.exports = router