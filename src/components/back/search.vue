<template>
    <div class="wrapper">
        <div class="search">
            <input type="text" v-model="text" placeholder="搜索一下" onfocus="this.placeholder=''" onblur="this.placeholder='搜索一下'" @keyup.enter="" />
            <span class="iconfont icon-sousuo" @click="searchArticles({label:picked,text:text,limit:limit,page:page})"></span>
        </div>
        <div class="searchString">
            搜索匹配：
            <label for="title"><input type="radio" value="title" id="title" v-model="picked" />标题</label>
            <label for="tags"><input type="radio" value="tags" id="tags" v-model="picked" />标签</label>
        </div>
        <p>搜索结果</p>
        <article-content @pageChange="getPage" @limitChange="getlimit"></article-content>
    </div>
</template>

<script>
    import ArticleContent from './component/ArticleContent'
    import {mapActions,mapMutations} from 'vuex'
    export default {
        data() {
            return {
                text: '',
                picked:'',
                page:'',
                limit:''
            }
        },
        components: {
            ArticleContent
        },
        created(){
            this.set_all_articles({})
        },
        methods:{
            ...mapActions(['searchArticles']),
            ...mapMutations(['set_all_articles']),
            getPage(val){
                this.page=val
            },
            getLimit(val){
                this.limit=val
            }
        }
    }
</script>

<style scoped>
    .wrapper {
        text-align: center;
    }

    .search input {
        width: 28.125rem;
        /* margin: 1.25rem auto 0.625rem; */
        margin-bottom: 0.625rem;
        height: 2.8125rem;
        font-size: 1.25rem;
        border: 0.125rem solid rgb(129, 216, 208);
        border-radius: 1.875rem;
        outline: none;
        text-align: center;
        /* color: #ffffff; */
        background: transparent;
    }

    span.iconfont {
        position: relative;
        left: -3.4375rem;
        top: 0.6rem;
        font-size: 2.5rem;
        color: rgb(169, 169, 169);
        cursor: pointer;
    }

    .searchString {
        margin-bottom: 4.375rem;
        font-size: 1rem;
    }

    .searchString input {
        cursor: pointer;
        margin-right: 0.625rem;
    }

    .searchString label {
        margin-right: 1.25rem;
        cursor: pointer;
    }

    p {
        border-bottom: 0.1875rem double rgb(129, 216, 208);
        width: 12.5rem;
        font-size: 1.875rem;
        margin: 0 auto 2.5rem;
        padding-bottom: 0.625rem;
    }
</style>