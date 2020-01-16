<template>
<div class="sublist-page">
  <van-tabs @change="typeChange" v-model="titleActive" title-inactive-color="#fa6603" color="#fa6603" title-active-color="#fa6603" line-width="100">
      <van-tab  v-for="(tItem,index) in typeList" :title="tItem.name" :key="'tItem_'+index" class="list-type-title">
        <div v-if="tItem.children" class="sublit-sub-ype">
          <van-tabs @change="subTypeChange" v-model="subTitleActive" title-inactive-color="#fa6603" color="#fa6603" line-height="2" title-active-color="#fa6603" line-width="100">
            <van-tab  v-for="(cItem,cIndex) in tItem.children" :title="cItem.name" :key="'cItem'+cIndex" class="list-type-title">
              <!-- 子栏目{{cItem.id}} -->
              <subListPage :label-id="cItem.id"></subListPage>
            </van-tab>
          </van-tabs>
        </div>
        <div v-else>
          <!-- 直接栏目{{tItem.id}} -->
          <subListPage :label-id="tItem.id"></subListPage>
        </div>
      </van-tab>
    </van-tabs>
</div>
</template>

<script scoped>
import subListPage from '../common/subListPage'
import {getTypeList} from '../js/config'
export default {
  components:{
    subListPage
  },
  data () {
    return {
      titleActive:0,
      typeList:[],
      typeLabel:0,
      subTitleActive:0,
    }
  },
  created(){
    this.typeLabel = this.$route.query.id;
    //测试id
    // this.typeLabel = '33432';//只有一层栏目
    this.typeLabel = '33436';//有两层栏目
    this.getType();
  },
  methods:{
    getType(){
      getTypeList(this.typeLabel).then(_res=>{
        this.typeList = _res.type_list[0].children;
        console.log(this.typeList);
      }).catch(_err=>{
        console.log("getTypeList()--error:"+_err);
      });
    },
    typeChange(_index,_title){
      this.subTitleActive = 0;//一级切换的时候 将二级下标归零
    },
    subTypeChange(_index,_title){

    }
  }
}
</script>

<style scoped>
.van-tab >>> .van-ellipsis{
  font-size:18px !important;
}
.list-type-title{
  font-size:20px;
  height: 40px;
  line-height: 40px;
}
.sublit-sub-ype{
  text-align: left;
}
</style>
