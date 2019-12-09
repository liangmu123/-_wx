import Vue from 'vue'
import Router from 'vue-router'

const index  = r => require.ensure([], () => r(require('@/page/index')), 'index')
const personrecords  = r => require.ensure([], () => r(require('@/page/personrecords')), 'personrecords')
const volunteer  = r => require.ensure([], () => r(require('@/page/volunteer')), 'volunteer')
const center  = r => require.ensure([], () => r(require('@/page/center')), 'center')
const interactive  = r => require.ensure([], () => r(require('@/page/interactive')), 'interactive')
const informationList  = r => require.ensure([], () => r(require('@/page/informationList')), 'informationList')
const informationList2  = r => require.ensure([], () => r(require('@/page/informationList2')), 'informationList2')
const informationList3  = r => require.ensure([], () => r(require('@/page/informationList3')), 'informationList3')
const orderlist  = r => require.ensure([], () => r(require('@/page/orderlist')), 'orderlist')
const live  = r => require.ensure([], () => r(require('@/page/live')), 'live')
const videodetails  = r => require.ensure([], () => r(require('@/page/videodetails')), 'videodetails')
const videodetails2  = r => require.ensure([], () => r(require('@/page/videodetails2')), 'videodetails2')
const articledetails  = r => require.ensure([], () => r(require('@/page/articledetails')), 'articledetails')
const takephotolist  = r => require.ensure([], () => r(require('@/page/takephotolist')), 'takephotolist')
const takephotos  = r => require.ensure([], () => r(require('@/page/takephotos')), 'takephotos')
const applyvolunteer  = r => require.ensure([], () => r(require('@/page/applyvolunteer')), 'applyvolunteer')
const volunteerdetails  = r => require.ensure([], () => r(require('@/page/volunteerdetails')), 'volunteerdetails')
const takephotosdetails  = r => require.ensure([], () => r(require('@/page/takephotosdetails')), 'takephotosdetails')
const applyservice  = r => require.ensure([], () => r(require('@/page/applyservice')), 'applyservice')
const servicelist  = r => require.ensure([], () => r(require('@/page/servicelist')), 'servicelist')
const servicedetails  = r => require.ensure([], () => r(require('@/page/servicedetails')), 'servicedetails')
const activitydetails  = r => require.ensure([], () => r(require('@/page/activitydetails')), 'activitydetails')
const votelist  = r => require.ensure([], () => r(require('@/page/votelist')), 'votelist')
const votedetails  = r => require.ensure([], () => r(require('@/page/votelist/votedetails')), 'votedetails')
const myvotelist  = r => require.ensure([], () => r(require('@/page/myvotelist')), 'myvotelist')
const myvotedetails  = r => require.ensure([], () => r(require('@/page/myvotelist/myvotedetails')), 'myvotedetails')
// const newInformationlist  = r => require.ensure([], () => r(require('@/page/newInformationlist')), 'newInformationlist')
const myExchangeList  = r => require.ensure([], () => r(require('@/page/myExchangeList')), 'myExchangeList')
const supermarket  = r => require.ensure([], () => r(require('@/page/supermarket')), 'supermarket')
const supermarketDeatils  = r => require.ensure([], () => r(require('@/page/supermarketDeatils')), 'supermarketDeatils')
const oneClick  = r => require.ensure([], () => r(require('@/page/oneClick')), 'oneClick')
const oneClickList  = r => require.ensure([], () => r(require('@/page/oneClick/oneClickList')), 'oneClickList')
const myrequest  = r => require.ensure([], () => r(require('@/page/oneClick/myrequest')), 'myrequest')
const myhelp  = r => require.ensure([], () => r(require('@/page/oneClick/myhelp')), 'myhelp')
const appeal  = r => require.ensure([], () => r(require('@/page/oneClick/appeal')), 'appeal')
const suggest  = r => require.ensure([], () => r(require('@/page/oneClick/suggest')), 'suggest')
const appealphotos  = r => require.ensure([], () => r(require('@/page/appealphotos')), 'appealphotos')
const messagelist  = r => require.ensure([], () => r(require('@/page/messagelist')), 'messagelist')
const bindInfo  = r => require.ensure([], () => r(require('@/page/bindInfo')), 'bindInfo')
const applyteam  = r => require.ensure([], () => r(require('@/page/applyteam')), 'applyteam')
const myteam  = r => require.ensure([], () => r(require('@/page/myteam')), 'myteam')
const volunteerteam  = r => require.ensure([], () => r(require('@/page/volunteerteam')), 'volunteerteam')
const teamdetails  = r => require.ensure([], () => r(require('@/page/teamdetails')), 'teamdetails')
const order  = r => require.ensure([], () => r(require('@/page/order')), 'order')
const voteAndSuggest = r => require.ensure([], () => r(require('@/page/voteAndSuggest')),'voteAndSuggest')
const voteAndSuggestDetails = r => require.ensure([], () => r(require('@/page/voteAndSuggest/details')),'voteAndSuggestDetails')
const infoList = r => require.ensure([], () => r(require('@/page/infoList')),'infoList')
const planDetails = r => require.ensure([], () => r(require('@/page/planDetails')),'planDetails')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta: {
        keepAlive: true, // 需要被缓存
      }
    },
    {
      path:'/planDetails',
      name:'planDetails',
      component:planDetails,
      meta:{
        keepAlive:false
      }
    },
    {
      path:'/infoList',
      name:'infoList',
      component:infoList,
      meta:{
        keepAlive:true
      }
    },
    {
      path:'/voteAndSuggest',
      name:'voteAndSuggest',
      component:voteAndSuggest,
      meta:{
        keepAlive:false
      }
    },
    {
      path:'/voteAndSuggestDetails',
      name:'voteAndSuggestDetails',
      component:voteAndSuggestDetails,
      meta:{
        keepAlive:false
      }
    },
    {
      path:'/teamdetails',
      name:'teamdetails',
      component:teamdetails,
      meta:{
        keepAlive:false
      }
    },
    {
      path:'/order',
      name:'order',
      component:order,
      meta:{
        keepAlive:false
      }
    },
    {
      path:'/volunteerteam',
      name:'volunteerteam',
      component:volunteerteam,
      meta:{
        keepAlive:false
      }
    },
    // {
    //   path:'/informationDetails',
    //   name:'informationDetails',
    //   component:informationDetails,
    //   meta:{
    //     keepAlive:false,
    //   }
    // },
    {
      path:'/myteam',
      name:'myteam',
      component:myteam,
      meta:{
        keepAlive:false,
      }
    },
    {
      path:'/applyteam',
      name:'applyteam',
      component:applyteam,
      meta:{
        keepAlive:false,
      }
    },
    {
      path:'/bindInfo',
      name:'bindInfo',
      component:bindInfo,
      meta:{
        keepAlive:false,
      }
    },
    {
      path:'/messagelist',
      name:'messagelist',
      component:messagelist,
      meta:{
        keepAlive:false,
      }
    },
    {
      path:'/appealphotos',
      name:'appealphotos',
      component:appealphotos,
      meta:{
        keepAlive:false,
      }
    },
    {
      path:'/suggest',
      name:'suggest',
      component:suggest,
      meta:{
        keepAlive:false,
      }
    },
    {
      path:'/appeal',
      name:'appeal',
      component:appeal,
      meta:{
        keepAlive:false,
      }
    },
    {
      path:'/oneClick',
      name:'oneClick',
      component:oneClick,
      meta:{
        keepAlive:false,
      }
    },
    {
      path:'/myrequest',
      name:'myrequest',
      component:myrequest,
      meta:{
        keepAlive:false,
      }
    },
    {
      path:'/myhelp',
      name:'myhelp',
      component:myhelp,
      meta:{
        keepAlive:false,
      }
    },
    {
      path:'/oneClickList',
      name:'oneClickList',
      component:oneClickList,
      meta:{
        keepAlive:false,
      }
    },
    {
      path:'/supermarketDeatils',
      name:'supermarketDeatils',
      component:supermarketDeatils,
      meta:{
        keepAlive:false,
      }
    },
    {
      path:'/supermarket',
      name:'supermarket',
      component:supermarket,
      meta:{
        keepAlive:false,
      }
    },
    {
      path:'/myExchangeList',
      name:'myExchangeList',
      component:myExchangeList,
      meta:{
        keepAlive:false,
      }
    },
    // {
    //   path:'/newInformationlist',
    //   name:'newInformationlist',
    //   component:newInformationlist,
    //   meta:{
    //     keepAlive:true,
    //   }
    // },
    {
      path:'/votedetails',
      name:'votedetails',
      component:votedetails,
      meta:{
        keepAlive:false,
      }
    },
    {
      path:'/votelist',
      name:'votelist',
      component:votelist,
      meta:{
        keepAlive:false,
      }
    },
    {
      path:'/myvotedetails',
      name:'myvotedetails',
      component:myvotedetails,
      meta:{
        keepAlive:false,
      }
    },
    {
      path:'/myvotelist',
      name:'myvotelist',
      component:myvotelist,
      meta:{
        keepAlive:false,
      }
    },
    {
      path: '/personrecords',
      name: 'personrecords',
      component: personrecords,
      meta: {
        keepAlive: false, // 需要被缓存
      }
    },
    {
      path: '/activitydetails',
      name: 'activitydetails',
      component: activitydetails,
      meta: {
        keepAlive: false, // 需要被缓存
      }
    },
    {
      path: '/servicelist',
      name: 'servicelist',
      component: servicelist,
      meta: {
        keepAlive: false, // 需要被缓存
      }
    },
    {
      path: '/servicedetails',
      name: 'servicedetails',
      component: servicedetails,
      meta: {
        keepAlive: false, // 需要被缓存
      }
    },
    {
      path: '/applyservice',
      name: 'applyservice',
      component: applyservice,
      meta: {
        keepAlive: false, // 需要被缓存
      }
    },
    {
      path: '/takephotosdetails',
      name: 'takephotosdetails',
      component: takephotosdetails,
      meta: {
        keepAlive: false, // 需要被缓存
      }
    },
    {
      path: '/volunteerdetails',
      name: 'volunteerdetails',
      component: volunteerdetails,
      meta: {
        keepAlive: false, // 需要被缓存
      }
    },
    {
      path: '/applyvolunteer',
      name: 'applyvolunteer',
      component: applyvolunteer,
      meta: {
        keepAlive: false, // 需要被缓存
      }
    },
    {
      path: '/takephotos',
      name: 'takephotos',
      component: takephotos,
      meta: {
        keepAlive: false, // 需要被缓存
      }
    },
    {
      path: '/takephotolist',
      name: 'takephotolist',
      component: takephotolist,
      meta: {
        keepAlive: false, // 需要被缓存
      }
    },
    {
      path: '/volunteer',
      name: 'volunteer',
      component: volunteer,
      meta: {
        keepAlive: false, // 需要被缓存
      }
    },
    {
      path: '/center',
      name: 'center',
      component: center,
      meta: {
        keepAlive: true, // 需要被缓存
      }
    },
    {
      path: '/interactive',
      name: 'interactive',
      component: interactive,
      meta: {
        keepAlive: false, // 需要被缓存
      }
    },
    {
      path: '/informationList',
      name: 'informationList',
      component: informationList,
      meta: {
        keepAlive: true, // 需要被缓存
      }
    },
    {
      path: '/informationList2',
      name: 'informationList2',
      component: informationList2,
      meta: {
        keepAlive: true, // 需要被缓存
      }
    },
    {
      path: '/informationList3',
      name: 'informationList3',
      component: informationList3,
      meta: {
        keepAlive: true, // 需要被缓存
      }
    },
    {
      path: '/orderlist',
      name: 'orderlist',
      component: orderlist,
      meta: {
        keepAlive: false, // 需要被缓存
      }
    },
    {
      path: '/videodetails',
      name: 'videodetails',
      component: videodetails,
      meta: {
        keepAlive: false, // 需要被缓存
      }
    },
    {
      path: '/videodetails2',
      name: 'videodetails2',
      component: videodetails2,
      meta: {
        keepAlive: false, // 需要被缓存
      }
    },
    {
      path: '/articledetails',
      name: 'articledetails',
      component: articledetails,
      meta: {
        keepAlive: false, // 需要被缓存
      }
    },
    {
      path: '/live',
      name: 'live',
      component: live,
      meta: {
        keepAlive: false, // 需要被缓存
      }
    },
  ]
})
