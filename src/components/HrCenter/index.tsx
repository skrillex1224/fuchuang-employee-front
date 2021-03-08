import React, {CSSProperties} from "react";
import {observer} from "mobx-react";
import ProCard from '@ant-design/pro-card';
import {Avatar, Button, Card, Col, Descriptions, Input, Rate, Row, Tag} from "antd";
import EditDrawer  from './EditDrawer'

import styles from './index.less'
import ProList from "@ant-design/pro-list";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons/lib";

const gridStyle : CSSProperties= {
  width: '33.33%',
  textAlign: 'center',
};

const data = [
  '语雀的天空',
  'Ant Design',
  '蚂蚁金服体验科技',
  'TechUI',
  'TechUI 2.0',
  'Bigfish',
  'Umi',
  'Ant Design Pro',
].map((item) => ({
  title: item,
  subTitle: <Tag color="#5BD8A6">语雀专栏</Tag>,
  actions: [<a>查看公司详细信息</a>],
  avatar: 'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
  content: (
    <div
      style={{
        flex: 1,
      }}
    >
        <div>公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介
          司简介公司简介公司简介公司简介公司简介公司简介
          司简介公司简介公司简介公司简介公司简介公司简介</div>
    </div>
  ),
}));

@observer
export default class UserCenter extends React.Component<any, any>{

    state = {
       visible : false,
       type : 'hr',
    }

    setVisible = (visible : boolean )=>{
      this.setState({visible})
    }


  showDrawer = ()=>{
      this.setVisible(true);
  }

    render() {
      const {visible, type } = this.state;
      return (
          <>
            <ProCard  ghost={true} gutter={20}  >
              <ProCard hoverable style={{maxHeight:800}} layout="default" bordered colSpan={8} >
                <Row gutter={[16, 16]} align={'top'} justify={'center'} wrap={true}>
                  <Col span={24} style={{display:'flex',justifyContent:'center'}}   >
                        <Avatar  src={'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'}  style={{width:'100px',height:'100px',fontSize:'70px',lineHeight:'90px'}}/>
                  </Col>
                  <Col style={{display:'flex',justifyContent:'center'}}  span={24}>
                        <div style={{fontSize:30}}>HR付敬华</div>
                  </Col>
                  <Col span={24}>
                    <Card style={{ width: '100%' }} >
                     sdadadadad
                    </Card>
                  </Col>

                  <Col span={24}>
                    <Descriptions
                      bordered
                      title="个人信息"
                      column={2}
                      extra={<Button type="primary" onClick={this.showDrawer}>修改个人信息</Button>}
                    >
                      <Descriptions.Item label="真实姓名">付敬华</Descriptions.Item>
                      <Descriptions.Item label="手机号码">18735380816</Descriptions.Item>
                      <Descriptions.Item label="性别">男</Descriptions.Item>
                      <Descriptions.Item label="登录密码">*********</Descriptions.Item>
                      <Descriptions.Item label="身份证号码" span={4}>
                        <Input.Password readOnly={true}
                          value='140107199912043918'
                          bordered={false}
                          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                      </Descriptions.Item>
                      <Descriptions.Item span={4} label={'人脸图片信息'}>
                        <Button type="primary" style={{width:'100%'}} onClick={()=>{window.location.href= '/employee/resume'}}>查看人像图片</Button>
                      </Descriptions.Item>

                    </Descriptions>

                  </Col>


                </Row>
              </ProCard>
              <ProCard  ghost={true} layout="default" bordered colSpan={16} direction={'column'} gutter={[20,20]}>
                <ProCard  layout="default" bordered colSpan={24}  title={'wos'} extra={'当前任职的公司'}>
                    <ProCard style={{ width: '100%' }} hoverable bordered>
                       公司介绍
                    </ProCard>
                </ProCard>

                <ProCard  layout="default" bordered colSpan={24}  title={'进行中的课程'}>
                  <Card.Grid style={gridStyle}>Content</Card.Grid>
                  <Card.Grid  style={gridStyle}>
                    Content
                  </Card.Grid>
                  <Card.Grid style={gridStyle}>Content</Card.Grid>
                  <Card.Grid style={gridStyle}>Content</Card.Grid>
                  <Card.Grid style={gridStyle}>Content</Card.Grid>
                  <Card.Grid style={gridStyle}>Content</Card.Grid>
                  <Card.Grid style={gridStyle}>Content</Card.Grid>
                </ProCard>

                <ProCard  layout="default" bordered colSpan={24} >
                  <ProList
                    grid={{ gutter: 16, column: 1 }}
                    metas={{
                      title: {},
                      subTitle: {},
                      type: {},
                      avatar: {},
                      content: {},
                      actions: {},
                    }}
                    headerTitle="历史互动公司列表:"
                    dataSource={data}
                  />
                </ProCard>

              </ProCard>
            </ProCard>

            <EditDrawer visible={visible} setVisible={this.setVisible} type={type} />
          </>
      )
    }

}
