<template>
    <div id="about">
        <div class="container">
            <div class="row">
                <div class="col-md-12 ">
                    <div class="headline">
                        <h2> <span class="yellow">About Me</span><br>关于我</h2>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-md-10 col-md-offset-1">
                    <div class="info">
                        <img src="../../assets/img/me.png" alt="me" />
                        <p>邮箱: xmie233@hust.edu.cn</p>
                        <p>学校: 华中科技大学</p>
                        <p>Github: <a href="https://github.com/xmie233" target="_blank">https://github.com/xmie233</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex'

    export default {
        created() {
            this.set_headline({
                content: 'About me',
                animation: 'animated bounce'
            })
        },
        methods: mapMutations(['set_headline'])
    }

</script>

<style scoped>
    .headline {
        text-align: center;
        padding-bottom: 3.75rem;
    }

    .headline h2 {
        font-size: 2.8125rem;
        color: #202020;
        line-height: 2.5rem;
        font-weight: normal;
        padding: 0;
        text-transform: uppercase;
    }

    .yellow {
        color: #fbca47;
        font-size: 1.0625rem;
        line-height: 3.125rem;
        font-weight: bold;
    }

    .info {
        text-align: center;
    }

    .info img {
        width: 9.375rem;
        height: 9.375rem;
        border: 0.1875rem solid #cccccc;
        border-radius: 50%;
    }

    .info p {
        font-size: 1.0625rem;
        padding-top: 1.25rem;
        color: #202020;
        line-height: 1.875rem;
    }
</style>