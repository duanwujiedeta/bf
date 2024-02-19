import http from '@/util/http'
export default {
    async getUserInfo({
        commit
    }) {
        let res = await getInfoFromServer()
        // console.log(res)
        if (res) {
            commit('SET_LOGIN', true)
            commit('SET_USERINFO', res.user.name)
        }
        return res
    }
}
let getInfoFromServer = () => {
    return http.post("/user", {});
}