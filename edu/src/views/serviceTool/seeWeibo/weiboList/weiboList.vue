/**
* Created by zhangxin on 2017/3/27.
*/
<template>
    <div class="seeWeibo" id="seeWeibo" v-loading="loading" element-loading-text="加载中……">
        <el-tabs v-model="activeName" class="custom-tabs left-tabs" @tab-click="handleClick">
            <el-tab-pane label="微博统计" name="todayHot">
                <div id="search_container" class="search_container">
                    <search-box :searchNames=searchNames @searchDataChange="onSearchDataChange" class="dark"></search-box>
                </div>
                <div class="clearfix btn-box">
                    <!--<div class="pull-left">-->
                        <!--<el-button type="primary" @click="verifyWeibo">微博认证</el-button>-->
                    <!--</div>-->
                    <div class="pull-right content-bar-page">
                        <el-pagination class="edu-pagination"
                                       @current-change="handleCurrentChange1"
                                       :current-page="statisticsParam.pageNumber + 1"
                                       :page-size="15"
                                       layout="prev, next, jumper, total"
                                       :total="total1">
                        </el-pagination>
                    </div>
                </div>
                <el-card class="box-card">
                    <el-table :data="weiboStatisticsData" :resizable="false" stripe style="width: 100%" border class="tran-table no-col-title yellow-table">
                        <el-table-column width="70" label="序号" align="center" prop="rank"></el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="blogNickname" label="微博号" align="center"></el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="responsibleUser" label="负责人" align="center"></el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="responsibleEmail" label="负责人邮箱" align="center"></el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="responsibleTel" label="负责人电话" align="center"></el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="publishUser" label="发布人" align="center"></el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="publishEmail" label="发布人邮箱" align="center"></el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="publishTel" label="发布人电话" align="center"></el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="authcStatus" label="认证情况" align="center" width="110">
                            <template scope="scope">
                                <span v-if="scope.row.authcStatus == '1'" @click="editWeibo(scope.row)" class="pointer">已认证</span>
                                <span v-else @click="editWeibo(scope.row)" class="pointer">
                                    未认证
                                </span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="微博指数" name="weekHot">
                <div id="search_container1" class="search_container">
                    <search-box :searchNames=searchNames1 @searchDataChange="onSearchDataChange" class="dark"></search-box>
                </div>
                <div class="btn-box clearfix">
                    <div class="pull-left">
                        <el-button type="primary" @click="batchConcerned">批量关注</el-button>
                        <!--<el-button type="primary" @click="verifyWeibo">微博认证</el-button>-->
                    </div>
                    <div class="pull-right content-bar-page">
                        <el-pagination class="edu-pagination"
                                       @current-change="handleCurrentChange2"
                                       :current-page="hotParam.pageNumber + 1"
                                       :page-size="15"
                                       layout="prev, next, jumper, total"
                                       :total="total2">
                        </el-pagination>
                    </div>
                </div>
                <el-card class="box-card">
                    <el-table :data="tableData" class="tran-table no-col-title yellow-table" stripe border style="width: 100%" :resizable="false" @selection-change="handleSelectionChange"> 
                        <el-table-column type="selection" width="50px" align="center"></el-table-column>
                        <el-table-column label="排名" align="center" width="110px">
                            <template scope="scope">
                                <span v-if="scope.row.rank == 1">
                                     <i class="icon-rank icon-gold"></i>
                                </span>
                                <span v-else-if="scope.row.rank == 2">
                                    <i class="icon-rank icon-silver"></i>
                               </span>
                                <span v-else-if="scope.row.rank == 3">
                                     <i class="icon-rank icon-copper"></i>
                                </span>
                                {{scope.row.rank}}
                            </template>
                        </el-table-column>
                        <el-table-column label="微博号" prop="author" align="center" :show-overflow-tooltip="true">
                            <template scope="scope">
                                <span @click="toWeiboDetail(scope.row)" class="character-name">
                                    {{scope.row.author}}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column label="发博量" prop="sendCount" align="center" width="110px"></el-table-column>
                        <el-table-column label="关注量" prop="concernsCount" align="center" width="110px"></el-table-column>
                        <el-table-column label="粉丝量" prop="fansCount" align="center" width="110px"></el-table-column>
                        <el-table-column label="转发量" prop="forwardCount" align="center" width="110px"></el-table-column>
                        <el-table-column label="评论数" prop="replySum" align="center" width="110px"></el-table-column>
                        <el-table-column label="点赞总数" prop="supportSum" align="center" width="110px"></el-table-column>
                        <el-table-column label="平均点赞量" prop="supportAvg" align="center" width="110px"></el-table-column>
                        <el-table-column label="认证状态" prop="authcStatus" align="center">
                            <template scope="scope">
                                <span v-if="scope.row.authcStatus == '1'">已认证</span>
                                <span v-else>未认证</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<style lang="scss" scoped>
    .seeWeibo{
            .search_container{
                padding: 15px 0 1px;
                background-color: #141725;
            }
            .btn-box{
            /*为了和右侧分页在同行 so 加了margin-top*/
                .pull-left{
                    margin-top: 25px;
                    margin-left: 20px;
                }
            }
         .mt20{margin-top: 20px;}
            .character-name{
                cursor: pointer;
            }
            .blue{
                color: #60a3ff;
            }
    }
