import {action, makeObservable, observable, toJS} from "mobx";
import {getEmpInfo} from "@/apis/employee";

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

     console.log(toJS(this.currentUser));
    } catch (e) {}

  }


}

export default new EmployeeStore()
