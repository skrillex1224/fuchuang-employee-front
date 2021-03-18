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

export const submitHireInfo = async (params)=>{
  return await request("addHireInfoByEnterpriseId",'POST',params);
}

export const deleteOneHireinfo = async (params)=>{
  return await request("deleteHireInfo","GET",params);
}

export const dismissFormSubmit = async  (params)=>{
  return await request("dismissEmployedEmp","POST",params);
}

export const switchPost = async  (params)=>{
  return await request("transferPosition","POST",params);
}

export const inviteToEnter = async (params)=>{
  return await request('inviteEmpToEnterprise',"POST",params);
}
