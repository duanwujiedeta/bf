import http from "@/util/http";
//绑定店铺
export let bindShop = params => {
    return http.post("/shop/bind", params);
}
//获取绑定店铺列表
export let getShopList = params => {
    return http.get("/shop", params);
}

//店铺数量获取
export let getShopNum = params => {
    return http.get("/shop/checkNum", params);
}

//应用安装 application_id  domain
export let installApp = params => {
    return http.get("/app/install", params);
}


//应用安装 application_id  domain
export let delStore = params => {
    return http.request("/shop", params, "delete");
}