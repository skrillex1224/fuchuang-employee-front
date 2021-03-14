

//获取emp信息
import {request} from "@/utils/promise";

export const getEmpInfo = async () =>{
   return await request('getTotalEmp');
}

export const isContainerResume = async ()=>{
  return await request('isContainResume');
}


export const getAllApplicationInterview = async ()=>{
  return await request('getAllApplicationInterview');
}


export const deleteByApplicationId = async (params)=>{
  return await  request("deleteByApplicationId","POST",params)
}
