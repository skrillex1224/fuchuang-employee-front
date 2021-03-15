import {action, makeObservable, observable} from "mobx";
import {getEnterpriseByAccount} from "@/apis/enterprise";


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



}

export default new EnterpriseStore();
