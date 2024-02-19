import http from "@/util/http";
//创建应用
export let createApp = params => {
    return http.post("/app", params);
}
//应用列表
export let getAppList = params => {
    return http.get("/app", params);
}

//应用详情
export let getAppDetail = (id) => {
    return http.get("/app/" + id, {});
}

//应用修改
export let editApp = (id, params) => {
    return http.request("/app/" + id, params, "put");
}
//应用删除
export let delApp = (id, params = {}) => {
    return http.request("/app/" + id, params, "delete");
}
//检查应用名称是否可用
export let checkAppName = params => {
    return http.post("/app/checkTitle", params);
}

//申请发布应用
export let publicApp = params => {
    return http.post("/app/submitReview", params);
}
//导出excel数据
export let exportData = (id, params = {}, config) => {
    return http.get("/app/download?application_id=" + id, params, config);
}