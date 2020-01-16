<template>
  <div>
    <div class="home-list" v-if="pageList">
      <p class="home-list-title">乡镇（街办）新闻</p>
      <div v-show="videoUrl!=''" style="position:relative; height:200px;">
        <video  :src="videoUrl" style="width:100%; height:200px;" controls>
        </video>
        <div style="text-align:left; color:#ffffff;padding-left:10px; position:absolute; bottom:0px; font-size:16px;">{{videoTitle}}</div>
      </div>
      <div class="home-hr"></div>
      <div v-for="(videoItem,vIdx) in pageList" :key="'home_video_'+vIdx" :class="videoItem.display_type==0?'home-list-video':''">
        <van-row  @click="chickItem(videoItem.id)" v-if="videoItem.display_type==0"  class="home-item-video"><!-- 图文的 -->
          <van-col span="9" ><van-image width="116" height="78" fit="fill" class="home-list-video-img" :src="videoItem.poster_list.dir+videoItem.poster_list.list['246x138']" /></van-col>
          <van-col span="14" style="text-align:left;">
            <span style="font-size:16px; text-align:left; line-height:24px;">{{videoItem.name}}</span>
            <p style="font-size:12px; text-align:right; color:#aaaaaa;">{{trimVideoTime(videoItem.release_time)}}</p>
            <!-- <van-row>
              <van-col span="14" style="font-size:12px; text-align:left; color:#aaaaaa;">{{videoItem.source}}</van-col>
              <van-col span="10" style="font-size:12px; text-align:right; color:#aaaaaa;">{{trimVideoTime(videoItem.release_time)}}</van-col>
            </van-row> -->
          </van-col>
        </van-row>
      </div>
    </div>
    <menuBar :active-index="1"></menuBar>
  </div>
</template>

<script>
import menuBar from '../common/menuBar';
import {getProgramList,getNewsVideoDetail} from '../js/config';
export default {
   components:{
    menuBar
  },
  data(){
    return {
      pageList:[],
      videoUrl:"",
      videoTitle:"",
    }
  },
  created(){
    this.getList();
  },
  methods:{
    getList(){
       getProgramList("../../../static/data/list_39348.txt",1,100).then(_res=>{
        var list = _res.list;
        for (const item of list) {
          if(item.display_type==3&&this.videoUrl==""){
            this.getVideoInfo(item.id);
          }else if(item.display_type==0){
            this.pageList.push(item);
          }
        }
      }).catch(err=>{
        console.log("getProgramList-error-"+err);
      });
    },
    getVideoInfo(_id){
      this.videoUrl = "默认地址";
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
        console.log("getVideoInfo()--err:"+err);
      });
    },
    chickItem(_id){
      this.$router.push({path:"/detail",query:{id:_id}});
    },
  },
  computed:{
    trimVideoTime(){
      return function(_time){
        return _time.split(" ")[0];
      }
    }
  }
}

</script>

<style scoped>
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
.home-list-video{
  /* width:100%; */
  border-bottom: 1px solid #cccccc;
  padding:10px;
}
</style>