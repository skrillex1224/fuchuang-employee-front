import React from "react";
import {observer} from "mobx-react";
import {PageContainer} from "@ant-design/pro-layout";
import {Form, FormInstance, message, Modal, Rate, Select, Space, Tag} from "antd";
import ProList from "@ant-design/pro-list";
import {SwapRightOutlined} from "@ant-design/icons/lib";
import TextArea from "antd/es/input/TextArea";
import {getEmployedEmployeeList} from "@/apis/enterprise";

const dataSource = [
  {
    id: '1',
    name: '语雀的天空',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    id: '2',
    name: 'Ant Design',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    id: '3',
    name: '蚂蚁金服体验科技',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    id: '4',
    name: 'TechUI',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    id: '1',
    name: '语雀的天空',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    id: '2',
    name: 'Ant Design',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    id: '3',
    name: '蚂蚁金服体验科技',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    id: '4',
    name: 'TechUI',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    id: '1',
    name: '语雀的天空',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    id: '2',
    name: 'Ant Design',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    id: '3',
    name: '蚂蚁金服体验科技',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    id: '4',
    name: 'TechUI',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    id: '1',
    name: '语雀的天空',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    id: '2',
    name: 'Ant Design',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    id: '3',
    name: '蚂蚁金服体验科技',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    id: '4',
    name: 'TechUI',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '<a>我是一条测试的描述</a>',
  },
  {
    id: '1',
    name: '语雀的天空',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    id: '2',
    name: 'Ant Design',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    id: '3',
    name: '蚂蚁金服体验科技',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    id: '4',
    name: 'TechUI',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    id: '1',
    name: '语雀的天空',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    id: '2',
    name: 'Ant Design',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    id: '3',
    name: '蚂蚁金服体验科技',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    id: '4',
    name: 'TechUI',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    id: '1',
    name: '语雀的天空',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    id: '2',
    name: 'Ant Design',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    id: '3',
    name: '蚂蚁金服体验科技',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    id: '4',
    name: 'TechUI',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
];

@observer
export default class Index extends React.Component<any, any>{

  state ={
    dismissModal : false,
    changePostModal : false ,
    // 调岗的结果
    changedPost : 'web前端工程师'
  }

  dismissForm : React.RefObject<FormInstance> = React.createRef<FormInstance>();

  handleDismiss = (rowKey)=>{
    this.setState({dismissModal : true })
    console.log('id: ', rowKey)
  }

  handleChangePost = (rowKey) =>{
    this.setState({changePostModal : true})
     console.log('id',rowKey)
  }


  handleSubmit = async ()=>{
    const {dismissModal,changePostModal} = this.state;

    if(dismissModal){
       const {current : formRef} = this.dismissForm;

      try {
        await formRef?.validateFields();

        const vals = formRef?.getFieldsValue();
        console.log(vals, 'vals')
        this.setState({changePostModal: false ,dismissModal : false  })

      } catch (e) {}
    }

    if(changePostModal){
      message.success('调岗通知已发送至该员工');
      this.setState({changePostModal: false ,dismissModal : false  })
    }


  }

  async componentDidMount() {
    try {
       const responseList = (await getEmployedEmployeeList()).data;
       console.log(responseList)
    } catch (e) {}
  }

  render() {
    const {dismissModal,changePostModal} = this.state;
      return (
        <PageContainer>
          <Modal title={
            changePostModal ? '请选择调职的目标岗位' : '请完善辞退信息表'
          } visible={changePostModal || dismissModal } onOk={this.handleSubmit} onCancel={()=>{this.setState({changePostModal: false ,dismissModal : false  })}}>
            {
              changePostModal && (
                <>
                    从&nbsp;&nbsp;&nbsp;  {'web前端工程师'} &nbsp;&nbsp; <SwapRightOutlined style={{fontSize:20}} />&nbsp;&nbsp;
                     <Select defaultValue="lucy" style={{ width: 120 }} bordered={false} onChange={(changedPost)=>{
                        this.setState({changedPost})
                     }}>
                          <Select.Option value="jack">Jack</Select.Option>
                          <Select.Option value="lucy">Lucy</Select.Option>
                          <Select.Option value="disabled" >
                            Disabled
                          </Select.Option>
                          <Select.Option value="Yiminghe">yiminghe</Select.Option>
                     </Select>
                </>
              )
            }

            {
              dismissModal &&  (
                <Form requiredMark={true} layout={'vertical'} ref={this.dismissForm}>
                   {/*不加name不收集表单值*/}
                   <Form.Item name={'dismissReason'} required={true} label={"请完善辞退原因:"} rules={[{required:true, message:'请完善辞退信息'}]}>
                     <TextArea allowClear  rows={4} showCount={true}   />
                   </Form.Item>
                  <Form.Item required={true} name={'rate'} label={"请为该员工进行打分:"} rules={[{required:true, message:'请为该员工打分'}]}>
                    <Rate allowHalf defaultValue={2.5} />
                  </Form.Item>
                </Form>
              )
            }
          </Modal>

          <ProList<typeof dataSource[number]>
            rowKey="id"
            headerTitle="在职人员列表"
            dataSource={dataSource}
            showActions="hover"
            editable={{
              onChange: (e) => console.log(e),
            }}
            pagination={{
              defaultPageSize: 8,
              showSizeChanger: true,
            }}
            metas={{
              title: {
                dataIndex: 'name',
              },
              avatar: {
                dataIndex: 'image',
              },
              description: {
                dataIndex: 'desc',
              },
              subTitle: {
                render: () => {
                  return (
                    <Space size={0}>
                      <Tag color="blue">web前端工程师</Tag>
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
        </PageContainer>
      )
  }
}


