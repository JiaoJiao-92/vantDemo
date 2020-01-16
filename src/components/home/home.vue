<template>
<div>
  <div style="height:200px;position: relative; margin-top:50px;">
     <van-swipe :autoplay="3000" class="home-swiper" @change="swiperChange">
      <van-swipe-item v-for="(swItem, index) in swiperList" :key="'swItem_'+index"  @click="chickItem(swItem.id)">
        <van-image :src="swItem.poster_list.dir+swItem.poster_list.list['500x280']" />
      </van-swipe-item>
    </van-swipe>
    <div class="custom-indicator" slot="indicator">
        {{swiperList[currentIndex]?swiperList[currentIndex].name:""}}
    </div>
  </div>
 
  <van-grid :border="false" :column-num="5"  :gutter="0" clickable class="home-list-icon">
    <van-grid-item v-for="(typeItem,index) in typeList" :key="'typeItem'+index" @click="iconSelect(index)">
      <van-image :src="(typeItem.imgSrc?typeItem.imgSrc:'../../static/images/column0'+index+'.png')" alt="" width="38" height="38" />
      <p class="home-icon-item" style="margin:2px 0px;">
        {{trimName(typeItem.name)}}
      </p>
    </van-grid-item>
  </van-grid>
  <div class="home-hr"></div>
  <div v-if="chooseArea.channelList">
    <p class="home-list-title">直播</p>
    <van-row v-for="(liveItem,vIdx) in chooseArea.channelList"  class="home-list-live" :key="'home_live_'+vIdx">
       <van-col span="9" ><van-image width="116" height="78" fit="fill" class="home-list-video-img" :src="liveItem.imageUrl" /></van-col>
        <van-col span="14" style="text-align:left;">
          <span style="font-size:16px; text-align:left; line-height:40px; font-weight:bold;">{{liveItem.name}}</span>
        </van-col>
    </van-row>
  </div>

  <div class="home-list" v-if="pageList">
    <p class="home-list-title">热门推荐</p>
    <div v-show="videoUrl!=''">
      <p style="text-align:left; padding-left:10px; font-size:16px;">{{videoTitle}}</p>
      <video  :src="videoUrl" style="width:100%; height:200px;" controls>
      </video>
    </div>
    <div v-for="(videoItem,vIdx) in pageList" :key="'home_video_'+vIdx" :class="videoItem.display_type==0?'home-list-video':''">
      <!-- 点播视频的 -->
      <!-- videoItem.display_type:{{videoItem.display_type}} -->
      <van-row  @click="chickItem(videoItem.id)" v-if="videoItem.display_type==0"  class="home-item-video"><!-- 图文的 -->
        <van-col span="9" ><van-image width="116" height="78" fit="fill" class="home-list-video-img" :src="videoItem.poster_list.dir+videoItem.poster_list.list['246x138']" /></van-col>
        <van-col span="14" style="text-align:left;">
          <span class="home-item-name">{{videoItem.name}}</span>
          <van-row>
            <van-col span="14" style="font-size:12px; text-align:left; color:#aaaaaa;">{{videoItem.source}}</van-col>
            <van-col span="10" style="font-size:12px; text-align:right; color:#aaaaaa;">{{trimVideoTime(videoItem.release_time)}}</van-col>
          </van-row>
        </van-col>
      </van-row>
    </div>
  </div>

  <van-popup v-model="areaBoxShow" position="bottom" v-if="areaList.length>0">
      <van-picker show-toolbar :columns="columns" @cancel="areaBoxShow = false" @change="areaChange" @confirm="areaSubmit" :visible-item-count='5'/>
  </van-popup>
  <!-- 顶上的导航栏-先不管 -->
  <van-row  class="home-nav-bar">
    <van-col span="15" offset="1" style="text-align:left;" @click="areaBoxShow = true">{{chooseArea.fullname}}<van-icon name="arrow-down" style="margin-left:5px;"/></van-col>
    <van-col span="4" offset="4" style="text-align:center; font-size:24px;"><van-icon name="weapp-nav" /></van-col>
  </van-row>
  <menuBar :active-index="0"></menuBar>
</div>
</template>

