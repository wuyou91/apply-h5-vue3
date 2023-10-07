
<script setup>
import useMap from '@/hoc/useMap';
import { Icon, Popup, Checkbox, CheckboxGroup, Space, showToast } from 'vant'
import navTabs from '@/components/navTabs/index.vue'
import placeSearch from '@/components/placeSearch/index.vue'
import { ref } from 'vue'

const { map } = useMap('map-container')

const showPopup = ref(false)
const checked = ref([])
const mapType = ref('2d')

let marker = null

function getLocation() {
  marker && map.value.remove(marker)
  map.value.setCenter([114.060842, 22.54459], true)
};

function selectPlace(val) {
  setMarker(val)
  map.value.setCenter(val.location, true)
};

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
      label: {
        content: item.name,
        direction: 'top',
        offset: [0, -4]
      },
      map: map.value,
      position: item.location
    })
    map.value.add(marker)
  }
};

function change(e) {
  if (e.length <= 0) return
  const str = e.join()
  showToast('已选择：' + str)
}
</script>

<template>
  <div class="tab-page map-home">
    <Popup v-model:show="showPopup" position="right" :lazy-render=false>
      <div class="popup-box">
        <div class="area">
          <div class="title">地图类型</div>
          <div class="contain fl">
            <div class="item" :class="{active : mapType === '2d'}" @click="() => mapType ='2d'">
              <img src="/img/legend_mapType.png" alt="">
              <p>2d</p>
            </div>
            <div class="item" :class="{active : mapType === '3d'}" @click="() => mapType ='3d'">
              <img src="/img/legend_mapType.png" alt="">
              <p>3d</p>
            </div>
          </div>
        </div>
        <div class="area">
          <div class="title">区域类型</div>
          <div class="contain">
            <CheckboxGroup v-model="checked" @change="change">
              <Space direction="vertical">
                <Checkbox name="商业区">商业区</Checkbox>
                <Checkbox name="住宅区">住宅区</Checkbox>
                <Checkbox name="管制区">管制区</Checkbox>
              </space>
            </CheckboxGroup>
          </div>
        </div>
      </div>

    </Popup>
    <div class="search">
      <placeSearch @selectPlace="selectPlace" />
    </div>
    <div id="map-container" class="main map-wrapper">
      <div class="toolWrapper">
        <div class="tool"  @click="() => showPopup = true">
          <Icon name="/svg/fold.svg" size="24" />
        </div>
        <div class="tool" @click="getLocation">
          <Icon name="/svg/location.svg" size="24" />
        </div>
      </div>
    </div>
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

  .map-wrapper {
    position: relative;
    width: 100%;
    height: 100px;
  }

  .toolWrapper {
    position: absolute;
    display: flex;
    flex-direction: column;
    right: 15px;
    bottom: 20px;
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
}

.popup-box {
  min-width: 220px;
  height: 100vh;
  background: #fff;
  box-sizing: border-box;

  .area {
    font-size: 16px;
    line-height: 32px;
    margin-bottom: 10px;

    .title {
      padding: 0 12px;
      background: #f5f6fa;
    }

    .contain {
      padding: 0 12px;
    }
    .fl{
      display: flex;
      .item{
        margin-top: 10px;
        margin-right: 10px;
        img{
          width: 80px;
          display: block;
          box-sizing: border-box;
          border-radius: 6px;
        }
        p{
          text-align: center;
        }
      }
      .active{
        img{
          border: 1px solid #313131;
        }
      }
    }
  }
}
</style>