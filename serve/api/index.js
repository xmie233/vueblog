const tags = require('./tags.js')
const comments = require('./comments.js')
const login = require('./login.js')
const register = require('./register.js')
const user = require('./user')
const article = require('./article.js')

module.exports = (app) => {
    app.use(tags)
    app.use(comments)
    app.use(login)
    app.use(register)
    app.use(user)
    app.use(article)
}