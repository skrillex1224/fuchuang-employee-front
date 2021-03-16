import React from "react";
import {observer} from "mobx-react";
import {PageContainer} from "@ant-design/pro-layout";
import {Avatar, Form, FormInstance, Modal, Rate, Select, Space, Spin, Tag} from "antd";
import ProList from "@ant-design/pro-list";
import {SwapRightOutlined} from "@ant-design/icons/lib";
import TextArea from "antd/es/input/TextArea";
import EnterpriseStore from "@/stores/EnterpriseStore";

const {Option} =Select;
@observer
export default class Index extends React.Component<any, any>{

  state ={
    dismissModal : false,
    changePostModal : false ,
    // 调岗的结果
    changedPost : 'WEB前端',
    //当前解雇的对象
    currentInstance : {},
    // loading
    isLoading: true
  }

  dismissForm : React.RefObject<FormInstance> = React.createRef<FormInstance>();

  handleDismiss = async  (currentInstance)=>{
    this.setState({dismissModal : true ,currentInstance})
  }

  handleChangePost = (currentInstance) =>{
    this.setState({changePostModal : true,currentInstance,})
  }


  handleSubmit = async ()=>{
    const {dismissModal,changePostModal,currentInstance,changedPost} : any  = this.state;

    if(dismissModal){
       const {current : formRef} = this.dismissForm;

      try {
        await formRef?.validateFields();
        const params = formRef?.getFieldsValue();

        params.empId = currentInstance.employeeId;
        this.setState({isLoading:true})
        await EnterpriseStore.dismissEmployee(params);
        this.setState({changePostModal: false ,dismissModal : false ,isLoading:false ,currentInstance:{}})
      } catch (e) {}
    }

    if(changePostModal){
          const params : any = {};
           //添加employeeId
          params.empId = currentInstance.employeeId;

           //添加调岗位置
          params.targetJob  = changedPost;
          this.setState({isLoading:true})
          await EnterpriseStore.changeThePost(params);

        this.setState({changePostModal: false ,dismissModal : false  ,currentInstance:{},isLoading:false})
    }

  }

  async componentDidMount() {
     await  EnterpriseStore.initializeEmployedList();
     this.setState({isLoading :false})
  }

  render() {
    const {dismissModal,changePostModal} = this.state;
      return (
        <PageContainer>
          <Modal title={
            changePostModal ? '请选择调职的目标岗位' : '请完善辞退信息表'
          } visible={changePostModal || dismissModal } confirmLoading={this.state.isLoading} onOk={this.handleSubmit} onCancel={()=>{this.setState({changePostModal: false ,dismissModal : false  })}}>
            {
              changePostModal && (
                <>
                    从&nbsp;&nbsp;&nbsp;  {JSON.parse(this.state.currentInstance?.employeeWillingJob || "[]")[0] } &nbsp;&nbsp; <SwapRightOutlined style={{fontSize:20}} />&nbsp;&nbsp;
                     <Select defaultValue="WEB前端" style={{ width: 120 }} bordered={false} onChange={(changedPost)=>{
                        this.setState({changedPost})
                     }}>
                       <Option value={'WEB前端'}>WEB前端</Option>
                       <Option value={'Java开发'}>Java开发</Option>
                       <Option value={'PHP开发'}>PHP开发</Option>
                       <Option value={'大数据'}>大数据</Option>
                       <Option value={'Linux运维'}>Linux运维</Option>
                       <Option value={'Android'}>Android</Option>
                       <Option value={'IOS'}>IOS</Option>
                       <Option value={'C/Python'}>C/Python</Option>
                       <Option value={'软件测试'}>软件测试</Option>
                     </Select>
                </>
              )
            }

            {
              dismissModal &&  (
                <Form requiredMark={true} layout={'vertical'} ref={this.dismissForm}>
                   {/*不加name不收集表单值*/}
                   <Form.Item name={'empDismissReason'} required={true} label={"请完善辞退原因:"} rules={[{required:true, message:'请完善辞退信息'}]}>
                     <TextArea allowClear  rows={4} showCount={true}   />
                   </Form.Item>
                  <Form.Item required={true} name={'empStar'} label={"请为该员工进行打分:"} rules={[{required:true, message:'请为该员工打分'}]}>
                    <Rate allowHalf defaultValue={2.5} />
                  </Form.Item>
                </Form>
              )
            }
          </Modal>

          <Spin size={"large"} spinning={this.state.isLoading}>
            <ProList
              rowKey="employeeId"
              headerTitle="在职人员列表"
              dataSource={EnterpriseStore.employedList}
              showActions="hover"
              pagination={{
                defaultPageSize: 8,
                showSizeChanger: true,
              }}
              metas={{
                title: {
                  dataIndex: 'employeeName',
                },
                avatar: {
                  render: ()=>{
                    return <Avatar src={'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg'} />
                  }
                },
                description: {
                  dataIndex: 'employeeInfo',
                },
                subTitle: {
                  dataIndex:'employeeWillingJob',
                  render: (item : any) => {
                    return (
                      <Space size={0}>
                        <Tag color="red">{JSON.parse(item || "[]")[0] }</Tag>
                      </Space>
                    );
                  },
                },
                actions: {
                  render: (text, row, index, action) => [
                    <a
                      onClick={() => {
                        this.handleDismiss(row)
                      }}
                      // key="link"
                    >
                      辞退
                    </a>,
                    <a
                      onClick={() => {
                        this.handleChangePost(row)
                      }}
                      // key="link"
                    >
                      调岗
                    </a>,
                  ],
                },
              }}
            />
          </Spin>
        </PageContainer>
      )
  }
}


