import { ref, onMounted, onUnmounted } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader';

export default function useMap(id, config) {
    const map = ref(null)

    onMounted(() => {
        if (!map.value) {
            AMapLoader.load({
                key: "fbc034c3ebbf5b36b4d926c73adbe92d",
                version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
            })
                .then((AMap) => {
                    map.value = new AMap.Map(id, config || {
                        viewMode: "2D",
                        zoom: 13,
                        center: [114.060842, 22.54459]
                    });
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    })
    onUnmounted(() => {
        let canvas = document.querySelector('canvas.amap-layer')
        if (canvas) {
            let gl = canvas.getContext('webgl')
            gl.canvas.width = 0
            gl.canvas.height = 0
            gl.getExtension('WEBGL_lose_context').loseContext()
        }
        map.value && map.value.destroy()
        map.value = null
    })

    return {
        map
    }
}