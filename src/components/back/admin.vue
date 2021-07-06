<template>
    <div class="wrapper">
        <div class="statusLine">
            <div class="left">
                <router-link :to="{name: 'home'}" class="iconfont icon-shouye" tag="span"></router-link>
                <span>{{time}}好，{{email}}</span>
            </div>
            <div class="right" @click="logout">
                <span class="glyphicon glyphicon-log-out"></span>
                <span>登出</span>
            </div>
        </div>
        <ul class="nav nav-tabs" v-if="status==0">
            <li>
                <router-link :to="{name: 'posts'}"><span class="iconfont icon-yuedu"></span>文章</router-link>
            </li>
            <li>
                <router-link :to="{name: 'account'}"><span class="iconfont icon-wode"></span>账户</router-link>
            </li>
        </ul>
        <transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <router-view class="content"></router-view>
        </transition>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex'
    export default {
        computed: {
            time() {
                const hours = new Date().getHours()
                if (hours > 5 && hours < 12) {
                    return '早上'
                } else if (hours > 12 && hours < 19) {
                    return '下午'
                } else if (hours === 12) {
                    return '中午'
                } else {
                    return '晚上'
                }
            },
            email() {
                return localStorage.email
            },
            status() {
                return localStorage.status
            }

        },
        methods: {
            ...mapMutations(['unset_user']),
            logout() {
                this.unset_user()
                this.$router.push({ name: 'home' })
            },
        }
    }
</script>

<style scoped>
    .statusLine {
        color: #fff;
        background: #17094c;
        width: 100%;
        height: 3.125rem;
        line-height: 3.125rem;
        font-size: 1.125rem;
        display: flex;
        justify-content: space-between;
    }

    .statusLine div.left {
        margin-left: 1.25rem;
    }

    .statusLine div.left span.icon-shouye {
        font-size: 1.125rem;
        color: #fff;
        cursor: pointer;
        margin-right: 0.325rem;
    }

    .statusLine div.left span.icon-shouye:hover {
        color: #fbca47;
    }

    .statusLine div.right {
        cursor: pointer;
        margin-right: 1.25rem;
        color: #fff;
    }

    .statusLine div.right span.glyphicon-log-out {
        font-size: 1rem;
        margin-right: 0.325rem;
        cursor: pointer;
    }

    .statusLine div.right:hover {
        color: #fbca47;
    }

    .nav li a {
        transition: 1s;
    }

    .nav li a:hover {
        cursor: pointer;
        transition: 1s;
        color: #fbca47;
    }

    .nav li span {
        margin-right: 0.325rem;
    }

    .nav li a.router-link-active {
        background: rgba(204, 204, 204, 0.5);
    }

    @media (max-width: 575px) {
        .statusLine div.left {
            font-size: 1rem;
        }

        .statusLine div.right {
            font-size: 1rem;
        }
    }
</style>