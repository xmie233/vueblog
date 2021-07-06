<template>
    <div id='comment'>
        <div class='newComment'>
            <textarea spellcheck='false' placeholder='说点什么吧...' v-model='content' id='reply' ref='textBox'></textarea>
            <div>
                <button @click='submit' class="btn btn-success">
                    发布评论
                </button>
            </div>
        </div>
        <div class='allComments'>
            <div class='summary'>
                <p>评论数 {{comments.length}}</p>
                <p>
                    <span @click="getEarlyComments">最早 </span>|
                    <span @click="getLastedComments">最新 </span>|
                    <span @click="getHotComments"> 最热</span>
                </p>
            </div>
            <div class="comment" v-for="(comment,index) in comments" :key="comment._id">
                <div class="avatar">
                    <img :src="comment.avatar">
                </div>
                <div id="info">
                    <p class="nickname">{{comment.nickname}}</p>
                    <p class="content">{{comment.content}}</p>
                    <div class="option">
                        <p class="commentDate">{{comment.date|toDate}}</p>
                        <!-- <a href="">
                            <span class="iconfont icon-wenda" @click="reply">回复</span>
                        </a> -->
                        <span class="iconfont icon-dianzan" @click="addLike(comment._id)"
                            :class="{activeLike:likeArr.indexOf(comment._id)!=-1}">{{comment.like}}</span>
                    </div>
                </div>
            </div>
            <p v-show='comments.length === 0' class='nocomment'>哎，没人理我 :(</p>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState, mapMutations } from 'vuex'
    export default {
        data() {
            return {
                content: '',
                sort: ''
            }
        },
        created() {
            this.getComments({ aid: this.$route.params.id })
            if (this.email) {
                this.getUser({ email: this.email })
            }
        },
        computed: {
            ...mapState(['comments', 'user']),
            email() {
                return localStorage.email
            },
            likeArr() {
                if (this.email) {
                    return this.user.likeArr
                } else {
                    return []
                }
            }
        },
        methods: {
            ...mapActions(['getComments', 'submitComment', 'updateLike', 'getUser']),
            submit() {
                const re = /^[\w_-]+@[\w_-]+\.[\w\\.]+$/
                if (!this.email) {
                    alert('登陆后才可以评论哦')
                    return false
                }
                else if (!this.content) {
                    alert('请填写内容')
                    return false
                } else if (this.content.length > 500) {
                    alert('您的评论太长啦')
                    return false
                } else if (/\d{7,}/i.test(this.content) || // 连续7个以上数字，过滤发Q号和Q群的评论
                    /(\d.*){7,}/i.test(this.content) || // 非连续的7个以上数字，过滤用字符间隔开的Q号和Q群的评论
                    /\u52A0.*\u7FA4/i.test(this.content) || // 包含“加群”两字的通常是发Q群的垃圾评论
                    /(\u9876.*){5,}/i.test(this.content) || // 过滤5个以上“顶”字的评论
                    /([\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D\u25CB\u58F9\u8D30\u53C1\u8086\u4F0D\u9646\u67D2\u634C\u7396\u96F6].*){7,}/i.test(this.content) // 过滤用汉字发Q号和Q群的评论
                ) {
                    alert('请不要发表灌水、广告、违法、Q群Q号等信息，感谢您的配合！')
                    return false
                }
                this.submitComment({
                    email: this.user.email,
                    avatar: this.user.avatar,
                    nickname: this.user.nickname,
                    content: this.content,
                    articleId: this.$route.params.id,
                    date: new Date()
                }).then(res => {
                    this.getComments({ aid: this.$route.params.id })
                    this.content = ''
                    alert('发送成功')
                })

            },
            reply() {

            },
            addLike(id) {
                if (!this.email) {
                    return false
                } else if (this.likeArr.indexOf(id) == -1) {
                    this.updateLike({ id: id, option: 'add', email: this.email }).then(res => {
                        this.getUser({ email: this.email })
                        this.getComments({ aid: this.$route.params.id, sort: this.sort })
                    })
                } else {
                    this.updateLike({ id: id, option: 'drop', email: this.email }).then(res => {
                        this.getUser({ email: this.email })
                        this.getComments({ aid: this.$route.params.id, sort: this.sort })
                    })
                }
            },
            getEarlyComments() {
                this.sort = ''
                this.getComments({ aid: this.$route.params.id, sort: this.sort })
            },
            getLastedComments() {
                this.sort = 'date'
                this.getComments({ aid: this.$route.params.id, sort: this.sort })
            },
            getHotComments() {
                this.sort = 'like'
                this.getComments({ aid: this.$route.params.id, sort: this.sort })
            }
        },
    }

</script>

<style scoped>
    .allComments {
        margin-top: 1.875rem;
    }

    .summary {
        background: rgba(143, 109, 109, 0.5);
        display: flex;
        justify-content: space-between;
        padding: 0.625rem;
        border-radius: 0.3125rem;
    }

    .summary span:hover {
        cursor: pointer;
        color: #fff;
    }

    .newComment textarea {
        padding: 0.625rem 1.875rem;
        margin-bottom: 0.625rem;
        width: 100%;
        font-size: 1.125rem;
        border: #ccc8da solid 1px;
        height: 12.5rem;
        margin-top: 1.875rem;
        border-radius: 1.875rem;
        outline: none;
    }

    .comment {
        padding: 0.3125rem;
        margin-top: 0.625rem;
        display: flex;
        justify-content: space-between;
    }

    .comment #info {
        border: 0.125rem solid #17094c;
        border-radius: 0.3125rem;
        padding: 0.625rem;
        width: 80%;
        position: relative;
    }

    .comment #info::before {
        position: absolute;
        left: -1.25rem;
        top: 50%;
        margin-top: -0.4375rem;
        content: '';
        border: 0.625rem solid transparent;
        border-right-color: #17094c;
        z-index: 2;
    }

    .comment #info::after {
        position: absolute;
        left: -1.0625rem;
        top: 50%;
        margin-top: -0.4375rem;
        content: '';
        border: 0.625rem solid transparent;
        border-right-color: #fff;
        z-index: 3;
    }

    .comment #info .nickname {
        font-size: 1.125rem;
        color: #17094c;
        margin-bottom: 0.3125rem;
    }

    .comment #info .content {
        margin-top: 0.625rem;
        margin-bottom: 0.625rem;
        white-space: pre-wrap;
        word-wrap: break-word;
    }

    .comment #info .option {
        display: flex;
        justify-content: flex-end;
    }

    .option a {
        color: #fff;
        margin-right: 0.3125rem;
    }

    .option p {
        margin-right: 0.3125rem;
    }

    .avatar {
        display: flex;
        align-items: center;
    }

    .avatar img {
        width: 3.75rem;
        height: 3.75rem;
        border: 0.125rem solid #cccccc;
        border-radius: 0.3125rem;
    }

    .activeLike {
        color: #fbca47;
    }

    .nocomment {
        margin: 1.25rem auto;
        text-align: center;
    }
</style>