// 引入nodemailer
const nodemailer = require('nodemailer');

exports.send = function (to, subject, html, res) {
  // 封装发送者信息
  const transporter = nodemailer.createTransport({
    service: '163', // 调用163服务器
    secureConnection: true, // 启动SSL
    port: 465, // 端口就是465
    auth: {
      user: 'myblog20212021@163.com', // 账号
      pass: 'QXGXLFERLWSHEWJO', // 授权码,
    },
  });

  const mailOptions = {
    from: 'myblog20212021@163.com',
    to: to,
    subject: '您的博客有一条新留言-'+subject,
    html: html
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
      res.status(504).end("通知邮件发送失败")
    } else {
      console.log("Message sent: " + info.response)
    }
  })
}