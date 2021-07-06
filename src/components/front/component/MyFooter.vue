<template>
    <div class="footer">
        <div class="container">
            <div class="row">
                <div class="col-lg-4 col-md-4 col-sm-12">
                    <a href="#"><img src="../../../assets/img/me.png" alt="me"></a>
                    <div class="follow">
                        <p>前端学习和分享</p>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12">
                    <h3>Quick link</h3>
                    <ul class="link_icon">
                        <li>
                            <router-link to="/home">
                                <span class="glyphicon glyphicon-chevron-right"></span>Home
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/articles">
                                <span class="glyphicon glyphicon-chevron-right"></span>Articles
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/contact">
                                <span class="glyphicon glyphicon-chevron-right"></span>Contact
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/about">
                                <span class="glyphicon glyphicon-chevron-right"></span>About
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12">
                    <h3>Contact me</h3>
                    <ul class="location_icon">
                        <li><span class="iconfont icon-GitHub"></span>
                            <a href="https://github.com/xmie233" target="_blank">https://github.com/xmie233</a>
                        </li>
                        <li><span class="iconfont icon-youxiang"></span>xmie233@hust.edu.cn</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="copyright">
            <div class="container">
                <div class="row">
                    <div class="col-md-10 col-md-offset-1">
                        <p>Copyright @ 2021 Powered by Vue. Designed by me | <router-link :to="{name: 'login'}"
                                class="login">登录</router-link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>
    a {
        text-decoration: none;
    }

    .footer {
        background-color: #180552;
        text-align: center;
        padding-top: 5.625rem;
        margin-top: 5.625rem;
    }

    .footer img {
        width: 3.125rem;
        padding-bottom: 1rem;
    }

    .footer h3 {
        color: #fff;
        font-weight: 400;
        font-size: 2.125rem;
        line-height: 2.125rem;
        text-align: left;
        margin-bottom: 1.625rem;
        margin-top: 0.625rem;
        text-transform: uppercase;
    }

    .follow p {
        color: #fff;
        font-size: 1rem;
    }

    ul.link_icon li {
        display: flex;
        margin-bottom: 1rem;
        flex-wrap: wrap;
    }

    ul.link_icon .router-link-active {
        color: #fbca47;
    }

    ul.link_icon li a {
        color: #fff;
        float: left;
        text-align: center;
        line-height: 1.25rem;
        font-size: 1rem;
        transition: 0.5s;
    }

    ul.link_icon li a:hover {
        color: #fbca47;
        transition: 0.5s;
    }

    ul.link_icon li span {
        padding-right: 0.625rem;
    }

    ul.location_icon li {
        display: flex;
        margin-bottom: 1rem;
        flex-wrap: wrap;
        color: #fff;
        font-size: 1rem;
    }

    ul.location_icon li a {
        font-size: 18px;
        color: #fff;
    }

    ul.location_icon li span {
        padding-right: 0.625rem;
    }

    .copyright p {
        color: #fff;
        font-size: 1rem;
        line-height: 1.25rem;
        text-align: center;
        padding-top: 1.5625rem;
        border-top: #301e64 solid 1px;
    }

    .login {
        color: #fff;
    }

    .login:hover {
        cursor: pointer;
    }
</style>