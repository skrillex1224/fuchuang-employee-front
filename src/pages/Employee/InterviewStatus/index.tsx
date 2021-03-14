import React from "react";
import {PageContainer} from "@ant-design/pro-layout";
import ProCard from "@ant-design/pro-card";
import {AlertFilled, CloseSquareFilled} from "@ant-design/icons/lib";
import {Button, Card, DatePicker, Descriptions, Empty, message, Modal, Popconfirm, Steps, TimePicker} from "antd";
import moment from "moment";
import EmployeeStore from "@/stores/EmployeeStore";
import {observer} from "mobx-react";
import {deleteByApplicationId} from "@/apis/employee";

const {confirm} = Modal;

@observer
export default class Index extends React.Component<any, any>{

  state = {
      visible : false
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleSubmit = ()=>{
    //提示修改申请已提交
    message.loading({content:'loading...',key:'temp'})

    setTimeout(()=>{
      message.destroy('temp')
      message.success('修改申请已提交! 请关注通知消息');
      this.hideModal();
    },1000)


  }

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };

  withdrawResume =async  (applicationId)=>{
    //撤回简历
    await deleteByApplicationId({applicationId});
    await EmployeeStore.initializeInterviewList();
  }

  async componentDidMount() {
    await EmployeeStore.initializeInterviewList();
  }

  render(): React.ReactNode {
    return (
      <PageContainer title={'正在进行的面试'} >
        {
          EmployeeStore.interviewList.map((item  : any ,index)=>{
            //如果 是数组取出0
             if( Array.isArray(item) ){
                item = item[0];
             }
             return (
                <>
                  <ProCard key={index}
                     style={{marginBottom:'40px'}}
                    title={`面试公司:${item.enterprise && item.enterprise.enterpriseName}`}
                    hoverable
                    headerBordered
                    actions={[
                      <div onClick={()=>{
                        message.loading({content:'loading...',key:'msg',duration:0})
                        setTimeout(()=>{
                          message.destroy('msg');
                          setTimeout(()=>{
                            message.success('催促hr成功,请耐心等待~');
                          },400)
                        },400)

                      }}>进度停滞不前?催一下<AlertFilled /></div>,
                      <div>
                        <Popconfirm title="你确定吗？" okText="确认" cancelText="取消" onConfirm={()=>this.withdrawResume(item.applicationId)}>
                          <span>取消该简历投递<CloseSquareFilled /></span>
                        </Popconfirm>
                      </div>
                      ,
                    ]}
                  >
                    <Steps current={{
                        "简历投递成功" : 0,
                        '等待面试' : 2,
                        '简历已投递' : 1
                    }[item.applicationEmpStatus]} >
                      <Steps.Step title="简历已投递" description="等待Hr进行审核"/>
                      <Steps.Step title="简历投递成功" description="等待Hr安排面试时间" />
                      <Steps.Step title="面试时间地点确定" description="线下面试环节,准备好自己" />
                      <Steps.Step title="面试通过" description="面试已通过,请等待公司进行商务联系" />
                    </Steps>

                    <Card style={{marginTop:'20px'}}  bordered type={'inner'}  title={'线下面试信息'}  extra={item.applicationEmpStatus === '等待面试' ? <Button type="primary" onClick={this.showModal}>时间冲突?申请调整</Button> : <div/>}>
                      {
                        item.applicationEmpStatus !== '等待面试' ? <Empty description={'请等待Hr确认线下面试信息'} />
                          :
                          <Descriptions column={2}>
                            <Descriptions.Item label="面试地点">{item.interview && item.interview.interviewLocation}</Descriptions.Item>
                            <Descriptions.Item label="面试时间">{
                              moment(item.interview && item.interview.interviewTime).format("YYYY-MM-DD HH:mm:ss")
                            }</Descriptions.Item>
                          </Descriptions>
                      }
                    </Card>
                  </ProCard>
                </>
             )
          })
        }

        <Modal
          title="您期望的面试时间?"
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
        >
          面试日期: <DatePicker/>   <br/><br/>
          面试时间: <TimePicker  defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
        </Modal>
      </PageContainer>
    )
  }

}
