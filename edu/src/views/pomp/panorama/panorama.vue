<template>
    <div class="panorama">
        <overview></overview>
        <el-row :gutter="10">
            <el-col :span="12">
                <el-card class="box-card educationBox">
                    <div slot="header" class="clearfix">
                        <span class="icons icons-chart1"></span><span>舆情数据统计</span>
                    </div>
                    <div class="text item">
                        <el-table :data="opinionData" :resizable="false" :show-overflow-tooltip="true"  class="tran-table" :show-header="true" style="width: 100%">
                            <el-table-column prop="col" :show-overflow-tooltip="true" label="" align="center" width="80px"></el-table-column>
                            <el-table-column prop="today" label="今天" align="center"></el-table-column>
                            <el-table-column prop="yesterday" label="昨天" align="center"></el-table-column>
                            <el-table-column prop="week" label="近7天" align="center"></el-table-column>
                            <el-table-column prop="month" label="近30天" align="center"></el-table-column>
                        </el-table> 
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card educationBox">
                    <div slot="header" class="clearfix">
                        <span class="icons icons-chart2"></span><span>舆情数据锥形图</span>
                    </div>
                    <div class="text item" id="opinionFunnel">
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card educationBox">
                    <div slot="header" class="clearfix">
                        <span class="icons icons-chart3"></span><span>载体分布统计</span>
                    </div>
                    <div class="text item">
                        <el-tabs v-model="activeName3" class="custom-tabs" @tab-click="vectorDistributeClick">
                            <el-tab-pane label="今日" name="TODAY" id="TAB_TODAY">
                                <div class="text item" style="height: 400px;"></div>
                            </el-tab-pane>
                            <el-tab-pane label="昨日" name="YESTERDAY">
                                <div class="text item" style="height: 400px;"></div>
                            </el-tab-pane>
                            <el-tab-pane label="近7天" name="LASTWEEK">
                                <div class="text item" style="height: 400px;"></div>
                            </el-tab-pane>
                            <el-tab-pane label="近30天" name="LASTMONTH">
                                <div class="text item" style="height: 400px;"></div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card educationBox">
                    <div slot="header" class="clearfix">
                        <span class="icons icons-chart4"></span><span>人物统计</span>
                    </div>
                    <div class="text item" id="personageCount">

                    </div>
                </el-card>
            </el-col>
            <el-col :span="24">
                <el-card class="box-card educationBox">
                    <div slot="header" class="clearfix">
                        <span class="icons icons-chart5"></span><span>载体趋势分析</span>
                    </div>
                    <div class="text item" id="vectorTrend">
                        <el-tabs v-model="activeName4" class="custom-tabs" @tab-click="vectorTrendClick">
                            <el-tab-pane label="今日" name="TODAY" id="TREND_TODAY">
                                <div class="text item" style="height: 400px;"></div>
                            </el-tab-pane>
                            <el-tab-pane label="昨日" name="YESTERDAY">
                                <div class="text item" style="height: 400px;"></div>
                            </el-tab-pane>
                            <el-tab-pane label="近7天" name="LASTWEEK">
                                <div class="text item" style="height: 400px;"></div>
                            </el-tab-pane>
                            <el-tab-pane label="近30天" name="LASTMONTH">
                                <div class="text item" style="height: 400px;"></div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card educationBox">
                    <div slot="header" class="clearfix">
                        <span class="icons icons-chart6"></span><span>热点舆情</span>
                    </div>
                    <div class="text item">
                        <el-tabs v-model="activeName" class="custom-tabs" @tab-click="handleClick">
                            <el-tab-pane label="今日热点" name="todayHot">
                                <el-card class="box-card">
                                    <el-table :data="hotOpinion.todayHot" :resizable="false" style="width: 100%"  class="tran-table">
                                        <el-table-column :show-overflow-tooltip="true" label="标题" align="left" width="180px">
                                            <template scope="scope">
                                                <span @click="toDetail(scope.row)" class="pointer">{{scope.row.title}}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="author" label="作者" align="center"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="hitCount" label="阅读量" align="center"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="publishDate" label="时间" align="center"></el-table-column>
                                    </el-table>
                                </el-card>
                            </el-tab-pane>
                            <el-tab-pane label="近7天热点" name="weekHot">
                                <el-card class="box-card">
                                    <el-table :data="hotOpinion.weekHot" :resizable="false" style="width: 100%"  class="tran-table">
                                        <el-table-column :show-overflow-tooltip="true" prop="title" label="标题" align="left" width="180px">
                                            <template scope="scope">
                                                <span class="pointer" @click="toDetail(scope.row)">
                                                    {{scope.row.title}}
                                                </span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="author" label="作者" align="center"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="hitCount" label="阅读量" align="center"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="publishDate" label="时间" align="center"></el-table-column>
                                    </el-table>
                                </el-card>
                            </el-tab-pane>
                            <el-tab-pane label="近30天热点" name="monthHot">
                                <el-card class="box-card">
                                    <el-table :data="hotOpinion.monthHot" :resizable="false" style="width: 100%"  class="tran-table">
                                        <el-table-column :show-overflow-tooltip="true" prop="title" label="标题" align="left" width="180px">
                                            <template scope="scope">
                                                <span class="pointer" @click="toDetail(scope.row)">
                                                    {{scope.row.title}}
                                                </span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="author" label="作者" align="center"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="hitCount" label="阅读量" align="center"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="publishDate" label="时间" align="center"></el-table-column>
                                    </el-table>
                                </el-card>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card educationBox">
                    <div slot="header" class="clearfix">
                        <span class="icons icons-chart7"></span><span>人物热点</span>
                    </div>
                    <div class="text item">
                        <el-tabs v-model="activeName2" class="custom-tabs" @tab-click="handleClick">
                            <el-tab-pane label="今日热点" name="todayHot">
                                <el-card class="box-card">
                                    <el-table :data="hotPersonage.todayHot" :resizable="false" style="width: 100%"  class="tran-table">
                                        <el-table-column :show-overflow-tooltip="true" label="标题" align="left" width="180px">
                                            <template scope="scope">
                                                <span class="pointer" @click="toDetail(scope.row)">
                                                    {{scope.row.title}}
                                                </span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="author" label="作者" align="center"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="hitCount" label="阅读量" align="center"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="publishDate" label="时间" align="center"></el-table-column>
                                    </el-table>
                                </el-card>
                            </el-tab-pane>
                            <el-tab-pane label="近7天热点" name="weekHot">
                                <el-card class="box-card">
                                    <el-table :data="hotPersonage.weekHot" :resizable="false" style="width: 100%"  class="tran-table">
                                        <el-table-column :show-overflow-tooltip="true" label="标题" align="left" width="180px">
                                            <template scope="scope">
                                                <span class="pointer" @click="toDetail(scope.row)">
                                                    {{scope.row.title}}
                                                </span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="author" label="作者" align="center"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="hitCount" label="阅读量" align="center"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="publishDate" label="时间" align="center"></el-table-column>
                                    </el-table>
                                </el-card>
                            </el-tab-pane>
                            <el-tab-pane label="近30天热点" name="monthHot">
                                <el-card class="box-card">
                                    <el-table :data="hotPersonage.monthHot" :resizable="false" style="width: 100%"  class="tran-table">
                                        <el-table-column :show-overflow-tooltip="true" label="标题" align="left" width="180px">
                                            <template scope="scope">
                                                <span class="pointer" @click="toDetail(scope.row)">
                                                    {{scope.row.title}}
                                                </span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="author" label="作者" align="center"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="hitCount" label="阅读量" align="center"></el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="publishDate" label="时间" align="center"></el-table-column>
                                    </el-table>
                                </el-card>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card educationBox">
                    <div slot="header" class="clearfix">
                        <span class="icons icons-chart8"></span><span>微信热点</span>
                    </div>
                    <div class="text item">
                        <el-card class="box-card">
                            <el-table :data="wechatHot" :resizable="false" style="width: 100%"  class="tran-table">
                                <el-table-column :show-overflow-tooltip="true" label="标题" align="left" width="180px">
                                    <template scope="scope">
                                                <span class="pointer" @click="toDetail(scope.row)">
                                                    {{scope.row.title}}
                                                </span>
                                    </template>
                                </el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="author" label="作者" align="center"></el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="hitCount" label="阅读量" align="center"></el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="publishDate" label="时间" align="center"></el-table-column>
                            </el-table>
                        </el-card>
                    </div>
                </el-card>
            </el-col>

            <el-col :span="12">
                <el-card class="box-card educationBox">
                    <div slot="header" class="clearfix">
                        <span class="icons icons-chart9"></span><span>微博热点</span>
                    </div>
                    <div class="text item">
                        <el-card class="box-card">
                            <el-table :data="weboHot" :resizable="false" style="width: 100%"  class="tran-table">
                                <el-table-column :show-overflow-tooltip="true" label="标题" align="left" width="180px">
                                    <template scope="scope">
                                                <span class="pointer" @click="toDetail(scope.row)">
                                                    {{scope.row.title}}
                                                </span>
                                    </template>
                                </el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="author" label="作者" align="center"></el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="hitCount" label="阅读量" align="center"></el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="publishDate" label="时间" align="center"></el-table-column>
                            </el-table>
                        </el-card>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<style lang="scss" scoped>
    $img-url:url("../../../assets/images/zhongtubiao@1x.png") no-repeat;
    .icons{
        margin-right: 10px; 
        vertical-align: text-bottom;
    }
   .icons-chart1{
        height: 18px;
        width: 21px;
        background:  $img-url -14px 0px;
   }
   .icons-chart2{
        height: 18px;
        width: 21px;
        background:  $img-url -46px 0px;
   }
    .icons-chart3{
        height: 22px;
        width: 21px;
        background:  $img-url -14px -27px;
   }
    .icons-chart4{
        height: 22px;
        width: 21px;
        background:  $img-url -46px -26px;
   }
   .icons-chart5{
        height: 22px;
        width: 21px;
        background:  $img-url -14px -56px;
   }
   .icons-chart6{
        width: 21px;
        height: 25px;
        background:  $img-url -13px -84px;
   }
   .icons-chart7{
        width: 21px;
        height: 26px;
        background:  $img-url -47px -82px;
   }
   .icons-chart8{
        width: 26px;
        height: 25px;
        background:  $img-url -13px -113px;
   }
   .icons-chart9{
        width: 26px;
        height: 20px;
        background:  $img-url -46px -118px;
   }
</style>
<script src="./script/panorama.js">
</script>