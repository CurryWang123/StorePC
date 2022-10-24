import axios from 'axios'

export const request = axios.create({
    baseURL:'http://localhost:8099/store-platform',
    headers:{
        "Access-Control-Allow-Origin" : "*",
        "Content-Type" : "application/json"
    }
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log('token的值:'+JSON.parse(sessionStorage.getItem('token')))
    if(JSON.parse(sessionStorage.getItem('token')) != null)
    {
      config.headers.token = JSON.parse(sessionStorage.getItem('token'))
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

