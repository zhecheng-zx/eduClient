/**
* Created by lifei on 2017/3/30.
*/
<template>
    <div class="article-wrap myAttention-weibo" v-loading="loading" element-loading-text="加载中……">
        <search-box :searchNames=searchNames @searchDataChange="onSearchDataChange" class="dark"></search-box>
        <div class="content dark">
            <div class="content-bar clearfix">
                <div class="content-bar-button">
                    <dropDown @onSaveEvent="onSaveEvent" v-show="eventPermission"></dropDown>
                    <el-button type="primary" icon="plus" @click="cancelAttention">取消关注</el-button>
                </div>
                <div class="content-bar-pagination">
                    <el-pagination class="edu-pagination"
                                   v-initjump='currentPage'
                                   @current-change="handleCurrentChange"
                                   :current-page="currentPage"
                                   :page-size="10"
                                   layout="prev, next, jumper, total"
                                   :total="total">
                    </el-pagination>
                </div>
            </div>
            <el-card class="box-card">
                <el-table :data="tableData" class="tran-table no-col-title yellow-table mt20" stripe border
                          style="width: 100%" :resizable="false" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="50" align="center"></el-table-column>
                    <el-table-column label="排名" align="center" prop="index" width="80">
                        <template scope="scope">
                            <span v-if="scope.row.index == 1">
                                 <i class="icon-rank icon-gold"></i>
                            </span>
                            <span v-else-if="scope.row.index == 2">
                                <i class="icon-rank icon-silver"></i>
                           </span>
                            <span v-else-if="scope.row.index == 3">
                                 <i class="icon-rank icon-copper"></i>
                            </span>
                            {{scope.row.index}}
                        </template>
                    </el-table-column>
                    <el-table-column label="微博号" prop="name" align="center" :show-overflow-tooltip="true">
                        <template scope="scope">
                            <span @click="toCharacterAnalyse(scope.row)" class="character-name">
                                {{scope.row.microblogName}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="发博量" prop="sendCount" align="center"></el-table-column>
                    <el-table-column label="关注量" prop="concernsCount" align="center"></el-table-column>
                    <el-table-column label="粉丝量" prop="fansCount" align="center"></el-table-column>
                    <el-table-column label="转发量" prop="forwardCount" align="center"></el-table-column>
                    <el-table-column label="评论数" prop="replySum" align="center"></el-table-column>
                    <el-table-column label="点赞总数" prop="supportSum" align="center"></el-table-column>
                    <el-table-column label="平均点赞量" prop="supportAvg" align="center"></el-table-column>
                    <el-table-column label="认证状态" prop="authcStatus" align="center" width="110px">
                        <template scope="scope">
                            <span v-if="scope.row.authcStatus == '1'">已认证</span>
                            <span v-if="scope.row.authcStatus == '0'">
                                未认证
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </div>
    </div>
</template>
<style scoped lang="scss">
    .myAttention-weibo {

    .content .content-bar .content-bar-button {
        margin-left: 20px;
    }

    .blue {
        color: #60a3ff;
    }

    }
</style>
<script>
    import searchBox from '../../../components/searchBox/searchBox.vue';
    import dropDown from "../../../components/dropdown/dropdown.vue";

    export default{
        data(){
            return {

                total: 0,
                loading: false,
                param: {
                    pageSize: 10,
                    pageNumber: 0,
                    authcStatus: "",
                    startDate: "",
                    endDate: "",
                    university: [],
                },
                searchNames: ['university', 'verified', 'exactDate'],
                articleData: [],
                curContent: this.$store.state.curContent,
                tableData: [],
                removeParams: {concernsContent: []},
                eventPermission: true
            }
        },
        components: {searchBox, dropDown},
        methods: {
            cancelAttention(){
                this.removeParams.concernsType = 4;
                if (this.removeParams.concernsContent.length == 0) {
                    this.$message("未选择微博");
                    return false;
                }
                this.$http.post("/apis/concerns/removeConcernsMore.json", this.removeParams).then(res => {
                    if (res.data.success) {
                        this.$message("取消关注成功");
                        this.getWeiboData();
                    } else {
                        this.$message(res.data.message);
                    }
                }, err => {
                    console.log(err);
                })
            },
            handleSelectionChange(val){
                this.removeParams.concernsContent = [];
                for (let i = 0; i < val.length; i++) {
                    this.removeParams.concernsContent.push(val[i].microblogName);
                }
            },
            handleCurrentChange(pageNumber) {
                //后台是从0开始
                this.param.pageNumber = pageNumber - 1;
                this.getWeiboData();
            },
            onSearchDataChange(data) {
                this.param.authcStatus = data.verified;
                this.param.university = data.university;
                this.param.startDate = data.startDate;
                this.param.endDate = data.endDate;

                this.param.pageSize = 10;
                this.param.pageNumber = 0;
                this.getWeiboData();
            },
            getWeiboData(){
                this.tableData = [];
                this.loading = true;
                this.$http.post("/apis/concerns/getMicroblogData.json", this.param).then((res) => {
                    if (res.data.success) {
                        if (res.data.data.page) {
                            this.total = res.data.data.page.totalElements > 10000 ? 10000 : res.data.data.page.totalElements;
                            for (var i = 0; i < res.data.data.page.content.length; i++) {
                                res.data.data.page.content[i].index = this.param.pageNumber * this.param.pageSize + i + 1;
                                this.tableData.push(res.data.data.page.content[i])
                            }
                        } else {
                            this.total = 0;
                        }
                    }
                    this.loading = false;
                }, (err) => {
                    console.log(err);
                    this.loading = false;
                })
            },
            toVerified(data){

            },

            onSaveEvent(eventId){
                if (this.removeParams.concernsContent == undefined || this.removeParams.concernsContent.length == 0) {
                    this.$message('没有选中的微博');
                    return
                }

                let param = {
                    eventId: eventId,
                    contents: this.removeParams.concernsContent
                }
                this.$http.post('/apis/eventAnalysis/saveEventWeBo.json', param).then(
                    (response) => {
                        if (response.data.success) {
                            this.$message({
                                title: '成功',
                                message: '添加成功',
                                type: 'success',
                                duration: 2000
                            });
                        } else {
                            this.$message({
                                title: '失败',
                                message: '单个事件不能超过100个微博号',
                                type: 'error',
                                duration: 2000
                            });
                        }
                    }, (response) => {
                        console.error(response);
                    }
                );
            }
        },
        computed: {
            currentPage: function () {
                return this.param.pageNumber + 1;
            }
        },
        created(){

        },
        mounted(){
            this.$nextTick(function () {
                this.getWeiboData();
                this.eventPermission = this.$root.$children[0].$children[0].eventPermission;
            });
        },
    }
</script>