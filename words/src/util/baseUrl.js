let baseURL = process.env.VUE_APP_BASE_URL || "https://open.jrtkqk.com/partner-api/"; //开发环境
if (process.env.NODE_ENV == "development") {
    baseURL = "/dev";
}
export default baseURL;