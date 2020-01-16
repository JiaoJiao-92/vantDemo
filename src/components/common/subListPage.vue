<template>
<div style="padding-bottom:60px; font-size:14px;">
    <van-list v-model="loading" :finished="finished" van-clearfix @load="getList" v-if="videoList">
        <van-cell v-for="(item,index) in videoList" :key="'item_'+index">
            <p style="font-size:16px; height:30px; line-height:30px; margin:0px;">{{item.name}}</p>
            
            <!-- :poster="item.poster_list.dir+item.poster_list.list['500x280']" -->
            <video :id="'videoItem_'+item.id"  src="" width="100%" height="200" controls></video>
        </van-cell>
    </van-list>
    <van-grid :column-num="2">
        <van-grid-item v-for="(item,index) in newsList" :key="'news_list_'+index" center="false" @click="goDetail(item.id)">
            <van-image :src="item.poster_list.dir+item.poster_list.list['246x138']" width="160" height="90" fill />
            <p class="list-news-title">{{item.name}}</p>
        </van-grid-item>
    </van-grid>
</div>   
</template>

<script>
import {getProgramList,getNewsVideoDetail} from '../js/config'
export default {
    props:['label-id'],
    data(){
        return {
            label:0,
            currPage:1,
            totalPage:1,
            pageSize:100,
            pageList:[],//页面所有数据
            videoList:[],//页面的点播列表数据
            newsList:[],//页面的图文新闻列表
            //list列表加载需要的
            loading: false,
            finished: false,
            error:false,
            playUrlList:[],
        }
    },
    created(){
        this.label = ""+this.labelId;
        console.log("subListPage.vue--id:"+this.label);
    },
    methods:{
        getList(){
            console.log("getList()--this.label:"+this.label);
            getProgramList(this.label,this.currPage,this.pageSize).then(_res=>{
                this.error = false;
                // this.totalPage = Math.ceil(_res.total/this.pageSize);
                this.videoList = [];
                this.newsList = [];
                this.pageList = _res.list;//this.pageList.concat(_res.list);
                console.log("this.pageList.length:"+this.pageList.length);
                this.loading = false;
                this.finished = true;
                for (let i = 0; i < this.pageList.length; i++) {
                    var pItem = this.pageList[i];
                    if(pItem.type==2||pItem.display_type==3){//点播
                        this.videoList.push(pItem);
                        this.getPlayUrl(pItem.id);
                    }else{
                        this.newsList.push(pItem);
                    }
                }
                console.log(this.videoList);
                console.log(this.newsList);
                // if(this.currPage>=this.totalPage){
                //     this.finished = true;
                // }else{
                //     this.currPage +=1;
                // }
            }).catch(err=>{
                this.videoList = [];
                this.newsList = [];
                console.log("getProgramList()--err:"+err);
                this.error = true;
            })   
        },
        //获取播放地址 此处写死
        async getPlayUrl(_id){
            try {
                const res = await getNewsVideoDetail(_id);
                console.log(res);
                if(res.info){
                    var content = res.info.content;
                    content = eval("("+content+")");
                    var url = content.videos[0].video_dest;
                    console.log("res.info.news_id："+res.info.news_id+"--name:"+res.info.title+"--url:"+url);
                    var resId = res.info.news_id;
                    let vObj = document.getElementById('videoItem_'+_id);
                    vObj.src = "http://192.168.36.154/app/fujiao/yearMeeting2019/sucai/video/test.mp4";//url;
                    //vObj.play();
                }else{
                    console.log("playUrl--111error:"+error);
                }
                // console.log(this.playUrlList);
            } catch (error) {
                console.log("playUrl--222error:"+error);
                // this.playUrlList.push({id:_id,url:"http://192.168.36.154/app/fujiao/yearMeeting2019/sucai/video/test.mp4"})
            }
        },
        goDetail(_id){
            //console.log("error===res.info.news_id："+res.info.news_id+"--"+url);
            this.$router.push({path:"/detail",query:{id:_id}});
        }
    },
    computed:{
        // controlUrl(){
        //     return function (_id){
        //         let reUrl = "";
        //         for(let itm in this.playUrlList){
        //             if(itm.id==_id){
        //                 reUrl = itm.url; 
        //                 break;  
        //             }
        //         }
        //         console.log("controlUrl()--_id:"+_id+"==url=="+reUrl);
        //         return reUrl;   
        //     }
        // }
    }

}
</script>

<style>
.list-news-title{
    padding:0px;
    line-height:20px;
    overflow:hidden;
    text-overflow:ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
</style>