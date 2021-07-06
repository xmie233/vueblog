import Vue from 'vue'
import Router from 'vue-router'

const index = resolve => require(['@/components/front/index'], resolve)
const AboutMe = resolve => require(['@/components/front/AboutMe'], resolve)
const Home = resolve => require(['@/components/front/Home'], resolve)
const Articles = resolve => require(['@/components/front/Articles'], resolve)
const contact = resolve => require(['@/components/front/contact'], resolve)
const article = resolve => require(['@/components/front/article'], resolve)
const SearchResult = resolve => require(['@/components/front/SearchResult'], resolve)

const login = resolve => require(['@/components/back/login'], resolve)
const register = resolve => require(['@/components/back/register'], resolve)
const admin = resolve => require(['@/components/back/admin'], resolve)
const posts = resolve => require(['@/components/back/posts'], resolve)
const editor = resolve => require(['@/components/back/editor'], resolve)
const account = resolve => require(['@/components/back/account'], resolve)

Vue.use(Router)

const router = new Router({
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
    routes: [
        {
            path: '/',
            redirect: 'home',
            component: index,
            children: [
                { path: 'home', name: 'home', component: Home, meta: { title: '博客首页' } },
                { path: 'about', name: 'about', component: AboutMe, meta: { title: '关于我' } },
                { path: 'articles', name: 'articles', component: Articles, meta: { title: '学习笔记分享' } },
                { path: 'article/:id', name: 'article', component: article, meta: { title: '文章' } },
                { path: 'contact', name: 'contact', component: contact, meta: { title: '联系站长' } },
                { path: 'search/:text', name: 'SearchResult', component: SearchResult, meta: { title: '搜索结果' } }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: login,
            meta: { title: '登录页面' }
        },
        {
            path: '/register',
            component: register,
            meta: { title: '注册页面' }
        },
        {
            path: '/admin',
            redirect: '/admin/account',
            component: admin,
            children: [
                { path: 'posts', name: 'posts', component: posts, meta: { requireAuth: true, title: '博客文章' } },
                { path: 'editor/:id', name: 'editor', component: editor, meta: { requireAuth: true, title: '编辑文章' } },
                { path: 'editor', name: 'new', component: editor, meta: { requireAuth: true, title: '添加文章' } },
                { path: 'account', name: 'account', component: account, meta: { requireAuth: true, title: '修改账户' } }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    if (localStorage.email) {
        next()
    } else if (to.meta.requireAuth) {
        next({ name: 'login' })
    } else {
        next()
    }
})

export default router