<template>
    <div class="home">
        <section class="newBlog">
            <p class="headline title animated bounceIn">最近更新</p>
            <div class="posts animated fadeIn">
                <div class="flex">
                    <div v-for="(article,index) in reducedArticles" class="oneArticle">
                        <router-link :to="{name: 'article', params: {id: article.aid}}" tag="p" exact
                            class="title_1">{{article.title}}
                        </router-link>
                        <p class="content">{{article.content}}</p>
                        <router-link :to="{name: 'article', params: {id: article.aid}}" tag="button"
                            exact class="readBtn"><span>Read More</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import { mapMutations, mapActions, mapGetters } from 'vuex'

    export default {
        data() {
            return {
                subject: "",
                address: "",
                content: "",
                sendFlag: false
            }
        },
        created() {
            this.set_headline({
                content: "Welcome",
                animation: "animated bounceIn"
            })
            this.getAllArticles({ page: 1, limit: 3 })
        },
        computed: {
            ...mapGetters(['reducedArticles']),
        },
        methods: {
            ...mapMutations(['set_headline']),
            ...mapActions(['getAllArticles']),
        }
    }
</script>

<style scoped>
    p.headline {
        font-size: 1.75rem;
        border-radius: 0.5rem;
        color: #fff;
        background-color: #fbca47;
        width: 13rem;
        margin: 4.275rem auto 2.25rem;
        text-align: center;
        line-height: 2.5rem;
    }

    .newBlog .posts .flex {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    div.oneArticle {
        width: 20rem;
        height: 25rem;
        border-radius: 1rem;
        padding: 1rem 2rem 1.25rem;
        margin: 0 1.5rem 4rem 1.5rem;
        position: relative;
        box-shadow: 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12), 0 2px 4px -1px rgba(0, 0, 0, .2);
    }

    div.oneArticle p {
        width: 16rem
    }

    div.oneArticle .title_1 {
        font-size: 1.5rem;
        font-weight: bold;
        padding-top: 1.25rem;
    }

    div.oneArticle .title_1:hover {
        color: #17094c;
        cursor: pointer;
    }

    .readBtn {
        font-size: 1rem;
        background-color: #17094c;
        max-width: 160px;
        width: 100%;
        color: #fff !important;
        display: inline-block;
        border-radius: 0.4375rem;
        font-weight: 400;
        line-height: 1.25rem;
        text-align: center;
        padding: 0.9375rem 0;
        margin-right: 0.625rem;
        position: absolute;
        bottom: 1.875rem;
        border: none;
        transition: 0.5s;
    }

    .readBtn:hover{
        background-color: #fbca47;
        transition: 0.5s;
    }
</style>