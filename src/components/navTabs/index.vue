<script setup>
import { Tabbar, TabbarItem } from 'vant';
const props = defineProps({
    active: String
})
</script>

<template>
    <Tabbar route fixed placeholder>
        <TabbarItem icon="wap-home-o" to="/home">首页</TabbarItem>
        <TabbarItem icon="list-switching" to="/apply">申报</TabbarItem>
        <TabbarItem icon="orders-o" to="/record">订单</TabbarItem>
        <TabbarItem icon="user-o" to="/user">我的</TabbarItem>
    </Tabbar>
</template>