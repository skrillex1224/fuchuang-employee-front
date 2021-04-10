import React from "react";
import {observer} from "mobx-react";
import {PageContainer} from "@ant-design/pro-layout";
import {Avatar, Descriptions, Form, FormInstance, message, Modal, Rate, Select, Space, Spin, Tag} from "antd";
import ProList from "@ant-design/pro-list";
import {InboxOutlined, SwapRightOutlined} from "@ant-design/icons/lib";
import TextArea from "antd/es/input/TextArea";
import EnterpriseStore from "@/stores/EnterpriseStore";
import styles from "@/components/UserCenter/index.less";
import Dragger from "antd/es/upload/Dragger";
import {host} from "@/utils/promise";
import globalAblitity from "@/utils/globalAblitity";

const {Option} =Select;

const props = {
  name: 'resume',
  multiple: false,
  action: `${host}uploadResume`,
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} 文件上传成功.`);
    } else if (status === 'error') {
      message.success(`${info.file.name} 文件上传失败,请重试.`);
    }
  },
};

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
                  <Form.Item required={true} name={'empStar'} label={"请为该员工进行打分:"} rules={[{required:false, message:'请为该员工打分'}]}>
                    <Descriptions className={styles.rateCol} column={1} style={{marginTop:'20px'}} >
                      {
                        globalAblitity.slice(0,8).map((item:any,index)=>
                          <Descriptions.Item style={{verticalAlign:"middle",display:'flex',alignItems:'center'}}  label={item[0]}>
                            <Rate  allowHalf  defaultValue={item[1]}/>
                          </Descriptions.Item>)
                      }

                    </Descriptions>
                  </Form.Item>

                  <Form.Item name={'empLetter'} required={false}label={"推荐信:"} rules={[{required:false, message:'请完善辞退信息'}]}>
                    <Dragger {...props}>
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">上传一封推荐信吧(选填)</p>
                      <p className="ant-upload-hint">
                         您给员工的推荐信越详细,您的公司将会有更高的曝光率
                      </p>
                    </Dragger>
                  </Form.Item>

                   <Form.Item name={'empDismissReason'} required={false} label={"对该员工进行一个评价吧(选填):"} rules={[{required:false, message:'请完善辞退信息'}]}>
                     <TextArea allowClear  rows={4} showCount={true}   />
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


