<template>
    <div id="search">
        <div class="container">
            <ul class="row">
                <li class="article col-md-10 col-md-offset-1" v-for="(article, index) in reducedArticles"
                    :key="article._id">
                    <h4 class="title">{{article.title}}</h4>
                    <div class="content">
                        <p>{{article.content}}</p>
                        <router-link :to="{name: 'article', params: {id: article.aid, index: index, page: page}}" exact>
                            查看更多
                        </router-link>
                    </div>
                    <div id="tags">
                        <span v-for="tag in article.tags">{{tag}}</span>
                    </div>
                    <div class="stats">
                        <div>
                            <span class="iconfont icon-lishi"></span> {{article.date | toDate}}
                        </div>
                        <div>
                            <span class="iconfont icon-wenda"></span> {{article.comment_n}}
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <p v-if="!noMore" class="noMore animated fadeIn">下拉加载更多</p>
        <p v-if="noMore" class="noMore animated fadeIn">没啦没啦，别扯了</p>
    </div>
</template>

<script>
    import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

    export default {
        data() {
            return {
                page: 1,
                limit: 5
            }
        },
        created() {
            this.set_headline({
                content: '搜索结果',
                animation: 'animated rotateIn'
            })
            this.searchArticles({ text: this.$route.params.text, page: this.page, limit: this.limit })
        },
        beforeRouteUpdate(to, from, next) {
            if (to.params.text) {
                this.searchArticles({ text: to.params.text, page: this.page, limit: this.limit })
            }
            next()
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll)
        },
        beforeRouteLeave(to, from, next) {
            window.removeEventListener('scroll', this.handleScroll)
            next()
        },
        computed: {
            ...mapState(['noMore']),
            ...mapGetters(['reducedArticles'])
        },
        methods: {
            ...mapActions(['searchArticles']),
            ...mapMutations(['set_headline']),
            handleScroll() {
                const totalH = document.body.scrollHeight
                const scrollH = document.documentElement.scrollTop
                const clientH = document.body.clientHeight
                if (totalH - scrollH - clientH <= 10 && !this.noMore) {
                    this.searchArticles({ add: true, text: this.$route.params.text, page: ++this.page, limit: this.limit })
                }
                if (this.noMore) {
                    this.page = 1
                }
            }
        }
    }

</script>

<style scoped>
    .article {
        position: relative;
        padding: 1.25rem;
        border: 1px solid rgba(133, 153, 171, 0.2);
        box-shadow: 0 2px 26px 0 rgba(133, 153, 171, 0.1);
        border-radius: 2.5rem;
        margin-bottom: 1.25rem;
        margin-top: 1.25rem;
    }

    .title {
        font-size: 1.125rem;
        font-weight: 600;
        color: #364e65;
        margin-bottom: 0.9375rem;
        line-height: 1.625rem;
    }

    .content {
        margin-bottom: 1.25rem;
        width: 100%;
    }

    .content p {
        font-size: 0.875rem;
        line-height: 1.5rem;
        color: #8599ab;
        margin-top: 0.9375rem;
    }

    .content a {
        color: #fa7268;
        font-weight: 600;
        font-size: 0.875rem;
        margin-top: 0.3125rem;
    }

    .stats {
        display: flex;
        justify-content: space-between;
        border-top: 1px solid rgba(133, 153, 171, 0.2);
        padding-top: 1.25rem;
    }

    #tags {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 0.3125rem;
    }

    #tags span {
        height: 1.625rem;
        line-height: 1.625rem;
        padding: 0 0.6875rem;
        border-radius: 0.25rem;
        border: 1px solid rgba(133, 153, 171, 0.2);
        background-color: #fafafa;
        color: #8599ab;
        font-size: 0.8125rem;
        margin-right: 0.9375rem;
        margin-bottom: 0.9375rem;
    }

    .iconfont {
        font-size: 1.125rem;
        margin-right: 0.3125rem;
    }

    .glyphicon {

        margin-right: 0.3125rem;
    }

    .noMore {
        margin-top: 1.875rem;
        margin-bottom: 1.875rem;
        text-align: center;
    }
</style>