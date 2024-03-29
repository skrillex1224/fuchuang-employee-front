import React, {createRef} from "react";
import {Drawer, Form, Button, Col, Row, Input, Select, message, InputNumber, Calendar} from 'antd';
import {EyeInvisibleOutlined, EyeTwoTone, InboxOutlined} from "@ant-design/icons/lib";
import Dragger from "antd/es/upload/Dragger";

const { Option } = Select;

export default  class DrawerForm extends React.Component<any> {

  employeeForm : any  = createRef();
  enterpriseForm : any = createRef();
  hrForm : any = createRef();

  state = {
     empFileList : [],
  }

  onClose = () => {
    this.props.setVisible(false);
  };

  /**employee*/
   employeeUploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
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
        message.success(`${info.file.name} 文件上传成功!`);
      } else if (status === 'error') {
        message.error(`${info.file.name}文件上传失败!`);
      }
    },
  };
  /**employee*/

  /**Enterprise*/
  enterpriseUploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
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
        message.success(`${info.file.name} 文件上传成功!`);
      } else if (status === 'error') {
        message.error(`${info.file.name}文件上传失败!`);
      }
    },
  };

  /**Enterprise*/

  render() {
    const {visible,type} = this.props
    return (
      <>
        <Drawer
          title={`${{
            true : '企业法人信息修改',
            false : '企业信息修改'
          }[this.props.isLawer]}`}
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
              <Button onClick={this.onClose} type="primary">
                提交
              </Button>
            </div>
          }
        >
          {/*不同的人申请不同的表*/}
          {
            {
              enterprise: (
                <Form layout="vertical" ref={this.enterpriseForm} >
                  {
                    this.props.isLawer ||
                    <>
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
                            rules={[{ required: true, message: '请输入企业邮箱' }]}
                          >
                            <Input
                              style={{ width: '100%' }}
                              addonAfter={<Select defaultValue="@qq.com" className="select-after">
                                <Option value="@qq.com">@qq.com</Option>
                                <Option value="@163.com">@163.com</Option>
                                <Option value="@139.com">@139.com</Option>
                                <Option value="@126.com">@126.com</Option>
                                <Option value="@gmail.com">@gmail.com</Option>
                                <Option value="@hotmail.com">@hotmail.com</Option>
                                <Option value="@sina.com">@sina.com</Option>
                              </Select>}
                              placeholder={'please enter the email'}
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
                    </>
                  }
                  <Row gutter={16}>
                    <Col span={this.props.isLawer ? 12 : 8}>
                      <Form.Item
                        name="enterpriseCorperationName"
                        label="企业法人姓名:"
                        rules={[{ required: true, message: '请输入企业法人姓名' }]}
                      >
                        <Input placeholder={'please enter the name'}/>
                      </Form.Item>
                    </Col>
                    <Col span={this.props.isLawer ? 12 : 8}>
                      <Form.Item
                        //邮箱
                        name="enterpriseCorperationPhoneNumber"
                        label="企业法人手机号:"
                        rules={[{ required: true, message: '请输入企业法人手机号' }]}
                      >
                        <Input
                          style={{ width: '100%' }}
                          prefix={'+86'}
                          placeholder={'please enter your phoneNumber'}
                        />
                      </Form.Item>
                    </Col>

                    {
                      this.props.isLawer ||
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
                    }

                  </Row>

                  {
                    this.props.isLawer ||
                    <>
                      <Row gutter={16}>
                        <Col span={24}>
                          <Form.Item
                            name="enterpriseLocation"
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
                            rules={[{ required: true, message: '请选择企业建立时间' }]}
                          >
                            <Calendar  fullscreen={false} onPanelChange={(value)=>{console.log('timeChange',value)}} />
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
                    </>
                  }
                </Form>
              ),
            }[type]
          }
        </Drawer>
      </>
    );
  }
}
