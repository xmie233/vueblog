<template>
    <div class="container">
        <div class="row">
            <ul class="nav nav-tabs col-xl-5 col-lg-5 col-md-5 col-sm-5 col-md-offset-2">
                <li class="active"><a data-toggle="tab" href="#profile">修改信息</a></li>
                <li><a data-toggle="tab" href="#setting">账户设置</a></li>
            </ul>
        </div>
        <div class="tab-content row">
            <div id="profile" class="tab-pane fade in active container">
                <div class="row">
                    <div class="info col-xl-5 col-lg-5 col-md-5 col-sm-5 col-md-offset-2">
                        <div class="form-group">
                            <label>账号</label>
                            <p class="form-control-static">{{user.email}}</p>
                        </div>
                        <div class="form-group">
                            <label>昵称</label>
                            <input class="form-control" v-model="user.nickname">
                        </div>
                        <div class="form-group">
                            <label>介绍</label>
                            <textarea class="form-control" rows=3 v-model="user.introduce"></textarea>
                        </div>
                        <div class="form-group">
                            <label>性别</label>
                            <div>
                                <label class="radio-inline">
                                    <input type="radio" value="0" v-model='user.gender'>男
                                </label>
                                <label class="radio-inline">
                                    <input type="radio" value="1" v-model='user.gender'>女
                                </label>
                                <label class="radio-inline">
                                    <input type="radio" value="-1" v-model='user.gender'>保密
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>生日</label>
                            <input type="date" class="form-control" v-model="birthday">
                        </div>
                        <button type="button" class="btn btn-success" @click.prevent="saveProfile">保存</button>
                    </div>
                    <div class="avater col-xl-3 col-lg-3 col-md-3 col-sm-3">
                        <div class="form-group">
                            <label>头像设置</label>
                            <div class="form-control-static">
                                <img :src="user.avatar" class="avatarImg">
                                <label for="uploadAvatar">
                                    <span class="btn btn-success">上传头像</span>
                                    <input type="file" accept="image/*" @change="getImg($event)" id="uploadAvatar">
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="setting" class="tab-pane fade container">
                <form class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-md-offset-2">
                        <div class="form-group">
                            <label>当前密码</label>
                            <input class="form-control required" name='oldPassword' v-model="oldPassword"
                                type="password" placeholder="请输入当前密码" onfocus="this.placeholder=''"
                                onblur="this.placeholder='请输入当前密码'">
                        </div>
                        <div class="form-group">
                            <label>新的密码</label>
                            <input class="form-control" v-model="newPassword" type="password" placeholder="请输入新的密码"
                                onfocus="this.placeholder=''" onblur="this.placeholder='请输入新的密码'">
                        </div>
                        <div class="form-group">
                            <label>确认密码</label>
                            <input class="form-control" v-model="rePassword" type="password" placeholder="请确认密码"
                                onfocus="this.placeholder=''" onblur="this.placeholder='请确认密码'">
                        </div>
                        <button class="btn btn-success" type="button" @click.prevent="saveSetting">保存</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </div>
    </div>
</template>

<script>
    import { mapState, mapActions, mapMutations } from 'vuex'
    // 日期格式化
    Date.prototype.format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
            "H+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    export default {
        data() {
            return {
                oldPassword: '',
                newPassword: '',
                rePassword: '',
            }
        },
        created() {
            this.getUser({ email: this.email })
        },
        computed: {
            ...mapState(['user']),
            email() {
                return localStorage.email
            },
            birthday: {
                get() {
                    const date = new Date(this.user.birthday)
                    return date.format('yyyy-MM-dd')
                },
                set(val) {
                    this.user.birthday = new Date(val)
                }

            }
        },
        methods: {
            ...mapActions(['resetUserProfile', 'resetUserSetting', 'delUser', 'getUser']),
            saveProfile() {
                this.resetUserProfile(this.user)
            },
            saveSetting() {
                if (this.newPassword === this.rePassword) {
                    this.resetUserSetting({
                        email: this.user.email,
                        oldPassword: this.oldPassword,
                        newPassword: this.newPassword
                    })
                    this.oldPassword = ''
                    this.rePassword = ''
                    this.newPassword = ''
                } else {
                    alert('请输入相同的密码')
                }
            },
            getImg(event) {
                const img = event.currentTarget.files[0]
                var reader = new FileReader()
                reader.readAsDataURL(img)
                reader.onloadend = () => {
                    this.user.avatar = reader.result
                }
            }
        }
    }
</script>

<style scoped>
    .nav {
        font-size: 1rem;
        border-bottom: none;
        margin-bottom: 1.25rem;
        margin-top: 3.125rem;
    }

    .nav li.active a {
        background-color: transparent;
    }

    .nav li a {
        background-color: transparent;
    }

    .nav li a:hover {
        cursor: pointer;
    }

    .form-control {
        width: 15rem;
    }

    .info {
        margin-bottom: 1.25rem;
    }

    .avatarImg {
        width: 9rem;
        height: 9rem;
        display: block;
        margin-bottom: 0.625rem;
    }

    #uploadAvatar {
        opacity: 0;
    }
</style>