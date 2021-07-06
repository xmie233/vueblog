import axios from 'axios'
import router from '../router'

const instance1 = axios.create({
    baseURL: 'http://localhost:3003',
    timeout: 5000
})

export default {
    login(context, payload) {
        return instance1.post(
            '/api/login',
            payload
        ).then(res => {
            if (res.data.err_code === 0) {
                context.commit('set_user', res.data.user)
                router.push({ name: 'account' })
            } else if (res.data.err_code === 1) {
                alert('密码错误！')
            } else if (res.data.err_code === 2) {
                alert('账户不存在！')
            }
        }).catch(err => {
            console.log(err)
            alert('登录失败， 请重新登录')
        })
    },
    register(context, payload) {
        return instance1.post(
            '/api/register',
            payload
        ).then(res => {
            if (res.data.err_code === 0) {
                context.commit('set_user', res.data.user)
                router.push({ name: 'account' })
            } else if (res.data.err_code === 1) {
                alert('账户已存在')
            }
        }).catch(err => {
            console.log(err)
            alert('注册失败， 请重新注册')
        })

    },
    getAllArticles(context, payload) {
        return instance1.get(
            '/api/articles',
            { params: payload }
        ).then(res => {
            // context.commit('set_pageNum', Math.ceil(res.data.length / payload.limit))
            // context.commit('set_all_articles', res.data.reverse().splice(payload.limit * (payload.page - 1), payload.limit))
            context.commit('set_pageNum', res.data.pageNum)
            context.commit('set_all_articles', res.data.doc)
        }).catch(err => {
            console.log(err)
        })
    },
    delArticle(context, aid) {
        return instance1.delete(
            '/api/article/' + aid
        ).catch(err => {
            console.log(err)
            alert('删除失败')
        })
    },
    getArticle(context, aid) {
        return instance1.get(
            '/api/article/' + aid
        ).then(res => {
            context.commit('set_article', res.data)
        }).catch(err => {
            console.log(err)
        })
    },
    saveArticle(context, aid) {
        if (aid) {
            return instance1.patch(
                '/api/article/' + aid,
                context.state.article
            ).then(res => {
                router.push({ name: 'posts' })
            }).catch(err => {
                console.log(err)
                alert('提交失败')
            })
        } else {
            return instance1.post('/api/article', context.state.article)
                .then(res => {
                    router.push({ name: 'posts' })
                }).catch(err => {
                    console.log(err)
                    alert('提交失败')
                })
        }

    },
    searchArticles(context, payload) {
        return instance1.post(
            '/api/searchArticles',
            payload
        ).then(res => {
            if (res.data.length === 0) {
                context.commit('set_noMore', true)
            } else {
                context.commit('set_noMore', false)
            }
            if (payload.add) {
                context.commit('add_articles', res.data)
            } else {
                context.commit('set_all_articles', res.data)
            }
        }).catch(err => {
            console.log(err)
        })
    },
    getComments(context, payload) {
        return instance1.get(
            '/api/comments',
            { params: payload }
        ).then(res => {
            context.commit('set_comments', res.data)
        }).catch(err => {
            console.log(err)
        })
    },
    submitComment(context, payload) {
        return instance1.post(
            '/api/comments',
            payload
        ).catch(err => {
            console.log(err)
        })
    },
    updateLike(context, payload) {
        return instance1.patch(
            'api/comments/' + payload.id,
            { option: payload.option, email: payload.email }
        ).catch(err => {
            console.log(err)
        })
    },
    resetUserProfile(context, payload) {
        return instance1.post(
            '/api/user/profile',
            payload
        ).then(res => {
            context.commit('set_user', res.data)
            alert('修改成功')
        }).catch(err => {
            console.log(err)
            alert('保存失败')
        })
    },
    resetUserSetting(context, payload) {
        return instance1.post(
            '/api/user/setting',
            payload
        ).then(res => {
            if (res.data.err_code === 0) {
                context.commit('set_user', res.data.user)
                alert('修改成功')
                router.push({ name: 'login' })
            } else if (res.data.err_code === 1) {
                alert('当前密码错误，请输入正确的密码')
            }
        }).catch(err => {
            console.log(err)
            alert('保存失败')
        })
    },
    delUser(context, payload) {
        return instance1.delete(
            '/api/user',
            { params: payload }
        ).then(res => {
            if (res.data.err_code === 1) {
                alert('密码错误！')
            } else {
                context.commit('unset_user')
                alert('注销成功')
                router.push({ name: 'home' })
            }
        }).catch(err => {
            console.log(err)
        })
    },
    getUser(context, payload) {
        return instance1.get(
            '/api/user',
            { params: payload }
        ).then(res => {
            context.commit('set_user', res.data)
        }).catch(err => {
            console.log(err)
        })
    },
    // email
    sendMail(context, payload) {
        return instance1.post(
            '/api/mail',
            payload
        ).catch((err) => {
            alert('发送失败')
            console.log(err)
        })
    },
    getAllTags(context) {
        return instance1.get(
            '/api/tags'
        ).then(res => {
            context.commit('set_tags', res.data)
        }).catch(err => {
            console.log(err)
        })
    }
}