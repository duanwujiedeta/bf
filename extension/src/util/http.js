import axios from 'axios'
import baseURL from "./baseUrl"
import {
  Message
} from 'element-ui'
let config = {
  baseURL, //假定我们直接访问后台接口
  // timeout: 50000, //设置超时时间50s
  withCredentials: true //允许携带cookie，session登录有用
}
//创建axios服务
let service = axios.create(config)
// 请求前request拦截器
service.interceptors.request.use(
  config => {
    // 拦截请求可以设置各种数据,后续会用得到
    //jwt 设置token
    /* config.headers.Authorization = ("Bearer " + localStorage.getItem("login_token")) || "" */
    // config.headers["X-Requested-With"] = "XMLHttpRequest"
    return config
  },
  err => {
    Promise.reject(err)
  }
)
// 响应后respone拦截器
service.interceptors.response.use(
  response => {
    return returnResponse(response.data)
  },
  err => {
    return err;
  }
)

function returnResponse(response) {
  return response;
}
let http = {
  get(url, params, config) {
    // get请求
    return new Promise((resolve, reject) => {
      service({
        method: 'get',
        url,
        params,
        ...config
      }).then(res => {
        handleResponse(params, res);
        resolve(res)
      }).catch(err => {
        handleResponse(params, err);
        reject(err);
      });
    })
  },
  post(url, params, config) {
    // post请求
    return new Promise((resolve, reject) => {
      service({
        method: 'post',
        url,
        data: params,
        ...config
      }).then(res => {
        handleResponse(params, res);
        resolve(res)
      }).catch(err => {
        handleResponse(params, err);
        reject(err);
      });
    })
  },
  request(url, params, type) {
    // post请求
    return new Promise((resolve, reject) => {
      service({
        method: type,
        url,
        data: params
      }).then(res => {
        handleResponse(params, res);
        resolve(res)
      }).catch(err => {
        handleResponse(params, err);
        reject(err);
      });
    })
  },
  base: service,
  config
}

function handleResponse(params = {}, res) {
  (typeof params.$hideMsg == "undefined") && handleError(res);
}

function handleError(err) {
  if (err && err.message) {
    let resMsg;
    if (err.message.indexOf('Network Error') >= 0 || err.message.indexOf('code 502') >= 0) {
      resMsg = '请求异常，请稍后重试'
    }
    if (err.message.indexOf('code 500') >= 0) {
      resMsg = '接口请求出现故障，请稍后重试'
    }
    if (!err.message) {
      err = {
        msg: resMsg
      };
    }
  }
  if (!err) {
    err = {
      data: {
        data: [],
        code: '-100',
        // msg: '后台接口出现故障:' + err
        msg: '请求超时，请检查您的网络'
      }
    };
  }
  if (err && (err.code == 48 || err.code == 49 || err.toString().indexOf(403) >= 0)) {
    Message.error('登录失效！');
    loginOut();
    return
  }
  if (err && err.code != 0) {
    if (err.code == -401) {
      Message.error('登录失效！');
      loginOut();
      //login out
    } else {
      Message.error(err.msg || err.message);
    }
    return
  }
}
let loginOut = () => { //清除本地缓存
  setTimeout(() => {
    window.location.href = '/';
  }, 500)
}
http.install = Vue => {
  Vue.prototype.$http = http
}
export default http