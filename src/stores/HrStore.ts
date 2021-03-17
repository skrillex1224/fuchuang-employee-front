import {action, makeObservable, observable} from "mobx";
import {arrangeInterview, getAllApplication, getAllEnterpriseList, refuseInterview} from "@/apis/hr";


class HrStore {

  constructor() {
    makeObservable(this)
  }

  @observable
  enterpriseList = [];

  @action.bound
  initializeEnterpriseList = async ()=>{
    try{
      this.enterpriseList=  (await getAllEnterpriseList()).data
    }catch (e) {}
  }


  @action.bound
  hrRefuseInterview = async (dismissReason,applicationId,empStar)=>{
    const params = {
      dismissReason,
      applicationId,
      empStar
    };
    try {
      await refuseInterview(params)
      await  this.initializeAllApplication();
    } catch (e) {
    }
  }


  @action.bound
   hrArrangeInterview = async (empStar, formData , record)=>{

      const params = {
        empStar ,
        applicationId : record.applicationId,
        ...formData,
      }

     try {
        await arrangeInterview(params);
        await this.initializeAllApplication();
     } catch (e) {}
   }

   //改hr
   @observable
  applicationList = [];

  @action.bound
  initializeAllApplication  = async ()=>{
    try {
      const applicationList = (await getAllApplication()).data;

      applicationList.forEach((item)=>{
         item.key = item.applicationId;
      })

      this.applicationList = applicationList;
    } catch (e) {
    }
  }


}

export default new HrStore();
