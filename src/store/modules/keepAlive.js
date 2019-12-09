const keepAlive = {
    state:{
        top:0,
        tab:0,
        list:[],
        page:1,
        id:0,
    },
    mutations:{
        SET_TOP : (state,top)=>{
            state.top = top
        },
        SET_TAB : (state,tab)=>{
            state.tab = tab
        },
        SET_LIST : (state,list)=>{
            state.list = list
        },
        SET_PAGE : (state,page)=>{
            state.page = page
        },
        SET_ID : (state,id)=>{
            state.id = id
        },
    },
    actions:{
        SET_TOP_MUTATIONS({commit},{top}){
            return new Promise(resolve => {
                commit('SET_TOP',top)
                resolve()
            })
        },
        SET_TAB_MUTATIONS({commit},{tab}){
            return new Promise(resolve => {
                commit('SET_TAB',tab)
                resolve()
            })
        },
        SET_LIST_MUTATIONS({commit},{list}){
            return new Promise(resolve => {
                //console.log(list)
                commit('SET_LIST',list)
                resolve()
            })
        },
        SET_PAGE_MUTATIONS({commit},{page}){
            return new Promise(resolve => {
                commit('SET_PAGE',page)
                resolve()
            })
        },
        SET_ID_MUTATIONS({commit},{id}){
            return new Promise(resolve => {
                commit('SET_ID',id)
                resolve()
            })
        },
    }
}
export default keepAlive