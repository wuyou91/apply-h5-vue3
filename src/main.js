import './assets/style/main.less'
import AMapLoader from '@amap/amap-jsapi-loader';
import { h, createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vant/lib/index.css'; // 引入vant组件样式
import App from './App.vue'
import router from './router'

window._AMapSecurityConfig = {
    securityJsCode: '40327ef36158a366822b03aa1a3de00e',
}

const app = createApp(App)

app.use(createPinia())
app.use(router)

AMapLoader.load({
    key: "fbc034c3ebbf5b36b4d926c73adbe92d",
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [
        "AMap.Scale",
        "AMap.GeoJSON",
        'AMap.Geolocation',
        'AMap.Geocoder',
        'AMap.PlaceSearch',
        "AMap.RectangleEditor",
        "AMap.CircleEditor",
        "AMap.PolygonEditor",
        "AMap.Weather",
        "AMap.TileLayer"
    ], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
}).then(AMap => {
    app.mount('#app')
}).catch(err => {
    console.log(err)
    const app = h('div', { style: { color: 'red', fontSize: '18px' } }, '地图加载出错，请刷新重试')
    createApp(app).mount('#app')
})


