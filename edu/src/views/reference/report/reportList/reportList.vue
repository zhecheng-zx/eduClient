/**
* Created by zhangxin on 2017/3/17.
*/
<template>
    <div class="report" v-loading="loading" element-loading-text="加载中……">
        <div class="edu-tabs">
            <el-row :gutter="10">
                <el-col :span="4" :offset="8">
                    <div class="tab-item blue" @click="openBriefDialog()">
                        制作简报
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="tab-item blue" @click="openReferenceDialog()">
                        制作内参报告
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="content-wrap">
            <el-tabs v-model="activeName" class="custom-tabs" @tab-click="handleClick">
                <el-tab-pane label="简报" name="briefReport">
                    <div class="briefReport-list list-div">
                        <div class="item" v-for="item in briefData">
                            <div class="title">{{item.title}}</div>
                            <div class="date">
                                <span class="beginDate">{{item.startDate.substring(0, 10).split('-').join('/')}}</span>
                                &nbsp;- &nbsp;
                                <span class="endDate">{{item.endDate.substring(0, 10).split('-').join('/')}}</span>
                            </div>
                            <div class="btn-area">
                                <el-button type="primary" size="small" @click="viewBriefReport(item)">预览</el-button>
                                <el-button type="primary" size="small" @click="deleteBriefReport(item.id)">删除</el-button>
                                <el-button type="primary" size="small" @click="downloadReport(item.id)">下载</el-button>
                            </div>
                        </div>
                    </div>
                    <div class="page-bar">
                        <el-pagination class="edu-pagination"
                                       @current-change="handleBriefPageChange"
                                       :current-page="briefParam.pageNumber + 1"
                                       :page-size="briefParam.pageSize"
                                       layout="prev, next, jumper, total"
                                       :total="briefTotal">
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="内参报告" name="referenceReport">
                    <div class="referenceReport-list list-div">
                        <div class="item" v-for="item in referenceData">
                            <div class="title">{{item.title}}</div>
                            <div class="date">
                                <span class="beginDate">{{item.startDate.substring(0, 10).split('-').join('/')}}</span>
                                &nbsp;- &nbsp;
                                <span class="endDate">{{item.endDate.substring(0, 10).split('-').join('/')}}</span>
                            </div>
                            <div class="btn-area">
                                <el-button type="primary" size="small" @click="viewRefReport(item)">预览</el-button>
                                <el-button type="primary" size="small" @click="deleteRefReport(item.id)">删除</el-button>
                                <el-button type="primary" size="small" @click="downloadReport(item.id)">下载</el-button>
                            </div>
                        </div>
                    </div>
                    <div class="page-bar">
                        <el-pagination class="edu-pagination"
                                       @current-change="handleRefPageChange"
                                       :current-page="referenceParam.pageNumber + 1"
                                       :page-size="referenceParam.pageSize"
                                       layout="prev, next, jumper, total"
                                       :total="referenceTotal">
                        </el-pagination>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <el-dialog :visible.sync="briefFormVisible" @close="closeDialog('briefForm')" title="制作简报">
            <el-form :model="briefForm" ref="briefForm" class="edu-form small-form" :rules="briefRules">
                <el-form-item label="开始时间" :label-width="formLabelWidth" prop="startDate">
                    <el-date-picker type="date" placeholder="选择开始日期" v-model="briefForm.startDate" style="width: 100%;"></el-date-picker>
                </el-form-item>
                </el-form-item>
                <el-form-item label="截止时间" :label-width="formLabelWidth" prop="endDate">
                    <el-date-picker type="date" placeholder="选择结束日期" v-model="briefForm.endDate" style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog('briefForm')">取 消</el-button>
                <el-button type="primary" @click="saveBriefReport('briefForm')">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog :visible.sync="refFormVisible" @close="closeDialog('refForm')" title="制作内参报告">
            <el-form :model="refForm" ref="refForm" class="edu-form refForm" :rules="refRules">
                <el-form-item label="起止时间：" :label-width="formLabelWidth" class="half-form-item" prop="startDate">
                    <el-date-picker type="date" placeholder="选择开始日期" v-model="refForm.startDate" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="-" :label-width="shortFormLabelWidth" class="half-form-item right" prop="endDate">
                    <el-date-picker type="date" placeholder="选择结束时间" v-model="refForm.endDate" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="选择数据区域：" :label-width="formLabelWidth" prop="ministries">
                    <el-row>
                        <el-col :span="24">
                            部委省厅
                        </el-col>
                    </el-row>
                    <el-row>
                       <el-col :span="24">
                           <el-select v-model="refForm.ministries" multiple placeholder="请选择部委省厅">
                               <el-option v-for="item in allArea" :key="item.value" :label="item.text" :value="item.value">
                               </el-option>
                           </el-select>
                       </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="" :label-width="formLabelWidth" prop="colleges">
                    <el-row>
                        <div class="el-col" :span="24">高校</div>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-select multiple v-model="refForm.colleges" placeholder="请选择大学名称">
                                <el-option-group
                                        v-for="group in allCollege"
                                        :key="group.label"
                                        :label="group.label">
                                    <el-option
                                            v-for="item in group.options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-option-group>
                            </el-select>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="关键字：" :label-width="formLabelWidth" prop="keyWords">
                    <el-input v-model="refForm.keyWords" placeholder="多个关键字用英文“,”隔开"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="closeDialog('refForm')">取 消</el-button>
                <el-button type="primary" @click="saveRefReport('refForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style lang="scss" scoped>
    .report{
        .content-wrap{
            background: #21273d;
            margin-top: 10px;

            .list-div{
                font-size: 0;
                min-height: 500px;

                .item{
                    display: inline-block;
                    width: calc((100% - 100px) / 5);
                    height: 200px;
                    border: 1px solid #eee;
                    text-align: center;
                    margin: 10px;
                    vertical-align: middle;

                    .title{
                        font-size: 18px;
                        font-weight:bold;
                        height: 90px;
                        line-height: 90px;
                    }

                    .date{
                        font-size: 14px;
                        height: 20px;
                        line-height: 20px;
                    }

                    .btn-area{
                        height: 90px;
                        line-height: 90px;
                    }
                }
            }

            .page-bar{
                margin-bottom: 20px;
            }
        }
    }

    .small-form{
        width: 400px;
        margin:auto;
    }
    
    .refForm{
        font-size: 0;

        .line{
            text-align: center;
        }

        .half-form-item{
            width: 50%;
            display: inline-block;
        }
    }
