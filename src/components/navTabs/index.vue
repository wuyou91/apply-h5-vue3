<script setup>
import { defineProps } from 'vue'
import { Tabbar, TabbarItem } from 'vant';
const props = defineProps({
    active: String
})
</script>

<template>
    <Tabbar v-model="props.active" fixed placeholder>
        <TabbarItem name="home" icon="wap-home-o" to="/home">首页</TabbarItem>
        <TabbarItem name="apply" icon="list-switching" to="apply">申报</TabbarItem>
        <TabbarItem name="history" icon="orders-o" to="/history">订单</TabbarItem>
        <TabbarItem name="user" icon="user-o" to="/user">我的</TabbarItem>
    </Tabbar>
</template>