import Vue from "vue"
import Vuex from "vuex"
import actions from "./actions.js"
import getters from './getters.js'
import mutations from './mutations.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        user:{},//用户信息
        headline:{},//索引页封面标题
        pageNum:{},//页码长度=总文章数/每页展示文章数limit
        tags: [],//文章标签
        article: {},//当前文章
        articles: [],//所有文章
        comments: [],//当前文章的所有评论
        noMore:false,// 是否没有更多文章
    },
    getters,
    actions,
    mutations
})

export default store