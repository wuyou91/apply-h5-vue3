<script setup>
import { ref, onMounted, reactive } from 'vue'
import { Search, Icon } from 'vant'
import { debounce } from '@/utils/util.js'

const emit = defineEmits(['selectPlace'])
const props = defineProps({
    placeholder: {
        type: String,
        default: "请输入要搜索的位置"
    }
})
const searchValue = ref('')
let valueList = ref([])
const placeSearch = new AMap.PlaceSearch({
    pageSize: 20, // 单页显示结果条数
    pageIndex: 1, // 页码
    city: "深圳", // 兴趣点城市
    citylimit: true,  //是否强制限制在设置的城市内搜索
    extensions: 'all'
})

const valueChange = debounce((val) => {
    if (val) {
        console.log(val)
        placeSearch.search(val, function (state, result) {
            console.log(result)
            if (result?.info === 'OK') {
                valueList.value = result.poiList.pois
            }
        })
    } else {
        valueList.value = []
    }
}, 500)
function select(val) {
    searchValue.value = ''
    valueList.value = []
    emit('selectPlace', val)
}
</script>

<template>
    <div class="place-search">
        <Search v-model="searchValue" @update:model-value="valueChange" :placeholder="props.placeholder" />
        <div class="list" v-show="valueList.length > 0">
            <div class="list-item" v-for="item in valueList" :key="item.id" @click="select(item)">
                <span class="text">{{ item.name }}</span>
                <Icon name="arrow" color="#898989" />
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
@import '@/assets/style/variable.less';

.place-search {
    position: relative;
    --van-search-padding: 0;
    --van-search-content-background: #fff;
    --van-radius-sm: 6px;

    /deep/.van-search {
        border-radius: 6px;
    }
    /deep/ .van-cell{
        margin-bottom: 0;
    }
    /deep/ .van-field__body {
        border: none;
        margin-bottom: 0;
    }
}

.list {
    margin-top: 2px;
    max-height: 260px;
    overflow-y: auto;
    background: #fff;
    .wrapper-box();

    .list-item {
        width: 100%;
        padding: 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .text {
            flex-grow: 1;
            width: 100px;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
            white-space: nowrap;
        }

        i {
            flex-shrink: 0;
        }
    }
}
</style>