export default {
    // 设置用户
    set_user: (state, user) => {
        localStorage.setItem('email', user.email)
        localStorage.setItem('nickname', user.nickname)
        localStorage.setItem('status',user.status)
        state.user = user
    },
    unset_user: (state) => {
        localStorage.removeItem('email')
        localStorage.removeItem('nickname')
        localStorage.removeItem('status')
        state.user = {}
    },
    // 设置页面标题
    set_headline: (state, headline) => {
        state.headline = headline
    },
    // 设置总页数
    set_pageNum: (state, pageNum) => {
        state.pageNum = pageNum
    },
    // tags
    set_tags: (state, tags) => {
        state.tags = tags
    },
    // article
    update_post_title: (state, title) => {
        state.article.title = title
    },
    update_post_content: (state, content) => {
        state.article.content = content
    },
    update_post_tags: (state, tags) => {
        state.article.tags = tags
    },
    // 设置某一篇文章
    set_article: (state, article) => {
        state.article = article
    },
    // 设置所有文章（page,limit)
    set_all_articles: (state, articles) => {
        state.articles = articles
    },
    // 设置评论
    set_comments: (state, comments) => {
        state.comments = comments
    },
    set_noMore:(state,flag)=>{
        state.noMore=flag
    },
    add_articles:(state,articles)=>{
        state.articles=state.articles.concat(articles)
    },

    // 对话框
    set_dialog: (state, payload) => {
        state.dialog = payload
        state.dialog.resolveFn = () => { }
        state.dialog.rejectFn = () => { }
    }
}