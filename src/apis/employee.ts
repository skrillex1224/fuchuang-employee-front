

//获取emp信息
import {request} from "@/utils/promise";

export const getEmpInfo = async () =>{
   return await request('getTotalEmp');
}
