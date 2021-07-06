<template>
    <div class="table-responsive">
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>标题</th>
                    <th>标签</th>
                    <th>日期</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="article in articles" :key="article._id">
                    <router-link :to="{name:'editor',params:{id:article.aid}}" tag="td" class="title">{{article.title}}
                    </router-link>
                    <td>{{article.tags|toTag}}</td>
                    <td>{{article.date|toDate}}</td>
                    <td>
                        <router-link :to="{name:'editor',params:{id:article.aid}}" tag="span" class="iconfont icon-zuopin">
                        </router-link>
                        <span class="iconfont icon-shanchu" @click="deleteConfirm(article.aid)"></span>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td @click="prePage">上一页</td>
                    <td colspan="2">第{{page}}页</td>
                    <td @click="nextPage">下一页</td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script>
    import { mapState, mapActions, mapMutations } from 'vuex'

    export default {
        data() {
            return {
                page: 1,
                limit: 8
            }
        },
        created() {
            this.getAllArticles({ page: this.page, limit: this.limit })
        },
        computed: {
            ...mapState(['articles', 'pageNum'])
        },
        methods: {
            ...mapActions(['delArticle', 'getAllArticles']),
            deleteConfirm(aid) {
                this.delArticle(aid)
                    .then(res => {
                        alert(res.data)
                        this.getAllArticles({ page: this.page, limit: this.limit })
                    })
            },
            prePage() {
                if (this.page <= 1) {
                    alert('已经是第一页啦')
                } else {
                    this.page--
                    this.getAllArticles({ page: this.page, limit: this.limit })
                }
            },
            nextPage() {
                if (this.page >= this.pageNum) {
                    alert('已经是最后一页啦')
                } else {
                    this.page++
                    this.getAllArticles({ page: this.page, limit: this.limit })
                }
            }
        },
        watch:{
            page(val){
                this.$emit('pageChange',val)
            },
            limit(val){
                this.$emit('limitChange',val)
            }
        }
    }
</script>

<style scoped>
    .table {
        width: 70%;
        margin: 0 auto;
        text-align: center;
        border-left: 0.1875rem solid #17094c;
        border-right: 0.1875rem solid #17094c;

    }

    thead,
    tfoot {
        color: #17094c;
        height: 2.5rem;
    }

    th,
    td {
        text-align: center;
        width: 25%;
    }

    tr {
        height: 2.5rem;
    }

    .title:hover {
        cursor: pointer;
        color: #fbca47;
    }

    .iconfont {
        margin-right: 0.625rem;
        margin-left: 0.625rem;
    }

    .iconfont:hover {
        cursor: pointer;
        color: #fbca47
    }

    tfoot tr td:nth-child(1):hover,
    tfoot tr td:nth-child(3):hover {
        cursor: pointer;
        color: #fbca47;
    }
</style>