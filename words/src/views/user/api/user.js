import http from "@/util/http";
//修改密码
export let changePwd = params => {
    return http.request("/change/password", params, "put");
}

// 修改开发者信息
export let changeUserInfo = params => {
    return http.request("/user", params, "put");
}