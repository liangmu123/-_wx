const load = {
    state:{
        loading:false,
        loading2:false,
    },
    mutations:{
        SET_LOAD : (state,loading)=>{
            state.loading = loading
        },
        SET_LOAD2 : (state,loading)=>{
            state.loading2 = loading
        },
    },
    actions:{
        SET_LOAD_MUTATIONS({commit},{loading}){
            return new Promise(resolve => {
                commit('SET_LOAD',loading)
                resolve()
            })
        },
        SET_LOAD_MUTATIONS2({commit},{loading}){
            return new Promise(resolve => {
                commit('SET_LOAD2',loading)
                resolve()
            })
        },
    }
}
export default load