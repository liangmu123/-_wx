import {getQueryString} from '@/api/getData.js'
import axios from 'axios'
import {isBind} from '@/api/api'

const user = {
    state:{
        token:'',//用户token
        isBind:false,
    },
    mutations:{
        // 保存用户token
        SET_TOKEN : (state,token)=>{
            state.token = token
            if(window.localStorage.getItem('') != null){
                window.localStorage.removeItem('access_token')
            }
            window.localStorage.setItem('access_token',token)
        },
        IS_BIND:(state,isbind)=>{
            state.isBind = isbind
        },
    },
    actions:{
        // 获取用户token
        getToken({commit},{path,access_token}){
            return new Promise(resolve => {
              if(access_token){
                  commit('SET_TOKEN',access_token)
                  resolve()
                  return
              }
              var token = getQueryString('access_token')
              //console.log(path,666)
              if(token == null){
                  var url = encodeURIComponent(path)
                  console.log(path,999)
                  window.location.href = BASE + '/home/auth/wxlogin?redirect_uri='+url
              }else{
                  commit('SET_TOKEN',token)
                  resolve()
              }
            })
        },
        // 验证是否已绑定
        SET_BIND({commit}){
            return new Promise(resolve => {
                // 判断是否已实名认证
                var params = {}
                params.access_token = window.localStorage.getItem('access_token')
                axios.post(isBind,params)
                .then(res=>{
                    // 未绑定
                    if(res.data.data.is_bind == 0){
                        var isbind = false
                        commit('IS_BIND',isbind)
                        resolve()
                    }else if(res.data.data.is_bind == 1){
                        var isbind = true
                        commit('IS_BIND',isbind)
                        resolve()
                    }
                })
            })
        },
    }
}
export default user