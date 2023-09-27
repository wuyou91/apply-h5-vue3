<script setup>
import { ref } from 'vue'
import { Tabbar, TabbarItem } from 'vant';
const acvtive = ref('home')
</script>

<template>
    <Tabbar v-model="acvtive" fixed placeholder>
        <TabbarItem name="home" icon="home-o" to="/home">首页</TabbarItem>
        <TabbarItem name="apply" icon="list-switching" to="apply">申报</TabbarItem>
        <TabbarItem name="history" icon="orders-o" to="/history">订单</TabbarItem>
        <TabbarItem name="me" icon="user-o" to="/me">我的</TabbarItem>
    </Tabbar>
</template>