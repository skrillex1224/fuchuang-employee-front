import {action, makeObservable, observable} from "mobx";
import {getEmployedEmployeeList, getEnterpriseByAccount, getPassedEmployeeList} from "@/apis/enterprise";


class EnterpriseStore{
    constructor() {
      makeObservable(this)
    }

    //企业个人信息
    @observable
    enterpriseInfo = {};

    @action.bound
    initializeEnterpriseInfo = async ()=>{
      try {
        this.enterpriseInfo = (await getEnterpriseByAccount()).data
      } catch (e) {}
    }

    //在职人员列表
    @observable
    employedList = [];

    @action.bound
    initializeEmployedList = async  ()=>{
      try {
        const responseList = (await getEmployedEmployeeList()).data;
        this.employedList = responseList;
      } catch (e) {}
    }

    // 招聘人才列表
    @observable
    hireEmployeeList = [];

    @action.bound
     initializeHireEmployeeList = async  ()=>{
       try {
         const responseList = (await getPassedEmployeeList()).data
         this.hireEmployeeList= responseList;
       } catch (e) {}
     }


}

export default new EnterpriseStore();
