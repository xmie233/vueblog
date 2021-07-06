<template>
    <div class="wrapper">
        <p>所有文章</p>
        <article-content></article-content>
        <router-link :to="{name: 'new'}" class="btn btn-success" tag="button">
            <span>添加文章</span>
        </router-link>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    import ArticleContent from './component/ArticleContent'

    export default {
        components:{
            ArticleContent
        },
    }
</script>

<style scoped>
    p {
        background-color: #fbca47;
        border-radius: 0.625rem;
        color: #fff;
        width: 12.5rem;
        font-size: 1.875rem;
        margin: 1.25rem auto 2.5rem;
        text-align: center;

    }

    .btn {
        position: fixed;
        bottom: 6.25rem;
        right: 1.25rem;
        background-color: #17094c;
    }
</style>