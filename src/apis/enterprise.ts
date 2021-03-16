import {request} from "@/utils/promise";


export const getEnterpriseByAccount = async  ()=>{
  return await request('getEnterpriseByAccount','GET',{});
}

export const getPassedEmployeeList = async ()=>{
  return await  request("getPassedEmployeeList");
}



export const getEmployedEmployeeList = async ()=>{
  return await  request("getEmployedEmployeeList");
}
