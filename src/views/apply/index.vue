
<script setup>
import navTabs from '@/components/navTabs/index.vue'
import { Icon } from 'vant'
</script>

<template>
    <div class="tab-page apply">
        <div class="main">
            <div class="list">
                <div class="list-item">
                    <div class="text">空域申请</div>
                    <Icon name="arrow" color="#898989" />
                </div>
                <div class="list-item">
                    <div class="text">计划申请</div>
                    <Icon name="arrow" color="#898989" />
                </div>
            </div>
        </div>
        <navTabs active="apply" />
    </div>
</template>

<style lang="less" scoped>
@import '@/assets/style/variable.less';

.apply {
    background-color: @color-bg-app;
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