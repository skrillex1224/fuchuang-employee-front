import React, {createRef} from "react";
import {Drawer, Form, Button, Col, Row, Input, Select, message, InputNumber, Calendar, Upload} from 'antd';
import {EyeInvisibleOutlined, EyeTwoTone, InboxOutlined} from "@ant-design/icons/lib";
import Dragger from "antd/es/upload/Dragger";
import {observer} from "mobx-react";
import {host} from "@/utils/promise";
import {employeeRegister, enterpriseRegister, hrRegister} from "@/apis/login";
import moment from "moment";

const { Option } = Select;

@observer
export default  class DrawerForm extends React.Component<any> {


  employeeForm : any  = createRef();
  enterpriseForm : any = createRef();
  hrForm : any = createRef();

  state = {
     empFileList : [],
    // 企业注册时间选择的state,
     enterpriseEstablishTime : 0, //unix
  }

  onClose = () => {
    this.props.setVisible(false);
  };

  /**employee*/
   employeeUploadProps : any  = {
    name: 'resume',
    multiple: false,
    action: `${host}uploadResume`,
     beforeUpload : file => {
       if (file.type !== 'application/pdf') {
         message.error(`仅支持格式为.pdf的简历,重新上传!`);
       }
       const isLt2M = file.size / 1024 / 1024 < 2;
       if (!isLt2M) {
         message.error('pdf文件必须小于 2MB!');
       }

       return file.type === 'application/pdf' ? true : Upload.LIST_IGNORE;
      },

      onChange : (info : any )=> {
          const { status } = info.file;
          let fileList = [...info.fileList];
          fileList = fileList.slice(-1);
          fileList = fileList.map(file => {
            if (file.response) {
              file.url = file.response.url;
            }
            return file;
          });

          this.setState({ empFileList: fileList });

          if (status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            const ossUrl = info.file.response;
            this.employeeForm.current.setFieldsValue({
              employeeResume : ossUrl
            })

            message.success(`${info.file.name} 文件上传成功!`);
          } else if (status === 'error') {
            message.error(`${info.file.name}文件上传失败!`);
          }
    },
  };
  /**employee*/

