/**
 * Created by zhangxin on 2017/3/14.
 */
import panorama from './views/pomp/panorama/panorama.vue';
import analyse from './views/pomp/analyse/analyse.vue';
import warning from './views/pomp/warning/warning.vue';
import event from './views/pomp/event/event.vue';
import speech from './views/pomp/speech/speech.vue';
import speechDetails from './views/pomp/speech/speechDetails.vue';
import industryNews from './views/reference/industryNews/industryNews.vue';
import characterNews from './views/reference/characterNews/characterNews.vue';
import seeClearly from './views/reference/seeClearly/seeClearly.vue';
import mediaCoverage from './views/reference/mediaCoverage/mediaCoverage.vue';
import report from './views/reference/report/report.vue';
import seeWeChat from './views/serviceTool/seeweChat/seeweChat.vue';
import weChatList from './views/serviceTool/seeWeChat/weChatList/weChatList.vue';
import weChatVerify from "./views/serviceTool/seeWeChat/weChatVerify/weChatVerify.vue"
import seeWeibo from './views/serviceTool/seeWeibo/seeWeibo.vue';
import weiboList from './views/serviceTool/seeWeibo/weiboList/weiboList.vue';
import weiboVerify from './views/serviceTool/seeWeibo/weiboVerify/weiboVerify.vue';
import myAttention from './views/myAttention/myAttention.vue';
import login from './views/login/login.vue';
import home from './views/home/home.vue';
import eventDetails from './views/pomp/event/eventDetails/eventDetails.vue';
import eventList from './views/pomp/event/evenList/eventList.vue';
import publicOpinionRule from "./views/pomp/warning/publicOpinionRule.vue";
import analyseList from "./views/pomp/analyse/analyseList/analyseList.vue";
import characterAnalyse from "./views/pomp/analyse/characterAnalyse/characterAnalyse.vue";
import characterTable from "./views/pomp/analyse/characterTable/characterTable.vue";
import industryNewsList from "./views/reference/industryNews/newsList/industryNewsList.vue"
import industryDetailNews from "./views/reference/industryNews/newsDetail/industryDetailNews.vue";
import myCenter from "./views/myCenter/myCenter1.vue";
import centerList from "./views/myCenter/subViews/centerList.vue";
import centerSystemDetail from "./views/myCenter/subViews/detailViews/systemDetail.vue";
import centerPackageConfirm from "./views/myCenter/subViews/detailViews/packageConfirm.vue";
import centerPackageResult from "./views/myCenter/subViews/detailViews/packageResult.vue";
import centerCharacter from "./views/myCenter/subViews/detailViews/editCharacter.vue";
import centerCollege from "./views/myCenter/subViews/detailViews/editCollege.vue";
import loginBox from './views/login/loginBox/loginBox.vue';
import probation from './views/login/probation/probation.vue';
import forget from './views/login/forget/forget.vue';
export default {
    mode:'history',
    base:__dirname,
    routes:[
        {
            path:"",
            redirect:"/home/panorama",
        },
        {
            name:"home",
            path:"/home",
            component:home,
            redirect:"/home/panorama",
            children:[
                {
                    name:"panorama",
                    path:"panorama",
                    component:panorama
                },
                {
                    path:"event",
                    component:event,
                    children:[
                        {
                            path:"",
                            component:eventList
                        }
                    ]
                },
                {
                    path:"eventDetails",
                    component:event,
                    children:[
                        {
                            path:"",
                            component:eventDetails
                        }
                    ]
                },
                {
                    path:"analyse",
                    component:analyse,
                    children: [
                        {
                            path: "",
                            component: analyseList
                        }
                    ]
                },
                {
                    //为了过滤路径 命名后面追加了Analyse
                    path: "characterTableAnalyse",
                    component:analyse,
                    children:[
                        {
                            path: "",
                            component: characterTable
                        }
                    ]
                },
                {
                    path: "characterAnalyse",
                    component: analyse,
                    children: [
                        {
                            path: "",
                            component: characterAnalyse
                        }
                    ]
                },
                {
                    name:"舆情预警",
                    path:"warning",  
                    component:warning
                },
                { 
                   name:"舆情规则",
                   path:"publicOpinionRule",
                   component:publicOpinionRule
                },
                {
                    name:"舆情报告",
                    path:"speech",
                    component:speech
                },
                {
                    name: "报告详情",
                    path:"speechDetails",
                    component:speechDetails,
                    children:[
                        {
                            path:"",
                            component:eventDetails
                        }
                    ]
                },
                {   
                    name:"行业动态",
                    path:"industryNews",
                    component:industryNews,
                    children: [
                        {
                            path: "",
                            component:　industryNewsList
                        }
                    ]
                },
                {
                    path: "industryDetailNews",
                    component: industryNews,
                    children: [
                        {
                            path: "",
                            component: industryDetailNews
                        }
                    ]
                },
                {
                    name:"characterNews",
                    path:"characterNews",
                    component:characterNews
                },
                {
                    name:"seeClearly",
                    path:"seeClearly",
                    component:seeClearly
                },
                {
                    name:"mediaCoverage",
                    path:"mediaCoverage",
                    component:mediaCoverage
                },
                {
                    name:"report",
                    path:"report",
                    component:report
                },
                {
                    path:"seeWeChat",
                    component:seeWeChat,
                    children: [
                        {
                            path: "",
                            component: weChatList
                        }
                    ]
                },
                {
                    path: "weChatVerify",
                    component: seeWeChat,
                    children: [
                        {
                            path: "",
                            component: weChatVerify
                        }
                    ]
                },
                {
                    path:"seeWeibo",
                    component:seeWeibo,
                    children: [
                        {
                            path: "",
                            component:　weiboList
                        }
                    ]
                },
                {
                    path: "weiboVerify",
                    component: seeWeibo,
                    children: [
                        {
                            path: "",
                            component: weiboVerify
                        }
                    ]
                },
                {
                    name:"myAttention",
                    path:"myAttention",
                    component:myAttention
                },
                {
                    path: "myCenter",
                    component: myCenter,
                    children: [
                        {
                            path: "",
                            component: centerList
                        }
                    ]
                },
                {
                    path: "centerSystemDetail",
                    component: myCenter,
                    children: [
                        {
                            path: "",
                            component: centerSystemDetail
                        }
                    ]
                },
                {
                    path: "centerPackageConfirm",
                    component: myCenter,
                    children: [
                        {
                            path: "",
                            component: centerPackageConfirm
                        }
                    ]
                },
                {
                    path: "centerPackageResult",
                    component: myCenter,
                    children: [
                        {
                            path: "",
                            component: centerPackageResult
                        }
                    ]
                },
                {
                    path: "centerCharacter",
                    component: myCenter,
                    children: [
                        {
                            path: "",
                            component: centerCharacter
                        }
                    ]
                },
                {
                    path: "centerCollege",
                    component: myCenter,
                    children: [
                        {
                            path: "",
                            component: centerCollege
                        }
                    ]
                },
            ]
        },
        {
            path:"/login",
            component:login,
            children:[
                {
                    path:"",
                    component:loginBox
                }
            ]
        },
        {
            path:"/probation",
            component:login,
            children:[
                {
                    path:"",
                    component:probation
                }
            ]
        },
        {
            path:"/forget",
            component:login,
            children:[
                {
                    path:"",
                    component:forget
                }
            ]
        },
    ]
}