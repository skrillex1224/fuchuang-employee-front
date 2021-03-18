import {action, makeObservable, observable} from "mobx";
import {deleteOneHireinfo, dismissFormSubmit, getEmployedEmployeeList, getEnterpriseByAccount, getPassedEmployeeList, inviteToEnter, submitHireInfo, switchPost} from "@/apis/enterprise";


class EnterpriseStore{
    constructor() {
      makeObservable(this)
    }

    //企业个人信息
    @observable
    enterpriseInfo : any = {};

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

  @action.bound
    rerenderHireEmployeeList = async  (hireEmployeeList)=>{
    try {
      this.hireEmployeeList= hireEmployeeList;
    } catch (e) {}
  }


  // 发布招聘信息
  @action.bound
  publishHireinfoForm = async (params)=>{
      try{
        await submitHireInfo(params);
        return 1;
      }catch(e){
        throw new Error(e);
      }
  }

  // 删除正在进行的招聘信息
  @action.bound
  deleteHireInfoWithId = async (hireInfoId)=>{
    try {
      await deleteOneHireinfo({hireInfoId});
    } catch (e) {}
  }

  //解雇原因表单提交
  @action.bound
  dismissEmployee = async (params)=>{
    try {
      await dismissFormSubmit(params);
      await  this.initializeEmployedList();
    } catch (e) {
    }
  }


  //调岗
  @action.bound
  changeThePost = async (params)=>{
    try {
      await switchPost(params);
      await  this.initializeEmployedList();
    } catch (e) {
    }
  }


  @action.bound
  inviteToEnterprise = async  (empId)=>{
    try {
      await inviteToEnter({empId});
    } catch (e) {
    }
  }

}

export default new EnterpriseStore();