</style>
<script>
    import searchBox from  './../../../../components/searchBox/searchBox.vue';
    import "vue-style-loader!css-loader!sass-loader!../../../../assets/css/tabs/tabs.scss";
    export default{
        data(){
            return {
                activeName: 'todayHot',
                weiboStatisticsData: [],
                searchNames: ['verified'],
                searchNames1: ['selectDate'],
                tableData:　[],
                hotParam: {
                    pageSize: 15,
                    pageNumber: 0,
                    authcStatus: '',
                    startDate: new Date(Date.now() - 8.64e7 * 7).format('yyyy-MM-dd 00:00:00'),
                    endDate: new Date(Date.now() - 8.64e7).format('yyyy-MM-dd 23:59:59')
                },
                statisticsParam: {
                    pageSize: 15,
                    pageNumber: 0,
                    authcStatus: '',
                },
                loading:true,
                multipleSelection:{},
                total1: 0,
                total2: 0
            }
        },
        components:{searchBox} ,
        methods:{
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"业务平台",to:{path:"/home/seeWeibo"}
                    },
                    {
                        name:"微博监测"
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },
            handleClick(event) {
                if(event.index == 0){
                    //微博统计tab页，请求对应数据
                    this.getWeiboStatisticsData();
                }else{
                    //微博指数tab页，请求对应数据
                    this.getWeiboHotArticleList();
                }
            },
            onSearchDataChange(data) {
                data.pageSize = 15;
                data.pageNumber = 0;
                if(data.verified == '全部'){
                    data.verified = '';
                }
                //根据tab页当前状态 判断请求的是微博指数还是微博统计的后台
                if($('#seeWeibo .el-tabs__nav .el-tabs__item:eq(0)').hasClass('is-active')){
                    if(data.verified == '未认证'){
                        data.verified = 0;
                    }else if(data.verified == '已认证'){
                        data.verified = 1;
                    }
                    this.statisticsParam = data;
                    this.statisticsParam.authcStatus = data.verified;
                    this.getWeiboStatisticsData();
                }else{
                    this.hotParam = data;
                    if(data.endDate != null){
                        let endDate = new Date(data.endDate).getTime();
                        this.hotParam.startDate = new Date(endDate - 8.64e7 * 7).format('yyyy-MM-dd 00:00:00');
                    }
                    this.getWeiboHotArticleList();
                }
            },
            toWeiboDetail(data){
                data.startDate = this.hotParam.startDate;
                data.endDate = this.hotParam.endDate;
                this.$router.push({path:"/home/weiboDetail", query: data});
            },
            toVerified(data){
                this.$router.push({path: "/home/weiboVerify", query: data});
            },
            //微博指数数据获取
            getWeiboHotArticleList(){
                this.loading = true;
                this.$http.post('/apis/businessTool/getMicroblogIndexData.json', this.hotParam).then(
                    (response) => {
                        if(response.data.success){
                            this.loading = false;
                            if(response.data.data != null && response.data.data.page != null){
                                let content = response.data.data.page.content;
                                for(var i = 0; i < content.length; i++){
                                    content[i].rank = (this.hotParam.pageNumber) * this.hotParam.pageSize +  i + 1;
                                }
                                this.tableData = content;
                                this.total2 = response.data.data.page.totalElements;
                            }
                        }
                    }
                )
            },
            //微博统计数据获取
            getWeiboStatisticsData(){
                this.loading = true;
                this.$http.post('/apis/businessTool/getMicroblogData.json', this.statisticsParam).then(
                    (response) => {
                        this.loading = false;
                        if(response.data.success && response.data.data != null){
                            let data = response.data.data.content;
                            if(data != null && data.length > 0){
                                for(let i = 0; i <　data.length; i++){
                                    data[i].rank = (this.statisticsParam.pageNumber) * this.statisticsParam.pageSize +  i + 1;
                                }
                            }
                            this.weiboStatisticsData = data;
                            this.total1 = response.data.data.totalElements;
                        }
                    }
                )
            },
            verifyWeibo(){
                this.$router.push({path: "/home/weiboVerify"});
            },
            batchConcerned(){
                 if(this.multipleSelection.concernsContent == undefined || this.multipleSelection.concernsContent.length == 0){
                this.$message("未选择微博号")
                return false;
               }
                if(this.multipleSelection.concernsContent.length>0){
                   this.$http.post("/apis/concerns/saveConcernsMore.json",this.multipleSelection).then(res => {
                    if(res.data.success){
                        this.$message({
                            type: 'success',
                            message: '关注成功'
                        })
                    }else{
                        this.$message.error('关注失败');
                    }
                   },(err)=>{
                        console.log(err);
                   })
                }else{
                    this.$message("未选择微博号”")
                }
            },
             handleSelectionChange(val) {
               this.multipleSelection.concernsType = 4; 
               this.multipleSelection.concernsContent = [];
               for (var i = 0; i < val.length; i++) {
                   this.multipleSelection.concernsContent.push(val[i].microblogName)
               }
            },

            handleCurrentChange1(pageNumber){
                this.statisticsParam.pageNumber = pageNumber - 1;
                this.getWeiboStatisticsData();
            },
            handleCurrentChange2(pageNumber){
                this.hotParam.pageNumber = pageNumber - 1;
                this.getWeiboHotArticleList();
            },
            editWeibo(data){
                let id = data.id;
                this.$router.push({path: "/home/weiboVerify", query: {id: id}});
            }
        },
        created(){
            this.setBreadCrumb();
            this.getWeiboStatisticsData()
        },
        mounted(){

        }
    }
</script>