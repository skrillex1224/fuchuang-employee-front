import {request} from "@/utils/promise";


export const employeeRegister = async  (params)=>(
   await request('empRegistry','POST',params)
)

export const enterpriseRegister = async  (params)=>(
  await request('enterpriseRegistry','POST',params)
)

export const hrRegister = async  (params)=>(
  await request('hrRegistry','POST',params)
)
