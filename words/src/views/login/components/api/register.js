import http from "@/util/http";
//获取验证码
export let getRegisterCode = params => {
    return http.post("/send-email", params);
}
//注册
export let registerUser = params => {
    return http.post("/register", params);
}
//检测邮箱是否可以注册
export let checkUser = params => {
    return http.post("/checkEmail", params);
}

//登录
export let loginSys = params => {
    return http.post("/login", params);
}

//获取用户信息
export let getUserMsg = params => {
    return http.get("/user", params);
}

//POST 找回密码-发送邮件
export let sendPwdFromEamil = params => {
    return http.post("/retrieve/password", params);
}

//重置密码
export let resetPassword = params => {
    return http.post("/changPwd", params);
}
//校验重置密码的email和token
export let checkURL = params => {
    return http.get("/checkURL", params);
}