import {request} from "@/utils/promise";


export const arrangeInterview = async (params)=>{
   await request('arrangeInterview','POST',params);
}


export const refuseInterview = async  ()=>{
  // return await request()
}


export const getAllApplication = async ()=>{
  return await request('getAllApplication');
}

export const getAllInterview = async (params)=>{
  return await request('getAllInterviewByHrId',"GET",params)
}
