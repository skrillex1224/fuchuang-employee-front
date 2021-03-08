import React, {createRef} from "react";
import {Drawer, Form, Button, Col, Row, Input, Select, } from 'antd';
import {EyeInvisibleOutlined, EyeTwoTone, } from "@ant-design/icons/lib";

export default  class DrawerForm extends React.Component<any> {

  hrForm : any = createRef();

  state = {
     empFileList : [],
  }

  onClose = () => {
    this.props.setVisible(false);
  };


  render() {
    const {visible,type} = this.props
    return (
      <>
        <Drawer
          title={`${{
            hr : 'HR申请',
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
              <Button onClick={this.onClose} type="primary">
                提交
              </Button>
            </div>
          }
        >
          {/*不同的人申请不同的表*/}
          {
            {
              hr:(
                <Form layout="vertical" ref={this.hrForm} >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="hrName"
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
                        rules={[{ required: true, message: '请输入您的手机号' }]}
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
                    <Col span={16}>
                      <Form.Item
                        name="hrIdCard"
                        label="身份证号:"
                        rules={[{ required: true, message: '请输入您的身份证号!' }]}
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
