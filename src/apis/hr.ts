import {request} from "@/utils/promise";


export const arrangeInterview = async (params)=>{
   await request('arrangeInterview','POST',params);
}

export const refuseInterview = async  (params)=>{
  return await request('refuseInterview',"POST",params)
}


export const getAllApplication = async ()=>{
  return await request('getAllApplication');
}

export const getAllInterview = async (params)=>{
  return await request('getAllInterviewByHrId',"GET",params)
}

export const getAllEnterpriseList = async ()=>{
  return await request('getAllRegisterEnterprise');
}


export const getHrInfo = async ()=>{
  return await request('getHrByHrPhoneNumber');
}

export const auditEnterpriseInfo=  async (params)=>{
  return await request('passEnterprise',"GET",params)
}

export const delEnterpriseInfo=  async (params)=>{
  return await request('delApplyEnterprise',"POST",params)
}