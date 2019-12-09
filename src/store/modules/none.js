const nav = {
    state:{
        isShow:false,//当前导航栏
    },
    mutations:{
        // 设置导航栏
        SET_IS_SHOW : (state,isShow)=>{
            state.isShow = isShow
        },
    },
    actions:{
        // 激活导航栏
        setShowModule({commit},{isShow}){
            return new Promise(resolve => {
              commit('SET_IS_SHOW',isShow)
              resolve()
            })
        },
    }
}
export default nav