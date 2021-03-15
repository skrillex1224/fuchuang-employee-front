import {request} from "@/utils/promise";


export const getEnterpriseByAccount = async  ()=>{
  return await request('getEnterpriseByAccount','GET',{});
}