</style>
<script>
    import schools from "../../../../school.json";
    import provinces from "../../../../province.json";
    export default{
        data(){
            var checkBriefDate = (rule, value, callback) =>{
                if(!value){
                    return callback(new Error('请选择结束日期'));
                }

                var startDate = this.briefForm.startDate;
                if(!startDate){
                    return callback();
                }
                if(startDate > value){
                    return callback(new Error('开始日期不能大于结束日期'));
                }
                return callback();
            };
            var checkRefDate = (rule, value, callback) =>{
                if(!value){
                    return callback(new Error('请选择结束日期'));
                }

                var startDate = this.refForm.startDate;
                if(!startDate){
                    return callback();
                }
                if(startDate > value){
                    return callback(new Error('开始日期不能大于结束日期'));
                }
                return callback();
            };
            var validAreaLength =(rule, value, callback) =>{
                if(!value){
                    return callback(new Error('请选择部委省厅'));
                }
                if(value.length >　20){
                    return callback(new Error('最多只能选择20个部委省厅'));
                }
                return callback();
            };
            var validCollegeLength = (rule, value, callback) =>{
              if(!value){
                  return callback(new Error('请选择高校'));
              }
              if(value.length > 20){
                  return callback(new Error('最多只能选择20所高校'));
              }
              callback();
            };
            return {
                loading:false,
                activeName: 'briefReport',
                briefTotal: 0,
                briefParam: {
                    pageSize: 10,
                    pageNumber: 0
                },
                referenceTotal: 0,
                referenceParam: {
                    pageSize: 10,
                    pageNumber: 0
                },
                briefForm: {
                    startDate: '',
                    endDate: '',
                    title: '教育简报'
                },
                briefRules: {
                    startDate :[
                        { type: 'date', required: true, message: '请选择开始日期', trigger: 'change' }
                    ],
                    endDate :[
                        { type: 'date', required: true, message: '请选择结束日期', trigger: 'change' },
                        { validator: checkBriefDate, trigger: 'change' }
                    ],
                },
                refRules: {
                    startDate :[
                        { type: 'date', required: true, message: '请选择开始日期', trigger: 'change' }
                    ],
                    endDate :[
                        { type: 'date', required: true, message: '请选择结束日期', trigger: 'change' },
                        { validator: checkRefDate, trigger: 'change' }
                    ],
                    ministries: [
                        { type: 'array', required: true, message: '请至少选择一个部委省厅', trigger: 'change' },
                        { validator: validAreaLength, trigger: 'change'}
                    ],
                    colleges: [
                        { type: 'array', required: true, message: '请至少选择一所高校', trigger: 'change' },
                        { validator: validCollegeLength, trigger: 'change'}
                    ]
                },
                refForm: {
                    keyWords: '',
                    startDate: '',
                    endDate: '',
                    ministries: [],
                    colleges: [],
                    title: '内参报告'
                },
                formLabelWidth: '120px',
                shortFormLabelWidth: '55px',
                briefFormVisible: false,
                refFormVisible: false,
                briefData: [],
                referenceData: [],
                allArea: provinces,
                allCollege: schools
            }
        },
        methods:{
            setBreadCrumb(){
                let breadcrumb=[
                    {
                        name:"情报内参",to:{path:"/"}
                    },
                    {
                        name:"内参报告"
                    }
                ];
                this.$store.commit("setBreadCrumb",breadcrumb);
            },

            handleClick(tab, event){
                if(tab.label == '内参报告'){
                    this.getReferenceReportList();
                }else{
                    this.getBriefReportList();
                }
            },

            /**
             * 分页获取教育简报列表
             */
            getBriefReportList(){
                let url = '/apis/briefReport/getAllBriefReport.json?pageNumber=' + this.briefParam.pageNumber + '&pageSize=10';
                this.$http.get(url).then(
                    function (response) {
                        if(response.data.success){
                            this.briefData = response.data.data.list;
                        }else {
                            console.error(response.data.message);
                        }
                    }
                )
            },

            /**
             * 分页获取舆情报告列表
             */
            getReferenceReportList(){
                let url = '/apis/referenceReport/getAllReferenceReport?pageNumber=' + this.referenceParam.pageNumber + '&pageSize=10';
                this.$http.get(url).then(
                    function (response) {
                        if(response.data.success){
                            this.referenceData = response.data.data.list;
                        }else {
                            console.error(response.data.message);
                        }
                    }
                )
            },

            /**
             * 打开添加简报表单
             */
            openBriefDialog(){
                this.briefFormVisible = true;
            },

            /**
             * 打开添加舆情报告表单
             */
            openReferenceDialog(){
                this.refFormVisible = true;
            },

            handleBriefPageChange(val){
                this.briefParam.pageNumber = val - 1;
            },

            handleRefPageChange(val){
                this.referenceParam.pageNumber = val - 1;
            },

            formatCreateDate(row, col) {
                return new Date(row.createDate).format('yyyy-MM-dd');
            },

            formatRangeDate(row, col) {
                return new Date(row.startDate).format('yyyy-MM-dd') + '至' + new Date(row.endDate).format('yyyy-MM-dd');
            },

            closeDialog(formName){
                this.$refs[formName].resetFields();

                if(formName == 'briefForm'){
                    this.briefFormVisible = false;
                }else {
                    this.refFormVisible = false;
                }
            },

            viewBriefReport(data){
                //参数不过全部带过去
                var param = {
                    title: data.title,
                    startDate: data.startDate.substring(0, 10),
                    endDate: data.endDate.substring(0, 10),
                    id: data.id
                }
                this.$router.push({path: "/home/briefDetails", query: param});
            },

            viewRefReport(data){
                var param = $.extend({}, data);
                param.startDate = param.startDate.substring(0, 10);
                param.endDate = param.endDate.substring(0, 10);
                this.$router.push({path: "/home/referenceDetails", query: param});
            },

            deleteBriefReport(id){
                this.$confirm('是否删除该报告', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.delete('/apis/briefReport/deleteBriefReport.json/' + id).then((response) => {
                            if (response.data.success) {
                                this.$message({
                                    message: '删除成功',
                                    type: 'success'
                                });
                                this.getBriefReportList();
                            } else {
                                console.error(response.data.message);
                                return false;
                            }
                        }, (response) => {
                            console.error(response);
                            return false;
                        }
                    );
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            deleteRefReport(id){
                this.$confirm('是否删除该报告', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.delete('/apis/referenceReport/deleteBriefReport/' + id).then((response) => {
                            if (response.data.success) {
                                this.$message({
                                    message: '删除成功',
                                    type: 'success'
                                });
                                this.getReferenceReportList();
                            } else {
                                console.error(response.data.message);
                                return false;
                            }
                        }, (response) => {
                            console.error(response);
                            return false;
                        }
                    );
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            downloadReport(id, type){

            },

            saveBriefReport(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.briefForm.startDate = new Date(this.briefForm.startDate).format('yyyy-MM-dd 00:00:00');
                        this.briefForm.endDate = new Date(this.briefForm.endDate).format('yyyy-MM-dd 23:59:59');
                        this.$http.post('/apis/briefReport/saveOrUpdateBriefReport.json', this.briefForm).then(
                            function (response) {
                                if(response.data.success){
                                    this.briefFormVisible = false;
                                    this.getBriefReportList();
                                }
                            }
                        );
                    } else {
                        console.error('param is not valid');
                        return false;
                    }
                });
            },

            saveRefReport(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let param = {
                            startDate:  new Date(this.refForm.startDate).format('yyyy-MM-dd 00:00:00'),
                            endDate:  new Date(this.refForm.endDate).format('yyyy-MM-dd 23:59:59'),
                            college: this.refForm.colleges.toString(),
                            ministries: this.refForm.ministries.toString(),
                            title: '内参报告',
                            keywords:　this.refForm.keyWords
                        }

                        this.$http.post('/apis/referenceReport/saveOrUpdateReferenceReport', param).then(
                            function (response) {
                                if(response.data.success){
                                    this.refFormVisible = false;
                                    this.getReferenceReportList();
                                }
                            }
                        );
                    } else {
                        console.error('param is not valid');
                        return false;
                    }
                });
            },

        },
        created(){
            this.setBreadCrumb();
            this.getBriefReportList();
        },
        mounted(){
        }
    }
</script>