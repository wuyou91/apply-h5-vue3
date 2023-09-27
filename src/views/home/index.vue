
<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader';

let map = null

onMounted(() => {
  initMap()
})
onBeforeUnmount(() => {
  map?.destroy()
})
function initMap() {
  AMapLoader.load({
    key: "fbc034c3ebbf5b36b4d926c73adbe92d",
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
    .then((AMap) => {
      map = new AMap.Map("map-container", {
        viewMode: "2D", // 是否为3D地图模式
        zoom: 13, // 初始化地图级别
        center: [114.060842,22.54459] // 初始化地图中心点位置
      });
    })
    .catch((e) => {
      console.log(e);
    });
}
</script>

<template>
  <div class="map-home">
    <div id="map-container" class="map-wrapper"></div>
  </div>
</template>

<style lang="less" scoped>
.map-home {
  width: 100%;
  height: 100vh;

  .map-wrapper {
    width: 100%;
    height: 100%;
  }
}
</style>