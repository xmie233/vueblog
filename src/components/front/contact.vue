<template>
    <div class="contact">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="titlepage">
                        <h2> <span class="yellow">Contact Me</span><br>留言板</h2>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-10 col-md-offset-1">
                    <form id="contact_form" class="contact_form">
                        <div class="row">
                            <div class="col-md-12 ">
                                <input class="contact_control" placeholder="主题" type="text" v-model="subject">
                            </div>
                            <div class="col-md-12">
                                <input class="contact_control" placeholder="邮箱" type="email"v-model="address">
                            </div>
                            <div class="col-md-12">
                                <textarea class="textarea" placeholder="Hi..." type="text" v-model="content"></textarea>
                            </div>
                            <div class="col-md-12">
                                <button type="submit" class="send_btn" @click.prevent="send">Send</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="map">
                        <figure><img src="../../assets/img/map.png" alt="#"></figure>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapMutations, mapActions } from 'vuex'
    export default {
        data() {
            return {
                subject: '',
                address: '',
                content: '',
            }
        },
        created() {
            this.set_headline({
                content: 'Contact me',
                animation: 'animated rotateIn'
            })
        },
        methods: {
            ...mapMutations(['set_headline']),
            ...mapActions(['sendMail']),
            send() {
                const re = /^[\w_-]+@[\w_-]+\.[\w\\.]+$/
                if(!this.subject){
                    alert('请填写主题')
                    return false
                }else if(!this.content){
                    alert('请填写内容')
                    return false
                }else if(!re.test(this.address)){
                    alert("邮箱格式不正确")
                    return false
                }
                this.sendMail({
                    subject: this.subject,
                    address: this.address,
                    content: this.content
                }).then(() => {
                    this.subject = ''
                    this.content = ''
                    this.address = ''
                    alert('发送成功')
                })
            }
        }
    }
</script>

<style scoped>
    .contact {
        padding-top: 4.375rem;
    }

    .titlepage {
        text-align: center;
        padding-bottom: 3.75rem;
    }

    .titlepage h2 {
        font-size: 2.8125rem;
        color: #202020;
        line-height: 2.5rem;
        text-transform: uppercase;
    }

    .yellow {
        color: #fbca47;
        font-size: 1.0625rem;
        line-height: 3.125rem;
        font-weight: bold;
    }

    .contact_form .contact_control {
        padding: 0 1.875rem;
        margin-bottom: 2.5rem;
        width: 100%;
        height: 3.5625rem;
        font-size: 1.125rem;
        border: #ccc8da solid 1px;
        border-radius: 1.875rem;
        outline: none;
    }

    .contact_form .textarea {
        padding: 1.25rem 1.875rem;
        margin-bottom: 2.5rem;
        width: 100%;
        font-size: 1.125rem;
        border: #ccc8da solid 1px;
        height: 12.5rem;
        border-radius: 1.875rem;
        outline: none;
    }

    .contact_form .send_btn {
        font-size: 1.0625rem;
        background-color: #fbca47;
        text-transform: uppercase;
        color: #fff;
        padding: 0.9375rem 0px;
        border-radius: 2.5rem;
        max-width: 13.5625rem;
        width: 100%;
        display: block;
        margin-top: 1.875rem;
        font-weight: 500;
        margin: 0 auto;
        border: none;
    }

    .contact_form .contact_control::-webkit-input-placeholder {
        color: #ccc;
    }

    .contact_form .textarea::-webkit-input-placeholder {
        color: #ccc;
    }

    .map img{
        width: 100%;
        margin-top: 3.125rem;
    }
</style>