<template>
  <div style="padding:10px 20px;">
      <div style="padding-bottom:20px;border-bottom:1px solid #cccccc;">
          <p style="line-height:30px; margin:0px 0px 10px 0px; font-size:16px; padding:0px; font-weight:bold;">
              {{pageContent.title}}
          </p>
          <span style="display:block; float:left; font-size:12px; color:#cccccc;">来源:{{pageContent.source}}</span>
          <span style="display:block; float:right; font-size:12px; color:#cccccc;">发布日期:{{pageContent.release_time}}</span>
      </div>
      <div v-html="pageContent.content" style="text-align:left; font-size:14px; line-height:20px;">{{pageContent.content}}</div>
  </div>
</template>

<script>
import {getNewsDetail} from '../js/config'
export default {
    data(){
        return {
            detailId:0,
            pageContent:{},
        }
    },
    created(){
        this.detailId = this.$route.query.id;
        console.log("this.detailId:"+this.detailId);
        getNewsDetail(this.detailId).then(_res=>{
            console.log(_res.info);
            this.pageContent = _res.info;
        }).catch(err=>{
            console.log("getNewsDetail()--err:"+err);
        })
    },
    methods:{

    }
}
</script>

<style>

</style>