<script>
import {getAreaList,getTypeList,getThirdLink,getProgramList,getNewsVideoDetail} from '../js/config';
import menuBar from '../common/menuBar'
export default {
  components:{
    menuBar
  },
  data () {
    return {
      pageList:[],//页面下方显示的内容 暂时不做下拉刷新
      chooseArea:{},//选择的区域
      swiperList:[],//轮播区域的内容
      typeList:[],//栏目图标
      areaList:[],
      columns:[
        {
          values: [],
          // className: "column1"
        },
        {
          values: [],
          // className: "column2"
        }
      ],
      currentIndex:0,
      areaBoxShow:false,
      areaPos:0,
      videoUrl:"",
      videoTitle:"",
    }
  },
  created(){
    this.getList();
  },
  methods:{
    clearParam(){
      this.videoTitle = "";
      this.videoUrl = "";
      this.typeList = [];
      this.swiperList = [];
      this.pageList = [];
      this.currentIndex = 0;
    },
    setColumnsValue(){
      this.columns[0].values = [];
      this.columns[1].values = [];
      for (let i = 0; i < this.areaList.length; i++) {
          this.columns[0].values.push(this.areaList[i].name);
      }
      for (let i = 0; i < this.areaList[this.areaPos].nodes.length; i++) {
          this.columns[1].values.push(this.areaList[this.areaPos].nodes[i].name);
      }
    },
    getList(){
      console.log("开始请求");
      // 获取区域信息-确定区域才能拿到页面的栏目id获取数据
      getAreaList().then((_res)=>{
        _res = _res.split("citys=")[1];//截取下
        this.areaList = eval("("+_res+")");
        var localLabelId = "33430";
        for (let i = 0; i < this.areaList.length; i++) {
          for(let j=0;j<this.areaList[i].nodes.length;j++){
            const areaObj = this.areaList[i].nodes[j];
            // console.log(areaObj.id+"=="+localLabelId);
            if(areaObj.id==localLabelId){
              this.chooseArea = areaObj;
              this.areaPos = i;
              break;
            }
          }
        }
        this.getPageData();
        this.setColumnsValue();
      }).catch(err=>{
        console.log("getAreaList-error-"+err);
      });
    },
    // 获取页面数据
    getPageData(){
      // 获取一级分类
      getTypeList(this.chooseArea.id).then(_res=>{
          this.typeList = _res.type_list[0].children;
          // 获取第三方链接地址
          getThirdLink().then(_res=>{
            _res = _res.split("thirdWebLinks = ")[1].split(";")[0];
            var thirdList = eval('('+_res+')');
            this.typeList = this.typeList.concat(thirdList);
            console.log("icon请求完成");
          }).catch(err=>{
            console.log("getThirdLink-error-"+err);
          });  
        }).catch(err=>{
          console.log("getTypeList-error-"+err);
      });
      // 获取页面下方数据
      getProgramList(this.chooseArea.id,1,100).then(_res=>{
        this.pageList = _res.list;
        this.swiperList = [];
        for (const item of this.pageList) {
          if(item.display_type==0){
            this.swiperList.push(item);
            if(this.swiperList.length==3){
              break;
            }  
          }
        }
        for (const item of this.pageList) {
          if(item.display_type==3){
            this.getVideoInfo(item.id);
            break;
          }
        }
      }).catch(err=>{
        console.log("getProgramList-error-"+err);
      });
    },
    showScan(){
      //打开扫一扫
    },
    // 显示区域选择
    //swiper上点击进入详情
    chickItem(_id){
      this.$router.push({path:"/detail",query:{id:_id}});
    },
    //首页中间图标的点击-区分进第三方的地址还是进二级列表
    iconSelect(_index){
      if(this.typeList[_index].url){
        window.location.href = this.typeList[_index].url;
      }else{
        this.$router.push({path:'/subList',query:{id:this.typeList[_index].id}});  
      }
    },
    //为了给swiper的title赋值
    swiperChange(index){
      this.currentIndex = index;
    },
    getVideoInfo(_id){
      console.log("getVideoInfo()--id:"+_id);
      getNewsVideoDetail(_id).then(_res=>{
        console.log(_res);
        var content = _res.info.content;
        this.videoTitle = _res.info.title;
        content = eval('('+content+')');
        var url = content.videos[0].video_dest;
        console.log("getVideoInfo()--url:"+url);
        this.videoUrl = "http://192.168.36.154/app/fujiao/yearMeeting2019/sucai/video/test.mp4";
        // this.videoUrl = url;
      }).catch(err=>{
        console.log("getNewsVideoDetail()--err:"+err);
      });
    },
    //区域弹框切换--需要手动改变第二列的值
    areaChange(picker, values,index){
      if(index==0){//选中第一列的时候 需要手动修改第二列的值
        var cList = this.areaList[picker.getColumnIndex(0)].nodes;
        this.columns[1].values = [];
        for (let i = 0; i < cList.length; i++) {
            this.columns[1].values.push(cList[i].name);
        }
        picker.setColumnValues(1,this.columns[1].values);
        picker.setColumnIndex(1,0);//重置第二列的索引
      }
    },
    //区域弹框上点击确定
    areaSubmit(values,index){
      this.clearParam();//手动清空一些值
      console.log("areaSubmit");
      console.log(values);
      console.log(index);
      this.areaBoxShow = false;
      this.areaPos = index[0];
      // picker.setColumnValues(0, values[0]);
      // picker.setColumnValues(1, values[1]);
      this.chooseArea = this.areaList[index[0]].nodes[index[1]];
      this.getPageData();
    }
  },
  computed:{
    trimName(){
      return function(_name){
        if(_name.length>4){
          return _name.substr(0,4)+"..";
        }else{
          return _name;
        }
      }
    },
    trimVideoTime(){
      return function(_time){
        return _time.split(" ")[0];
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-nav-bar{
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 50px;
  background-color: #ffffff;
  font-size: 16px;
  line-height: 50px;
  border-bottom: 1px solid #cccccc;
}
.home-swiper{
  /* position: relative; */
  /* margin-top:50px; */
  height: 200px;
  /* border-bottom: 1px solid #cccccc; */
}
.home-list-icon{
  background-color: #ffffff;
}
.home-icon-item{
  font-size: 12px;
}
.custom-indicator{
  position: absolute;
  bottom: 0px;
  width:100%;
  height:40px;
  line-height: 40px;
  text-align: left;
  font-size: 14px;
  color: #ffffff;
  background: rgba(0, 0, 0, 0.6);  
  overflow:hidden;
  text-overflow:ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.home-list-video-img{
  width: 248px;
  height: 136px;
}
.home-list{
  width: 100%;
  padding-bottom:40px;

}
.home-list-title{
  text-align: left;
  font-weight: bold;
  font-size: 18px;
  padding-left:8px;
  margin-left:10px;
  border-left:2px solid #ff0000;
}
.home-list-videom,.home-list-live{
  border-bottom: 1px solid #cccccc;
  padding:10px;
}
.home-item-name{
  font-size:16px;
  text-align:left;
  line-height:24px;
  overflow:hidden;
  text-overflow:ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
