
<script setup>
import useMap from '@/hoc/useMap';
import {Icon} from 'vant'
import navTabs from '@/components/navTabs/index.vue'

const { map } = useMap('map-container')
function getLocation() {
  map.value.setCenter([114.060842, 22.54459], false, 150)
}
</script>

<template>
  <div class="map-home">
    <div class="toolWrapper">
      <div class="tool"><Icon name="/svg/fold.svg" size="24" /></div>
      <div class="tool" @click="getLocation"><Icon name="/svg/location.svg" size="24" /></div>
    </div>
    <div id="map-container" class="map-wrapper"></div>
    <navTabs active="home" />
  </div>
</template>

<style lang="less" scoped>
.map-home {
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;

  .toolWrapper {
    position: absolute;
    display: flex;
    flex-direction: column;
    right: 10px;
    bottom: 80px;
    z-index: 2;

    .tool {
      width: 32px;
      height: 32px;
      margin-top: 8px;
      background: #fff;
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }

  .map-wrapper {
    width: 100%;
    height: 100px;
    flex-grow: 1;
  }
}
</style>