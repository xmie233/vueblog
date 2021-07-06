<template>
    <div class="articleContent">
        <div class="container">
            <div class="row">
                <div class="tags col-md-10 col-md-offset-1">
                    <button v-for="(tag, index) in allTags" :class="{activeBtn: tag === curTag}"
                        @click="switchTag(tag)">{{tag}}</button>
                </div>
            </div>
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
            <div class="row">
                <div class="col-md-10 col-md-offset-1">
                    <ul class="pagination">
                        <li><a @click="switchToPage(page-1)">&laquo;</a></li>
                        <li v-for="n in pages">
                            <a @click="switchToPage(n)" :class="{activePage:page===n}">{{n}}</a>
                        </li>
                        <li><a @click="switchToPage(page+1)">&raquo;</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapMutations, mapActions, mapGetters, mapState } from 'vuex'

    export default {
        name: 'articles',
        data() {
            return {
                page: 1,
                limit: 5,
                maxPage: 10, //显示的最大分页数
                curTag: ''
            }
        },
        computed: {
            ...mapGetters(['reducedArticles', 'allTags']),
            ...mapState(['pageNum']),
            pages() {
                if (this.pageNum <= this.maxPage) {
                    return this.pageNum //总页数小于等于最大页数就用总页数
                } else if (this.page < this.maxPage) {
                    return this.maxPage //总页数大于最大页数且当前页小于最大页数就用最大页数
                } else {
                    let arr = []
                    for (let i = this.page; i <= Math.min(this.pageNum, this.page + 5); i++) {
                        arr.push(i)
                    }
                    return arr //总页数大于最大页数且当前页大于等于最大页数 分页往前移5
                }
            }
        },
        created() {
            this.set_headline({
                content: 'Articles',
                animation: 'animated flipInY'
            })
            // 这里的then和catch与actions里的冲突，不能同时写！！！
            this.getAllArticles({ page: this.page, limit: this.limit })
            this.getAllTags()
        },
        activated() {
            this.set_headline({
                content: 'Articles',
                animation: 'animated flipInY'
            })
        },
        methods: {
            ...mapActions(['getAllArticles', 'getAllTags']),
            ...mapMutations(['set_headline']),
            switchTag(tag) {
                this.getAllArticles({ tag: tag, page: 1, limit: this.limit })
                this.curTag = tag
            },
            switchToPage(page) {
                if (page >= 1 && page <= this.pageNum) {
                    this.getAllArticles({ tag: this.curTag, page: page, limit: this.limit })
                    this.page = page
                }
            }
        }
    }
</script>

<style scoped>
    .tags {
        margin-top: 1.25rem;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    }

    .tags button {
        margin-right: 1.5625rem;
        background-color: #fbca47;
        border: none;
        color: #fff;
        width: 6.25rem;
        height: 1.875rem;
        margin-bottom: 0.625rem;
    }

    .tags button:hover {
        background-color: #17094c;
    }

    button.activeBtn {
        background-color: #17094c;
    }

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

    .pagination a {
        cursor: pointer;
    }

    .activePage {
        background-color: #17094c;
        color: #fff;
    }

    .iconfont,
    .glyphicon {
        margin-right: 0.625rem;
    }
</style>