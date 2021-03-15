import {request, requestToken} from "@/utils/promise";

export const employeeRegister = async  (params)=>(
   await request('empRegistry','POST',params)
)

export const enterpriseRegister = async  (params)=>(
  await request('enterpriseRegistry','POST',params)
)

export const hrRegister = async  (params)=>(
    await request('hrRegistry','POST',params)
)

export const employeeLogin = async (params)=>(
  await  request('empLogin','POST',params)
)

export const commonLogout = async ()=>(
   await request('logout')
)

export const enterpriseLogin = async (params)=>(
  await  request('enterpriseLogin','POST',params)
)

export const hrLogin = async (params)=>(
  await  request('hrLogin','POST',params)
)
