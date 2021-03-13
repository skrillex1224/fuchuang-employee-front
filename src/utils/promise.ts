import axios from 'axios';
import {message} from "antd";
import {Modal} from 'antd';

const {confirm} = Modal;

let flag = true ;

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
/**
 * 模块说明:有api_token的请求
 */

export const requestToken = (api : string, method = MethodType.GET, params = {}) => {
  const apiToken = localStorage.getItem('token');
  const data = (method === 'GET') ? 'params' : 'data';
  return new Promise((resolve, reject) => {
    // @ts-ignore
    axios({
      url: `${host}${api}`,
      method,
      [data]: params,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'Authorization': `${apiToken}`,
        'Access-Control-Allow-Credentials': true,
      },
    }).then(
      (res) => {
        if(res.status === 200 && res.data.msg){
          /*如果文字是当前仅剩一个超级管理员，无法删除！ , 变为error*/
          if(res.data.msg === '当前仅剩一个超级管理员，无法删除！'){
            message.error(res.data.msg);
            return ;
          }
          message.success(res.data.msg);
        }

        resolve(res);
      }
    )
      .catch(error => {
        reject(error);
        if (error.response.status === 422) {
          message.error(error.response.data.errMsg);
        }

        /*全局提示设置在这里*/
        if (error.response.status === 423 && flag) {
          flag =false ;
          //@
          confirm({
            title: error.response.data.errMsg,
            onOk() {
              localStorage.clear();
              window.location.href ='/user/login'
            },
            okText:'退出',
            maskClosable:false,
            okCancel:false,
            onCancel: ()=>{}
          });

        }
      });
  });
};

/**
 * 模块说明:无api_token请求
 */
export const request = (api : string, method = MethodType.GET, params ) => {
  const data = (method === 'GET') ? 'params' : 'data';
  // @ts-ignore
  return axios({
    url: `${host}${api}`,
    method,
    [data]: {...params},
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Credentials': true
    },
  })
    .then(resp => {
      if(resp.status === 200 ){
         message.success(resp.data);
      }
      return resp;
    })
    .catch(error => {
      if(error.response.status === 422 ){
        message.error(error.response.data);
      }
      return error;
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
