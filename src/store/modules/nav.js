const nav = {
    state:{
        modular:0,//当前导航栏
    },
    mutations:{
        // 设置导航栏
        SET_MODULAR : (state,modular)=>{
            //console.log('执行了',modular)
            state.modular = modular
        },
    },
    actions:{
        // 激活导航栏
        setNavModular({commit},{modular}){
            return new Promise(resolve => {
              commit('SET_MODULAR',modular)
              resolve()
            })
        },
    }
}
export default nav