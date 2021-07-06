<template>
    <div class="wrapper">
        <div class="logo">
            <a href="/home">
                <img src="../../assets/img/logo.png">
            </a>
        </div>
        <div id="main">
            <nav>
                <ul class="catalog">
                    <router-link to="/login" tag="li">
                        登陆
                    </router-link>
                    <router-link to="/register" tag="li">
                        注册
                    </router-link>
                </ul>
            </nav>
            <form id="register-form" method="POST">
                <div class="form-group">
                    <label>邮箱</label>
                    <input type="email" class="form-control" placeholder="Email" v-model="email">
                </div>
                <div class="form-group">
                    <label>昵称</label>
                    <input type="text" class="form-control" placeholder="Nickname" v-model="nickname">
                </div>
                <div class="form-group">
                    <label>密码</label>
                    <input type="password" class="form-control" placeholder="Password" v-model="password"
                        @keyup.enter="confirm">
                </div>
                <button type="button" @click.prevent="confirm" class="btn btn-success btn-block">注册</button>
            </form>
        </div>

    </div>
</template>

<script>
    import { mapActions, mapMutations } from 'vuex'

    export default {
        data() {
            return {
                email: '',
                nickname: '',
                password: ''
            }
        },
        methods: {
            ...mapActions(['register']),
            ...mapMutations(['set_user']),
            confirm() {
                const re = /^[\w_-]+@[\w_-]+\.[\w\\.]+$/
                if (!re.test(this.email)) {
                    alert("邮箱格式不正确")
                    return false
                }
                this.register({
                    email: this.email,
                    nickname: this.nickname,
                    password: this.password
                })
            }
        },
    }
</script>

<style scoped>
    body {
        background-color: #f1f1f1;
    }

    div.logo {
        text-align: center;
    }

    .logo img {
        width: 18.75rem;
    }


    div#main {
        background-color: #fff;
        border: 1px solid #d8dee2;
        width: 21.25rem;
        margin: 0 auto;
        box-shadow: 0 0 8px rgb(0 0 0 / 10%);
    }



    nav {
        height: 3.125rem;
    }

    nav ul.catalog {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-around;
        list-style: none;
        width: 100%;

    }

    nav ul li {
        width: 7rem;
        font-size: 1.125rem;
        text-align: center;
        height: 2.9375rem;
        line-height: 3.3125rem;
        cursor: pointer;
        border-bottom: 0.1875rem solid transparent;
    }

    nav ul li:hover {
        border-bottom: 0.1875rem solid #F46D87;
        transition: all 0.8s;
    }

    nav ul li.router-link-active {
        border-bottom: 0.1875rem solid #F46D87;
    }

    form {
        padding: 1.25rem;
        margin-bottom: 0.9375rem;
        border-radius: 0.3125rem;
    }
</style>