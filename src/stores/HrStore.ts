import {action, makeObservable, observable} from "mobx";
import {arrangeInterview, auditEnterpriseInfo, delEnterpriseInfo, getAllApplication, getAllEnterpriseList, getAllInterview, getHrInfo, refuseInterview} from "@/apis/hr";


class HrStore {

  constructor() {
    makeObservable(this)
  }

  @observable
  passEnterpriseInfo = async  (enterpriseId)=>{
    try {
      await auditEnterpriseInfo({enterpriseId});
      await this.initializeEnterpriseList();
    } catch (e) {
    }
  }

  /**
   * @param time 2021-03
   */
  @observable
  currentInterviewList :any  = [];

  @action.bound
  loadInterviewInfoByMonth = async  (time)=>{
    try {
      this.currentInterviewList = (await getAllInterview({time})).data;
    } catch (e) {
    }
  }


  // 删除公司
  @observable
  fallbackEnterpriseInfo = async  (enterpriseId)=>{
    try {
      await delEnterpriseInfo({enterpriseId});
      await this.initializeEnterpriseList();
    } catch (e) {
    }
  }


  @observable
  hrInfo = {};

  @action.bound
  initializeHrInfo = async  ()=>{
    try {
      this.hrInfo = (await getHrInfo() ).data;
    } catch (e) {
    }
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
