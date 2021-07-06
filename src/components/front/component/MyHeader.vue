<template>
    <div class="header">
        <div class="white_bg">
            <div class="contanier">
                <div class="row">
                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3">
                        <div class="input-group search">
                            <input type="text" class="form-control" placeholder="Search" v-model="text"
                                @keydown.enter="search">
                            <span class="input-group-btn">
                                <button class="btn btn-default" type="button" @click="search">Submit</button>
                            </span>
                        </div>
                    </div>
                    <div class="col-xl-9 col-lg-9 col-md-9 col-sm-9">
                        <nav class="navbar" role="navigation">
                            <div class="container-fluid">
                                <div class="navbar-header">
                                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                                        data-target="#example-navbar-collapse" aria-expanded="false">
                                        <span class="sr-only">Toggle navigation</span>
                                        <span class="icon-bar"></span>
                                        <span class="icon-bar"></span>
                                        <span class="icon-bar"></span>
                                    </button>
                                </div>
                                <div class="collapse navbar-collapse" id="example-navbar-collapse">
                                    <ul class="nav navbar-nav navbar-right">
                                        <li class="active">
                                            <router-link to="/home">
                                                <span class="iconfont icon-shouye"></span>Home
                                            </router-link>
                                        </li>
                                        <li>
                                            <router-link to="/articles">
                                                <span class="iconfont icon-yuedu"></span>Articles
                                            </router-link>
                                        </li>
                                        <li>
                                            <router-link to="/contact">
                                                <span class="iconfont icon-shouji"></span>Contact
                                            </router-link>
                                        </li>
                                        <li>
                                            <router-link to="/about">
                                                <span class="iconfont icon-wode"></span>About
                                            </router-link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            <div class="section">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 col-lg-7">
                            <div class="text-bg">
                                <span>Study &amp; Share</span>
                                <div :class="headline.animation" id="title">
                                    <h1>{{headline.content}}</h1>
                                </div>
                                <p>{{headline.abstract}} </p>
                                <router-link to='/admin' class="nickname" v-if="nickname" id="nickname">
                                    Hi {{nickname}}
                                </router-link>
                                <div v-else>
                                    <router-link to='/login' class="user">Login</router-link>
                                    <router-link to='/register' class="user">Register
                                    </router-link>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 col-lg-5">
                            <div class="text_img">
                                <figure><img src="../../../assets/img/logo.png" alt="#"></figure>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        data() {
            return {
                text: '',
            }
        },
        computed: {
            ...mapState(['headline']),
            nickname() {
                if (localStorage.email) {
                    return localStorage.nickname
                } else {
                    return false
                }
            }
        },
        methods: {
            ...mapActions(['searchArticles']),
            search() {
                if(this.text==''){
                    this.$router.replace({name:'home'})
                }else{
                    this.$router.push({ name: 'SearchResult', params: { text: this.text } })
                }
            }
        },
        watch: {
            $route() {
                this.text = ''
            }
        }
    }
</script>

<style scoped>
    .btn:hover,
    .btn:focus,
    .btn:active,
    .btn:visited {
        outline: none;
        box-shadow: none !important;
    }

    a {
        text-decoration: none;
    }

    .iconfont {
        color: #fbca47;
        margin-right: 0.625rem;
        font-size: 1.25rem;
    }

    .header {
        width: 100%;
        padding: 4.5625rem 5rem;
        background: url(../../../assets/img/hearder.jpg);
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }

    .white_bg {
        background: #fff;
        border-radius: 3.125rem;
        opacity: 0.9;
        padding: 2.5rem 2.1875rem;
    }

    .navbar {
        padding-top: 0.75rem;
    }

    .icon-bar {
        background-color: #fbca47;
    }

    .search {
        padding-top: 1.5625rem;
    }

    .search input {
        border: 3px solid #fbca47;
    }

    .navbar-nav a {
        color: #030000;
        text-transform: uppercase;
        font-size: 1rem;
        transition: 1s;
    }

    .navbar-nav a:hover {
        color: #fbca47;
        border-bottom: #fbca47 solid 1px;
        background-color: transparent;
        padding-top: 1.2rem;
        padding-bottom: 0.6rem;
        transition: 0.5s;
    }

    .section {
        padding: 3.125rem 0 1.25rem;
    }

    .section .container {
        width: 100%;
    }

    .text-bg {
        text-align: center;
    }

    .text-bg span {
        color: #fbca47;
        font-size: 2rem;
        font-weight: bold;
    }

    #title h1 {
        font-size: 3.5rem;
        font-weight: 600;
        text-transform: uppercase;
        font-family: 'Raleway', sans-serif;
        padding-bottom: 2.1875rem;
    }

    .text_img {
        text-align: center;
    }

    .text_img img {
        height: 18.75rem;
    }

    .nickname {
        background-color: #fbca47;
        border-radius: 0.4375rem;
        color: #fff !important;
        font-size: 2.5rem;
        max-width: 10rem;
        width: 100%;
        display: inline-block;
        font-weight: 400;
        line-height: 1.25rem;
        text-align: center;
        padding: 0.9375rem 0;
        font-size: 1rem;
        transition: 0.5s;
    }

    .nickname:hover{
        background-color: #17094c;
        transition: 0.5s;
    }


    .user {
        font-size: 1rem;
        background-color: #17094c;
        max-width: 10rem;
        width: 100%;
        color: #fff !important;
        display: inline-block;
        border-radius: 0.4375rem;
        font-weight: 400;
        line-height: 1.25rem;
        text-align: center;
        padding: 0.9375rem 0;
        margin-right: 0.625rem;
        margin-bottom: 0.625rem;
        transition: 0.5s;
    }

    .user:hover {
        background-color: #fbca47 !important;
        transition: 0.5s;
    }

    @media (max-width:575px) {
        .header {
            padding: 1.875rem 0.9375rem;
        }
    }

    @media (max-width: 575px) {
        .white_bg {
            padding: 2.5rem 0.375rem;
        }
    }
</style>