import React, {CSSProperties} from "react";
import {observer} from "mobx-react";
import ProCard from '@ant-design/pro-card';
import {Avatar, Button, Card, Col, Descriptions, Progress, Rate, Row, Tag} from "antd";
import {CrownOutlined, UserOutlined} from "@ant-design/icons/lib";
import EditDrawer  from './EditDrawer'

import styles from './index.less'
import ProList from "@ant-design/pro-list";

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
  actions: [<a>查看详情</a>,<a>修改</a>,<a>删除</a>],
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
       type : 'enterprise',
      isLawer : false
    }

    setVisible = (visible : boolean )=>{
      this.setState({visible})
    }


  showDrawer = (isLawer)=>{
      this.setVisible(true);
      this.setState({isLawer})
  }

    render() {
      const {visible, type } = this.state;
      return (
          <>
            <ProCard  ghost={true} gutter={20}  >
              <ProCard hoverable style={{maxHeight:1200}} layout="default" bordered colSpan={8} >
                <Row gutter={[16, 16]} align={'top'} justify={'center'} wrap={true}>
                  <Col className={styles.col} span={24}>
                        <Avatar icon={<CrownOutlined />} shape={'square'}  size={"large"} style={{width:'100%',height:'200px',fontSize:'120px',lineHeight:'190px'}}/>
                  </Col>
                  <Col className={styles.col} span={24}>
                        <div style={{fontSize:30}}>维诺智创大数据软件公司</div>
                  </Col>
                  <Col className={styles.col} span={24}>
                    <Card style={{ width: '100%' }} >
                     sdadadadad
                    </Card>
                  </Col>

                  <Col span={24}>
                    <Descriptions
                      bordered
                      title="企业信息"
                      column={2}
                      extra={<Button type="primary" onClick={()=>{this.showDrawer(false)}}>修改企业信息</Button>}
                    >
                      <Descriptions.Item label="企业名称">维诺智创</Descriptions.Item>
                      <Descriptions.Item label="企业邮箱">18735380816@qq.com</Descriptions.Item>
                      <Descriptions.Item label="注册资金">200万</Descriptions.Item>
                      <Descriptions.Item label="企业人数">10000人以上</Descriptions.Item>
                      <Descriptions.Item label="企业经营类型">国营</Descriptions.Item>
                      <Descriptions.Item label="企业福利保障">五险一金</Descriptions.Item>
                      <Descriptions.Item label="企业建立时间">2021年2月12日</Descriptions.Item>
                      <Descriptions.Item label="企业登录密码">*********</Descriptions.Item>
                      <Descriptions.Item label="企业注册地址" span={4}>白杨树北一街抬杠大撒大撒</Descriptions.Item>
                      <Descriptions.Item span={4} label={'企业营业执照'}>
                        <Button type="primary" style={{width:'100%'}} onClick={()=>{window.location.href= '/employee/resume'}}>查看营业执照</Button>
                      </Descriptions.Item>

                    </Descriptions>

                  </Col>
                  <Col span={24}>
                    <Descriptions  style={{marginTop:'40px'}}
                      bordered
                      title="法人信息"
                      column={2}
                      extra={<Button type="primary" onClick={()=>{this.showDrawer(true)}}>修改企业法人信息</Button>}
                    >
                      <Descriptions.Item label="企业法人姓名" span={4}>程福源</Descriptions.Item>
                      <Descriptions.Item label="企业法人手机号" span={4}>18735380816</Descriptions.Item>
                    </Descriptions>


                  </Col>


                </Row>
              </ProCard>
              <ProCard  ghost={true} layout="default" bordered colSpan={16} direction={'column'} gutter={[20,20]}>

                <ProCard collapsible={true}  layout="default" bordered colSpan={24}  title={'公司团队成员:'}>
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

                <ProCard title={'正在进行的招聘信息:'} collapsible={true}  layout="default" bordered colSpan={24} >
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
                    dataSource={data}
                  />
                </ProCard>
              </ProCard>
            </ProCard>

            <EditDrawer visible={visible} setVisible={this.setVisible}  type={type}  isLawer={this.state.isLawer}/>
          </>
      )
    }

}
