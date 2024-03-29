import {action, makeObservable, observable} from "mobx";
import {getAllApplicationInterview, empSubmitResume, getAllHireInfo, getEmpInfo, getHireInfoByEnterName, getEmpInvolvedInterview, getCourseList, signUpCourse, applyRecheck} from "@/apis/employee";

class EmployeeStore {
  constructor() {
     makeObservable(this)
  }


  //申请复核
  @action.bound
  recheckApply = async (params)=>{
    try {
      await applyRecheck(params);
    } catch (e) {
    }
  }




  @action.bound
  chooseCourse = async  (courseId)=>{
    try {
      await signUpCourse({courseId});
      await  this.initializeCourseList();
    } catch (e) {
    }
  }


  //剩余课程
  @observable
  restCourseList = [];

  @action.bound
  initializeCourseList = async  ()=>{
    try {
      this.restCourseList = (await getCourseList()).data;
    } catch (e) {
    }
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

  //当前用户已经结束的历史面试信息
  @observable
  passedInterviewList = [];

  @action.bound
  initializePassedInterviewList = async()=>{
    try {
      this.passedInterviewList =  (await getEmpInvolvedInterview()).data;
    } catch (e) {
    }
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

  //重新渲染
  @action.bound
  rerenderHireInfo = (hireInfoList)=>{
     this.hireInfoList = hireInfoList;
  }

  //搜索
  @action.bound
  rerenderHireInfoBySearch = async  (enterpriseName)=>{
    try {
      this.hireInfoList = (await getHireInfoByEnterName({enterpriseName})).data;
    } catch (e) {
    }
  }

  //投递简历
  @action.bound
  submitEmpResume = async  (enterpriseId)=>{
    try{
       await empSubmitResume({enterpriseId});
    }catch{}
  }

}

export default new EmployeeStore()
