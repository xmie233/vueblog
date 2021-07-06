<template>
    <div class="wrapper">
        <div class="title">
            <input type="text" placeholder="文章标题" onfocus="this.placeholder=''" onblur="this.placeholder='文章标题'"
                v-model="title" />
        </div>
        <div class="info">
            <div id="tags">
                <span class="glyphicon glyphicon-plus" @click="addTag" v-if="tags.length===0"></span>
                <div v-for="(item,index) in tags">
                    <input class="newTag" placeholder="标签" v-model="tags[index]" @keyup.enter="addTag" @blur="repeate">
                    <span class="glyphicon glyphicon-trash" @click="delTag(index)"></span>
                    <span class="glyphicon glyphicon-plus" @click="addTag" v-if="index===tags.length-1"></span>
                </div>
            </div>
            <div class="content">
                <mavon-editor  v-model="article.content" />
            </div>
            <button class="btn btn-success" @click="save">发布文章</button>
        </div>
    </div>
</template>

<script>
    import { mapMutations, mapActions, mapState } from 'vuex'

    export default {
        data(){
            return{
                is_repeated:false
            }
        },
        created() {
            const aid = this.$route.params.id
            if (aid) {
                this.getArticle(aid)
            } else {
                this.set_article({
                    title: '',
                    content: '',
                    tags: []
                })
            }
        },
        computed: {
            ...mapState(['article']),
            title: {
                get() { return this.article.title },
                set(val) { this.update_post_title(val) }
            },
            content() {
                return this.article.content
            },
            tags() {
                return this.article.tags
            }
        },
        methods: {
            ...mapMutations(['set_article', 'update_post_title', 'update_post_content', 'update_post_tags']),
            ...mapActions(['getArticle', 'saveArticle']),
            delTag(index) {
                this.tags.splice(index, 1)
                this.update_post_tags(this.tags)
                this.repeate()
            },
            addTag() {
                this.tags.push('')
                this.update_post_tags(this.tags)
                this.repeate()
            },
            repeate(){
                let arr=[] // 不重复的元素
                let repeate=[] // 重复的元素
                for(let tag of this.tags){
                    if(arr.indexOf(tag)!=-1 && repeate.indexOf(tag)==-1){
                        repeate.push(tag)
                    }else if(arr.indexOf(tag)==-1){
                        arr.push(tag)
                    }
                }
                if(repeate.toString()==[""].toString() || repeate.length==0){//如果没有重复的标签或重复的标签是空值
                    this.is_repeated=false
                }else{
                    alert('标签重复')
                    this.is_repeated=true
                }
            },
            save(){
                if(this.title==''){
                    alert('标题不可以为空')
                }else if(this.tags.indexOf('')!=-1 || this.tags.length==0){
                    alert('标签不可以有空值哦')
                }else if(this.is_repeated){
                    alert('标签重复，不可以提交哦')
                }else{
                    this.saveArticle(this.$route.params.id)
                }
            }
        },
        watch: {
            // 计算属性无法监听数组内部的变化
            tags() {
                this.update_post_tags(this.tags)
            },
            content(){
                this.update_post_content(this.content)
            }
        }
    }
</script>

<style scoped>
    #tags input {
        background-color: transparent;
        outline: none;
        border: none;
        border-bottom: 0.125rem solid #fbca47;
        margin-bottom: 0.625rem;
        margin-right: 0.3125rem;
        text-align: center;
        width: 6.25rem;
        height: 1.875rem;
        font-size: 1rem;

    }
   
    div.title input {
        background: transparent;
        border: none;
        text-align: center;
        width: 100%;
        height: 3.125rem;
        font-size: 1.875rem;
    }


    .info {
        width: 80%;
        margin: 0 auto;
    }

    .btn {
        margin: 0.625rem 0.625rem 0 0;
    }
</style>