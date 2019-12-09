const getters ={
    modular: state => state.nav.modular,
    token: state => state.user.token,
    isBind:state => state.user.isBind,
    isShow: state => state.none.isShow,
    top: state => state.keepAlive.top,
    tab: state => state.keepAlive.tab,
    list: state => state.keepAlive.list,
    page: state => state.keepAlive.page,
    id: state => state.keepAlive.id
}
  
export default getters