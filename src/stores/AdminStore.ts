import {action, makeObservable, observable, runInAction} from "mobx";
import {getAllRecheckInfos} from "@/apis/admin";


class AdminStore{
  constructor() {
    makeObservable(this)
  }

  @observable
  recheckInfos = [];

  @action.bound
  initializeRecheckInfos = async  ()=>{
    const recheckInfos = (await getAllRecheckInfos()).data;

    runInAction(()=>{
       this.recheckInfos = recheckInfos;
    })
  }

}

export default new AdminStore();
