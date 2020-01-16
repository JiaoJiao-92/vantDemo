<template>
    <van-tabbar v-model="actIndex" @change="setActiveIndex">
        <van-tabbar-item icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item icon="search">乡镇(街办)</van-tabbar-item>
        <van-tabbar-item icon="friends-o">乡村</van-tabbar-item>
        <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
</template>

<script>
export default {
    props:['active-index'],
    data(){
        return {
            actIndex:0,
        }
    },
    created(){
        this.actIndex = this.activeIndex;
    },
    methods:{
        setActiveIndex(_index){
            if(_index!=this.activeIndex){
                if(_index==0){
                    this.$router.replace({path:"/home"});
                }else if(_index==1){
                    this.$router.replace({path:"/town"});
                }else if(_index==2){
                    this.$router.replace({path:"/cunList"});
                }else if(_index==3){
                    this.$router.replace({path:"/myHome"});
                }
            }
        }
    }
}
</script>

<style>

</style>