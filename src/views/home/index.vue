
<script setup>
import useMap from '@/hoc/useMap';
import { Icon, Popup, Checkbox, CheckboxGroup, Space, showToast, FloatingPanel, showImagePreview, Empty, Loading } from 'vant'
import navTabs from '@/components/navTabs/index.vue'
import placeSearch from '@/components/placeSearch/index.vue'
import { ref } from 'vue'

const anchors = [
  240,
  Math.round(0.6 * window.innerHeight),
];
const { map } = useMap('map-container', null, (e) => {
  getLocation(e.lnglat)
})

const showPopup = ref(false)
const checked = ref([])
const mapType = ref('2d')
const positionDetail = ref(null)
const showLoading = ref(false)

const geocoder = new AMap.Geocoder({
  city: '全国', // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
  extensions: 'all'
})
const geolocation = new AMap.Geolocation()

let marker = null

function getPosition() {
  showLoading.value = true
  geolocation.getCurrentPosition(function (status, result) {
    showLoading.value = false
    if (status == 'complete') {
      getLocation(result.position)
    } else {
      getLocation([114.060842, 22.54459])
    }
  })
}
function getLocation(lngLat) {
  console.log(map.value)
  map.value.setCenter(lngLat, true)
  geocoder.getAddress(lngLat, function (status, result) {
    if (status === 'complete' && result.info === 'OK') {
      // result为对应的地理位置详细信息
      console.log(result.regeocode)
      const poi = {
        ...result.regeocode.pois[0],
        address: result.regeocode.formattedAddress
      }
      positionDetail.value = poi
      setMarker({
        ...poi,
        location: lngLat
      })
    }
  })
};

function selectPlace(val) {
  setMarker(val)
  map.value.setCenter(val.location, true)
  positionDetail.value = val
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

function showBigImg(index) {
  const images = positionDetail.value.photos.map(item => item.url)
  showImagePreview({
    images,
    startPosition: index
  })
}
</script>

<template>
  <div class="map-home">
    <Popup v-model:show="showPopup" position="right" :lazy-render=false>
      <div class="popup-box">
        <div class="area">
          <div class="title">地图类型</div>
          <div class="contain fl">
            <div class="item" :class="{ active: mapType === '2d' }" @click="() => mapType = '2d'">
              <img src="/img/legend_mapType.png" alt="">
              <p>2d</p>
            </div>
            <div class="item" :class="{ active: mapType === '3d' }" @click="() => mapType = '3d'">
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
    <div id="map-container" class="map-wrapper">
      <div class="loading" v-show="showLoading">
        <Loading color="#1989fa" vertical>加载中...</Loading>
      </div>
      <div class="toolWrapper">
        <div class="tool" @click="() => showPopup = true">
          <Icon name="/svg/fold.svg" size="24" />
        </div>
        <div class="tool" @click="getPosition()">
          <Icon name="/svg/location.svg" size="24" />
        </div>
      </div>
    </div>
    <FloatingPanel :anchors="anchors">
      <div class="position-detail" v-if="positionDetail">
        <div class="text">
          <div class="name">{{ positionDetail.name }}</div>
          <div class="type">{{ positionDetail.type }}</div>
          <div class="addr">{{ (positionDetail.cityname || '') + (positionDetail.adname || '') + positionDetail.address }}
          </div>
          <div class="type" v-show="positionDetail.tel">{{ positionDetail.tel }}</div>
        </div>
        <div class="photos" v-show="positionDetail.photos?.length">
          <img :src="item.url" alt="" v-for="(item, index) in positionDetail.photos" @click="showBigImg(index)">
        </div>
      </div>
      <div v-else>
        <Empty description="暂无数据" />
      </div>
      <div class="van-safe-area-bottom"></div>
    </FloatingPanel>
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
    height: calc(100vh - 230px);

    .loading {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 2;
      display: flex;
      justify-content: center;
      align-items: center;
    }
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

    .fl {
      display: flex;

      .item {
        margin-top: 10px;
        margin-right: 10px;

        img {
          width: 80px;
          display: block;
          box-sizing: border-box;
          border-radius: 6px;
        }

        p {
          text-align: center;
        }
      }

      .active {
        img {
          border: 1px solid #313131;
        }
      }
    }
  }
}

.position-detail {
  padding: 10px 15px 60px;

  .text {
    margin-bottom: 10px;
    font-size: 14px;
    color: #999;

    .name {
      color: #313131;
      font-size: 16px;
      font-weight: bold;
    }
  }

  .photos {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-right: -10px;

    img {
      width: 120px;
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
}
</style>