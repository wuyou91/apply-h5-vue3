import { ref, onMounted, onUnmounted } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader';

export default function useMap(id, config, onclick) {
    const map = ref(null)

    onMounted(() => {
        if (!map.value) {
            map.value = new AMap.Map(id, config || {
                viewMode: "2D",
                zoom: 13,
                center: [114.060842, 22.54459]
            });
            map.value.on('click', e => {
                onclick && onclick(e)
            })
            const scale = new AMap.Scale({
                visible: true,
                position: {
                    bottom: '20px',
                    right: '65px'
                }
            })
            map.value.addControl(scale)
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