<script setup>
import { reactive, ref } from 'vue'
import { Button, Form, Field } from 'vant';
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const formData = reactive({
    email: '',
    name: '',
    password: ''
})
const form = ref(null)

function submit() {
    form.value.validate().then(res => {
        router.push('/')
    }).catch(err => {
        console.log(err)
    })
}
</script>

<template>
    <div class="register">
        <Form ref="form">
            <Field name="name" v-model="formData.name" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
            <Field name="email" v-model="formData.email" placeholder="邮箱" :rules="[{ required: true, message: '请填写邮箱' }]" />
            <Field name="password" v-model="formData.password" placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]" />
        </Form>
        <Button type="primary" block @click="submit">注册</Button>
    </div>
</template>

<style lang="less" scoped>
.register {
    padding: 12px;
    padding-top: 30px;
}
</style>