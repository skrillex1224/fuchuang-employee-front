import {request} from "@/utils/promise";


export const adminLogin = async  (params)=>{
   return await request('adminLogin',"POST",params);
}

export const getAllRecheckInfos = async ()=>{
  return await request('getTotalRecheck');
}
