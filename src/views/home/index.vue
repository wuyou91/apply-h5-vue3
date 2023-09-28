
<script setup>
import { ref } from 'vue'
import useMap from '@/hoc/useMap';
import { Icon, Search } from 'vant'
import navTabs from '@/components/navTabs/index.vue'
import placeSearch from '@/components/placeSearch/index.vue'

const { map } = useMap('map-container')

let marker = null

function getLocation() {
  map.value.remove(marker)
  map.value.setCenter([114.060842, 22.54459], false, 150)
}
function selectPlace(val) {
  setMarker(val)
  map.value.setCenter(val.location, false, 150)
}
function setMarker(item) {
  if (marker) {
    marker.setPosition(item.location)
    marker.setLabel({
      content: item.name,
      direction: 'top',
      offset: [0, -4]
    })
    map.value.add(marker)
  } else {
    marker = new AMap.Marker({
      label:{
        content: item.name,
        direction: 'top',
        offset: [0, -4]
      },
      map: map.value,
      position: item.location
    })
    map.value.add(marker)
  }
}
</script>

<template>
  <div class="tab-page map-home">
    <div class="search">
      <placeSearch @selectPlace="selectPlace" />
    </div>
    <div class="toolWrapper">
      <div class="tool">
        <Icon name="/svg/fold.svg" size="24" />
      </div>
      <div class="tool" @click="getLocation">
        <Icon name="/svg/location.svg" size="24" />
      </div>
    </div>
    <div id="map-container" class="main map-wrapper"></div>
    <navTabs />
  </div>
</template>

<style lang="less" scoped>
.map-home {
  position: relative;

  .search {
    position: absolute;
    top: 10px;
    left: 15px;
    right: 15px;
    z-index: 2;
  }

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
  }
}
</style>