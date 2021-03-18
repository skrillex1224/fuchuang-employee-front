

//获取emp信息
import { request} from "@/utils/promise";

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


export const getAllHireInfo = async ()=>{
  return await request('getAllHireInfo');
}

export const getHireInfoByEnterName = async (params)=>{
  return await request('getHireInfoByEnterName','GET',params)
}

export const empSubmitResume= async (params)=>{
  return await  request('SubmitApplication','POST',params);
}

export const getEmpInvolvedInterview = async ()=>{
  return await request('getEmpInvolvedInterview');
}

export const getCourseList = async  ()=>{
  return await request('getAllRestCourses');
}

export const signUpCourse = async (params)=>{
  return await request('signUpCourse','POST',params)
}
