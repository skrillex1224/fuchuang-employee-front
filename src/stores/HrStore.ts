import {action, makeObservable, observable} from "mobx";
import {arrangeInterview, getAllApplication} from "@/apis/hr";


class HrStore {

  constructor() {
    makeObservable(this)
  }

  @action.bound
   hrArrangeInterview = async (params)=>{
     try {
        await arrangeInterview(params);
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
