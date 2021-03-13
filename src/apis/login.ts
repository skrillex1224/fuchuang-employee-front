import {request} from "@/utils/promise";


export const employeeRegister = async  (params)=>(
   await request('empRegistry','POST',params)
)
