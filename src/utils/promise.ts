import axios from 'axios';
import {message} from "antd";


export const MethodType = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH'
};

export let host : string;

if (process.env.NODE_ENV !== 'development') {
  host = 'http://192.168.43.113:8080/';
} else {
  host = '/api/';
}

// 跨域请求下携带cookie
axios.defaults.withCredentials=true;
/**
 * 模块说明:无api_token请求
 */
export const request = (api : string, method = MethodType.GET, params ={}) => {
  //这是类型type
  // const apiToken = localStorage.getItem('token');
  const data = (method === 'GET') ? 'params' : 'data';
  // @ts-ignore
  return axios({
    url: `${host}${api}`,
    method,
    [data]: {...params},
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Credentials': true,
      // 'Authorization': `${apiToken}`,
      // 'Access-Control-Allow-Origin':true ,
    },
  })
    .then(resp => {
      message.destroy('globalKey');
      if(resp.status === 200  && resp.data.errMsg){

         message.success(resp.data.errMsg);
      }
      return resp;
    })
    .catch(error => {
      if(error.response.status === 422 && error.response.data.errMsg ){

        message.error(error.response.data.errMsg);
      }
      /*return error 字符串  的promise状态为promise.resolved()*/
      return Promise.reject(error);
    });
};

/**
 * 模块说明:上传文件请求
 */
export const requestFile = (api : string, method = MethodType.POST, params = {}) => {
  const data = (method === 'GET') ? 'params' : 'data';
  // @ts-ignore
  return axios({
    url: `${host}${api}`,
    method,
    [data]: params,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(resp => {
      if (resp.status >= 300) {
        console.log('网络错误', resp);
      }
      return resp;
    })
    .catch(error => {
      console.log('请求错误', error);
      return error;
    });
};
