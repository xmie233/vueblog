const express = require('express')
const bodyParser = require('body-parser')
const route = require('./api/index.js')
const app = express()
const mail = require('./email')

app.set('port', (process.env.port || 3003))
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

app.use('/public', express.static('public'));

app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS,PATCH");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
});

route(app)

app.post('/api/mail', (req, res) => {
    const content = `
<div style="width: 90%; border: 2px solid lightgreen; margin: 1rem auto; padding: 1rem; text-align: center;">
    <p style="border-bottom: 1px dashed lightgreen;margin: 0;padding-bottom: 1rem; color: lightgreen; font-size: 1.25rem;">MyBlog Message</p>
<p style="margin: 1rem 0 0;">hello,站长 &#x1f608</p>
<p sytle="margin: 0 0 1rem;">你有一条新留言</p>
<p style="width: 70%; border-left: 4px solid lightgreen; padding: 1rem; margin: 0 auto 2rem; text-align: left;white-space: pre-line;">主题: ${req.body.subject}
邮箱: ${req.body.address}
内容: ${req.body.content}
    </p>
    <a href="https://www.xxx.cn" style="text-decoration: none; background: lightgreen;color: #fff; height: 2rem; line-height: 2rem; padding: 0 1rem; display: inline-block; border-radius: 0.2rem;">回到博客</a>
    </div>
    `
    mail.send('xx@qq.com', req.body.subject, content, res)
    res.status(200).send('send email successfully')
})// xx@qq.com改为自己收邮件的邮箱

app.listen(app.get('port'), function () {
    console.log('GetData http://localhost:' + app.get('port'))
})