  /**Enterprise*/
  enterpriseUploadProps = {
    name: 'license',
    multiple: false,
    action: `${host}uploadLicense`,
    beforeUpload : file => {
      if (file.type !== 'application/pdf') {
        message.error(`仅支持格式为.pdf的营业执照,重新上传!`);
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('pdf文件必须小于 2MB!');
      }

      return file.type === 'application/pdf' ? true : Upload.LIST_IGNORE;
    },
    onChange : (info : any )=> {
      const { status } = info.file;
      let fileList = [...info.fileList];
      fileList = fileList.slice(-1);
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.url;
        }
        return file;
      });

      this.setState({ empFileList: fileList });


      if (status !== 'uploading') {


        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        const ossUrl = info.file.response;
        this.enterpriseForm.current.setFieldsValue({
          enterpriseLicense : ossUrl
        })

        message.success(`${info.file.name} 文件上传成功!`);
      } else if (status === 'error') {
        message.error(`${info.file.name}文件上传失败!`);
      }
    },
  };

  /*提交功能*/
  onSubmit =async ()=>{
    const {type,setVisible} = this.props;

    try {
      switch (type) {
        case 'employee':
          const {current: empFormRef} = this.employeeForm
          //验证表单
          await empFormRef.validateFields();
          const empData = empFormRef.getFieldsValue();
          //处理傻逼后端解决不了的json问题
          empData.employeeWillingJob = JSON.stringify(empData.employeeWillingJob);


          message.loading({content: '注册中,请稍等....',key : 'register'})
          /*请求接口*/
          await employeeRegister(empData);
          break;

        case 'enterprise':
          const {current: enterFormRef} = this.enterpriseForm
          //验证表单
          await enterFormRef.validateFields();
          const enterpriseData = enterFormRef.getFieldsValue();
          enterpriseData.enterpriseEstablishTime  = this.state.enterpriseEstablishTime;
          message.loading({content: '注册中,请稍等....',key : 'register'})
          /*请求接口*/
          await enterpriseRegister(enterpriseData);
          break;
        case 'hr':
          const {current: hrFormRef} = this.hrForm;
          await hrFormRef.validateFields();
          const hrData = hrFormRef.getFieldsValue();
          message.loading({content: '注册中,请稍等....',key : 'register'})
          await hrRegister(hrData);
          break;
      }
      setVisible(false);
    } catch (e) {
      message.destroy('register')
      return ;
    }

    //关闭
    message.destroy('register')
    setVisible(false);

  }


  /**Enterprise*/

  render() {
    const {visible,type} = this.props
    return (
      <>
        <Drawer
          title={`${{
            employee : '信息修改',
            enterprise : '信息修改',
            hr : '信息修改',
            admin : '信息修改'
          }[type]}`}
          width={720}
          onClose={this.onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                取消
              </Button>
              <Button onClick={this.onSubmit} type="primary">
                提交
              </Button>
            </div>
          }
        >
          {/*不同的人申请不同的表*/}
          {
            {
              employee: (
                <Form layout="vertical" ref={this.employeeForm} >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="employeeName"
                        label="真实姓名:"
                        rules={[{ required: true, message: '请输入您的真实姓名' }]}
                      >
                        <Input placeholder={'please enter your name'}/>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="employeePhoneNumber"
                        label="手机号码:"
                        tooltip='凭此登录'
                        rules={[{ required: true, message: '请输入您的手机号' },{pattern:/^1[3|4|5|7|8][0-9]{9}$/ig, message:'请输入正确格式的手机号'}]}
                      >
                        <Input
                          style={{ width: '100%' }}
                          prefix={'+86'}
                          placeholder={'please enter your phoneNumber'}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="employeePassword"
                        label="请输入登录密码:"
                        rules={[{ required: true, message: 'Please select an owner' }]}
                      >
                        <Input.Password
                          placeholder="input password"
                          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="employeePasswordConfirm"
                        label="请确认登录密码:"
                        rules={[{ required: true, message: 'confirm password' },
                            ({getFieldValue})=>({
                              validator(_, value) {
                                if (!value || getFieldValue('employeePassword') === value) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(new Error('两次密码输入的不一致'));
                              },
                            })
                          ]}
                      >
                        <Input.Password
                          placeholder="input password"
                          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item
                        name="employeeEducation"
                        label="最高学历:"
                        rules={[{ required: true, message: '请选择您的最高学历!' }]}
                      >
                        <Select placeholder="choose...">
                          <Option value="职业高中">职业高中</Option>
                          <Option value="大学专科">大学专科</Option>
                          <Option value="大学本科">大学本科</Option>
                          <Option value="硕士">硕士</Option>
                          <Option value="博士">博士</Option>
                          <Option value="其他">其他</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        name="employeeCollege"
                        label="毕业/就读院校:"
                        rules={[{ required: true, message: '请选择您的毕业/就读院校!' }]}>
                        <Input placeholder={'input your college'}/>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        name="employeeGender"
                        label="性别: "
                        initialValue={'男'}>
                        <Select placeholder={'choose...'}>
                          <Select.Option value={'男'}>男</Select.Option>
                          <Select.Option value={'女'}>女</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        name="employeeWillingJob"
                        label="您理想或擅长的工作方向:(多选)"
                        initialValue={['WEB前端']}
                        rules={[{ required: true,message: '请选择您理想或擅长的工作方向!',},
                        ]}
                      >
                        <Select
                          mode="multiple"
                          showArrow
                          defaultValue={['WEB前端']}
                          style={{ width: '100%' }}
                          placeholder={'choose....'}
                        >
                          <Option value={'Java开发'}>Java开发</Option>
                          <Option value={'PHP开发'}>PHP开发</Option>
                          <Option value={'WEB前端'}>WEB前端</Option>
                          <Option value={'大数据'}>大数据</Option>
                          <Option value={'Linux运维'}>Linux运维</Option>
                          <Option value={'Android'}>Android</Option>
                          <Option value={'IOS'}>IOS</Option>
                          <Option value={'C/Python'}>C/Python</Option>
                          <Option value={'软件测试'}>软件测试</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        name="employeeResume"
                        label="上传简历:"
                        rules={[{ required: true, message: '请上传简历' },]}
                      >
                        <Dragger {...this.employeeUploadProps}  fileList={this.state.empFileList}>
                          <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                          </p>
                          <p className="ant-upload-text">上传您的简历</p>
                          <p className="ant-upload-text">拖拽或点击进行简历的上传</p>
                        </Dragger>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        name="employeeInfo"
                        label="个人简介:"
                      >
                        <Input.TextArea rows={6} placeholder="introduce yourself...." />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              ),
              enterprise: (
                <Form layout="vertical" ref={this.enterpriseForm} >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="enterpriseName"
                        label="企业名称:"
                        rules={[{ required: true, message: '请输入企业名称' }]}
                      >
                        <Input placeholder={'please enter the name'}/>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        //邮箱
                        name="enterpriseAccount"
                        label="企业邮箱:"
                        tooltip='凭此登录'
                        rules={[{ required: true, message: '请输入企业邮箱' },{pattern:/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/ig, message:'请输入正确格式的邮箱'}]}
                      >
                        <Input
                          style={{ width: '100%' }}
                          placeholder={'please enter the email'}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="enterprisePassword"
                        label="请输入登录密码:"
                        rules={[{ required: true, message: 'Please select an owner' }]}
                      >
                        <Input.Password
                          placeholder="input password"
                          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="enterprisePasswordConfirm"
                        label="请确认登录密码:"
                        rules={[{ required: true, message: 'confirm password' },
                          ({getFieldValue})=>({
                            validator(_, value) {
                              if (!value || getFieldValue('enterprisePassword') === value) {
                                return Promise.resolve();
                              }
                              return Promise.reject(new Error('两次密码输入的不一致'));
                            },
                          })
                        ]}
                      >
                        <Input.Password
                          placeholder="input password"
                          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item
                        name="enterpriseRegisterAmount"
                        label="注册资金:"
                        rules={[{ required: true, message: '请输入企业注册资金' }]} extra={'单位(万)'}>
                        <InputNumber  style={{width:'200px'}} min={1} max={20000} placeholder={'amounts'}  />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        name="enterpriseNumsPerson"
                        label="企业人数:"
                        rules={[{ required: true, message: '请输入企业人数' }]}>
                        <InputNumber style={{width:'200px'}} min={1} max={20000} placeholder={'nums'}  />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        name="enterpriseType"
                        label="企业经营类型: "
                        rules={[{ required: true, message: '请选择企业类型' }]}>
                        <Select placeholder={'choose...'}>
                          <Select.Option value={'合资'}>合资</Select.Option>
                          <Select.Option value={'独资'}>独资</Select.Option>
                          <Select.Option value={'国有'}>国有</Select.Option>
                          <Select.Option value={'私营'}>私营</Select.Option>
                          <Select.Option value={'全民所有制'}>全民所有制</Select.Option>
                          <Select.Option value={'集体所有制'}>集体所有制</Select.Option>
                          <Select.Option value={'股份制'}>股份制</Select.Option>
                          <Select.Option value={'有限责任'}>有限责任</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item
                        name="enterpriseCorperationName"
                        label="企业法人姓名:"
                        rules={[{ required: true, message: '请输入企业法人姓名' }]}
                      >
                        <Input placeholder={'please enter the name'}/>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        //邮箱
                        name="enterpriseCorperationPhoneNumber"
                        label="企业法人手机号:"
                        rules={[{ required: true, message: '请输入企业法人手机号' },{pattern:/^1[3|4|5|7|8][0-9]{9}$/ig, message:'请输入正确格式的手机号'}]}
                      >
                        <Input
                          style={{ width: '100%' }}
                          prefix={'+86'}
                          placeholder={'please enter your phoneNumber'}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        //邮箱
                        name="enterpriseWelfare"
                        label="企业福利保障:"
                        rules={[{ required: true, message: '请选择企业福利保障' }]}
                      >
                        <Select placeholder={'choose...'}>
                          <Select.Option value={'五险一金'}>五险一金</Select.Option>
                          <Select.Option value={'六险一金'}>六险一金</Select.Option>
                          <Select.Option value={'无'}>无</Select.Option>
                          <Select.Option value={'其他'}>其他</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>

                  </Row>

                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        name="enterpriseRegisterLocation"
                        label="企业注册地址"
                        rules={[{ required: true,message: '请填写企业注册地址!',},
                        ]}
                      >
                        <Input placeholder={'山西省太原市杏花岭区白杨树北一街276号'}/>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="enterpriseLicense"
                        label="上传企业营业执照:"
                        rules={[{ required: true, message: '请上传企业营业执照' }]}
                      >
                        <Dragger height={300} {...this.enterpriseUploadProps} fileList={this.state.empFileList}>
                          <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                          </p>
                          <p className="ant-upload-text">上传企业营业执照</p>
                          <p className="ant-upload-text">拖拽或点击进行执照的上传</p>
                        </Dragger>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="enterpriseEstablishTime"
                        label="企业建立时间:"
                        rules={[{ validator : ()=>{
                              const {enterpriseEstablishTime} = this.state;
                              if(!enterpriseEstablishTime){
                                  return Promise.reject() ;
                              }
                              return Promise.resolve();
                          },message:'请选择企业建立时间!'}]}
                      >
                        {/*组件不显示问题:::::::::::::::::::::::::::*/}
                        {/*{*/}
                        {/*  ({setFieldsValue}) =>*/}
                        {/*    (<Calendar  fullscreen={false} onChange={(value)=>{*/}
                        {/*      setFieldsValue({*/}
                        {/*        enterpriseEstablishTime : moment(value).unix()*/}
                        {/*      })*/}
                        {/*    }} />)*/}
                        {/*}*/}
                        <Calendar  fullscreen={false} onChange={(value)=>{
                          this.setState({enterpriseEstablishTime: moment(value).unix()})
                        }} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        name="employeeInfo"
                        label="企业简介:"
                        rules={[{ required: true,message: '请输入企业简介!'}]}
                      >
                        <Input.TextArea rows={6} placeholder="leave a short introduce...." />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              ),
              hr:(
                <Form layout="vertical" ref={this.hrForm} >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="hrRealname"
                        label="真实姓名:"
                        rules={[{ required: true, message: '请输入您的真实姓名' }]}
                      >
                        <Input placeholder={'please enter your name'}/>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="hrPhoneNumber"
                        label="手机号码:"
                        tooltip='凭此登录'
                        rules={[{ required: true, message: '请输入您的手机号' },{pattern:/^1[3|4|5|7|8][0-9]{9}$/ig, message:'请输入正确格式的手机号'}]}
                      >
                        <Input
                          style={{ width: '100%' }}
                          prefix={'+86'}
                          placeholder={'please enter your phoneNumber'}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="hrPassword"
                        label="请输入登录密码:"
                        rules={[{ required: true, message: 'Please select an owner' }]}
                      >
                        <Input.Password
                          placeholder="input password"
                          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="hrPasswordConfirm"
                        label="请确认登录密码:"
                        rules={[{ required: true, message: 'confirm password' },
                          ({getFieldValue})=>({
                            validator(_, value) {
                              if (!value || getFieldValue('hrPassword') === value) {
                                return Promise.resolve();
                              }
                              return Promise.reject(new Error('两次密码输入的不一致'));
                            },
                          })
                        ]}
                      >
                        <Input.Password
                          placeholder="input password"
                          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={16}>
                      <Form.Item
                        name="hrIdCard"
                        label="身份证号:"
                        rules={[{ required: true, message: '请输入您的身份证号!' },{pattern:/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,message
                        :"请输入正确的身份证号"}]}
                      >
                          <Input placeholder={'140137162356423962'}/>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        name="hrGender"
                        label="性别: "
                        initialValue={'男'}>
                        <Select placeholder={'choose...'}>
                          <Select.Option value={'男'}>男</Select.Option>
                          <Select.Option value={'女'}>女</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        name="hrInfo"
                        label="个人简介:"
                      >
                        <Input.TextArea rows={6} placeholder="introduce yourself...." />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              ),

            }[type]
          }
        </Drawer>
      </>
    );
  }
}
