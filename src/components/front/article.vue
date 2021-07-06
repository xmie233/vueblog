<template>
    <div id="article">
            <div class="article">
                <div class="head">
                    <h4 class="title">{{article.title}}</h4>
                    <div class="stats">
                        <time><span class="iconfont icon-lishi"></span>{{article.date | toDate}}</time>
                        <span class="articleTag">
                            <span class="glyphicon glyphicon-tags"></span>{{article.tags |toTag}}
                        </span>
                    </div>
                </div>          
                <mavon-editor class="md" :value="article.content"  :subfield="false"
                    :defaultOpen="'preview'" :toolbarsFlag="false" :editable="false" :scrollStyle="false"/>
            </div>
            <article-comment class="animated fadeIn"></article-comment>
        <span class="glyphicon glyphicon-arrow-left" @click="back"></span>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import ArticleComment from './component/ArticleComment'

    export default {
        created() {
            this.getArticle(this.$route.params.id)
        },
        computed: {
            ...mapState(['articles', 'curTag', 'article'])
        },
        methods: {
            ...mapActions(['getArticle']),
            back(){
                    this.$router.go(-1)
            }
        },
        components: {
            ArticleComment
        }
    }
</script>

<style scoped>
    #article {
        margin: 0 6.25rem;
    }

    .head{
        background-color: #eee;
        margin-top: 0.625rem;
        margin-bottom: 1.25rem;
        border-radius: 0.625rem;
        padding: 0.625rem;
    }

    .title {
        text-align: center;
        font-weight: bold;
    }

    .stats{
        display: flex;
        justify-content: space-between;
    }

    /* .md{
        word-wrap: break-word;
    } */

    .iconfont,
    .glyphicon {
        margin-right: 0.625rem;
        font-size: 0.9375rem;
    }

    .glyphicon-arrow-left {
        color: #17094c;
        font-size: 1.875rem;
        position: relative;
        bottom: 1.25rem;
        left: 1.25rem;
    }

    .glyphicon-arrow-left:hover {
        cursor: pointer;
        color: #fbca47;
    }

    @media (max-width: 575px){
        #article{
            margin: 0 0.625rem;
        }
    }
</style>