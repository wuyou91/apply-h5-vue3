
<script setup>
import { ref } from 'vue'
import navTabs from '@/components/navTabs/index.vue'
import { Icon, showConfirmDialog, Badge } from 'vant'

const msgNum = ref(2)

function clear() {
    showConfirmDialog({
        title: '提示',
        message: '全部设置为已读？'
    }).then(() => {
        msgNum.value = 0
    })
}
</script>

<template>
    <div class="user">
        <div class="top">
            <img class="bg-img" src="/img/bg_userCenter.png" alt="">

            <div class="user-info">
                <div class="uer-img">张</div>
                <div class="text-wrapper">
                    <div class="name">张三</div>
                    <div class="desc">{{ 'zhangsan@qq.com'.replace(/(\w{2})\w*(@.*)/, "$1***$2") }}</div>
                </div>
            </div>
        </div>
        <div class="list">
            <div class="list-item" @click="clear">
                <div class="text">
                    <Badge :dot="msgNum > 0">
                        消息通知
                    </Badge>
                </div>
                <Icon name="arrow" color="#898989" />
            </div>
            <div class="list-item">
                <div class="text">信息管理</div>
                <Icon name="arrow" color="#898989" />
            </div>
            <div class="list-item">
                <div class="text">消息通知</div>
                <Icon name="arrow" color="#898989" />
            </div>
            <div class="list-item">
                <div class="text">意见反馈</div>
                <Icon name="arrow" color="#898989" />
            </div>
            <div class="list-item">
                <div class="text">设置</div>
                <Icon name="arrow" color="#898989" />
            </div>
        </div>
        <navTabs active="user" />
    </div>
</template>

<style lang="less" scoped>
@import '@/assets/style/variable.less';

.user {
    width: 100%;
    height: 100vh;
    background-color: @color-bg-app;
}

.top {
    width: 100%;
    height: fit-content;
    position: relative;

    .bg-img {
        width: 100%;
    }

    .user-info {
        position: absolute;
        bottom: 25px;
        left: 15px;
        right: 15px;
        display: flex;
        align-items: center;

        .uer-img {
            flex-shrink: 0;
            width: 80px;
            height: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #7e57c2;
            border: 4px solid #fff;
            border-radius: 100%;
            font-size: 40px;
            color: #fff;
            position: relative;

            &::after {
                content: '';
                width: 26px;
                height: 26px;
                display: block;
                border-radius: 100%;
                background: #fff url(/img/user_black.png) center / 14px 14px no-repeat;
                position: absolute;
                right: 0;
                bottom: 0;
            }
        }

        .text-wrapper {
            flex-grow: 1;
            margin-left: 20px;

            .name {
                font-size: 18px;
            }

            .desc {
                font-size: 14px;
                color: #999;
            }
        }
    }
}

.list {
    margin: 20px 15px;
    .wrapper-box();

    .list-item {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
    }
}
</style>