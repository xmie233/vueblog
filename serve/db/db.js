const mongoose = require('mongoose')
const Schema = mongoose.Schema
const data = require('./data')
const Sequence = require('./sequence')
const md5 = require('blueimp-md5');

const UserSchema = new Schema(
    {
        email: {
            type: String,
            require: true
        },
        nickname: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        },
        create_time: {
            type: Date,
            default: Date.now
        },
        avatar: {
            type: String,
            default: 'http://localhost:3003/public/avatar-default.png'
        },
        gender: {
            type: Number,
            enum: [-1, 0, 1],
            default: -1
        },
        birthday: {
            type: Date,
            default: Date.now
        },
        introduce: {
            type: String,
            default: ''
        },
        likeArr: {
            type: Array,
            default: []
        },
        status: {
            type: Number,
            // 0 没有权限限制
            // 1 不可以评论
            // 2 不可以登录
            // 3 不可以进入后台
            enum: [0, 1, 2, 3],
            default: 3
        }
    },
    { versionKey: false }
)

const ArticleSchema = new Schema(
    {
        aid: {
            type: Number,
            index: { unique: true }
        },
        title: String,
        content: String,
        tags: [String],
        date: Date,
        isPublish: Boolean,
        comment_n: Number
    },
    { versionKey: false }
)
const CommentSchema = new Schema(
    {
        username: String,
        avatar: String,
        nickname: String,
        content: String,
        articleId: Number,
        date: Date,
        like: Number
    },
    { versionKey: false }
)

// 生成从0开始自增长的文章aid
ArticleSchema.pre('save', function (next) {
    var self = this;
    if (self.isNew) {
        Sequence.increment('Article', function (err, result) {
            if (err)
                throw err;
            self.aid = result.value.next;
            next();
        });
    } else {
        next();
    }
})

const Models = {
    User: mongoose.model('User', UserSchema),
    Article: mongoose.model('Article', ArticleSchema),
    Comment: mongoose.model('Comment', CommentSchema)
}

// 初始化数据
const initialize = () => {
    console.log('beginning to initialize data...')
    Models.User.find({}, (err, doc) => {
        if (err) {
            console.log(err)
            console.log('initialize failed')
        } else if (!doc.length) {
            // 第一次创建站长账户
            new Models['User']({ email: 'xmie233@hust.edu.cn', nickname: '苗', password: md5('123456'), status: 0 }).save()
            Promise.all(data.map((item) => { new Models['Article'](item).save() }))
                .then(() => { console.log('initialize successfully') })
                .catch(() => { console.log('initialize failed') })
        } else {
            console.log('initialize successfully')
        }
    })
}

mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost/myblog', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('数据库连接成功'))
    .catch(() => console.log('数据库连接失败'));

const db = mongoose.connection

db.on('error', console.error.bind(console, 'Database connection error.'));
db.once('open', () => {
    console.log('The database has connected.')
    initialize()
});

module.exports = Models
