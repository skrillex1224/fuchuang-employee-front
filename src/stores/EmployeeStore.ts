import {action, makeObservable, observable} from "mobx";
import {getAllApplicationInterview, getAllHireInfo, getEmpInfo} from "@/apis/employee";

class EmployeeStore {
  constructor() {
     makeObservable(this)
  }

  @observable
  currentUser = {};

  @action.bound
  initializeCurrentUser = async ()=>{
    try {
     const currentUser =  (await getEmpInfo()).data;
     currentUser.employeeWillingJob = JSON.parse(currentUser.employeeWillingJob || {});
     this.currentUser = currentUser;

    } catch (e) {}

  }

  //当前用户的面试信息,及以前的
  @observable
  interviewList = [];


  initializeInterviewList = async()=>{
    try {
      const interviewList = (await getAllApplicationInterview()).data;
      /*排序
      *
      * 若 a 小于 b，在排序后的数组中 a 应该出现在 b 之前，则返回一个小于 0 的值。*/

      for (let i =0 ; i< interviewList.length ; i++ ) {
        const interview = interviewList[i];
        if(interview.applicationEmpStatus === '等待面试'){
           //取出放入到最前面
            const returnVal =  interviewList.splice(i,1);
            interviewList.unshift(returnVal);
        }
      }

      this.interviewList = interviewList;
    } catch (e) {}
  }


  //获取当前所有的面试信息
  @observable
  hireInfoList = [];

  @action.bound
  initializeHireInfo =async  ()=>{
    try {
      this.hireInfoList = (await getAllHireInfo()).data;
    } catch (e) {}
  }

}

export default new EmployeeStore()
