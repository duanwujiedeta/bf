//首页验证登录功能过滤
export let getRedirectRouteName = route => {
    let name = route.name;
    let goList = ["login", "register", "getpwd", "resetpwd", "home"];
    return goList.indexOf(name) >= 0 ? name : "login";
}