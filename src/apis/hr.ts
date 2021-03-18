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

export const getAllInterview = async  (params)=>{
  return await  request('getAllInterview','POST',params)
}

export const getAllCourse = async  (params)=>{
  return await  request('getAllCourseByTime','POST',params)
}

export const publishCourseInfo = async (params)=>{
  return await request('addCourse',"POST",params)
}
