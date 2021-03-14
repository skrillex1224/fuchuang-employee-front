import React, {CSSProperties} from "react";
import {observer} from "mobx-react";
import ProCard from '@ant-design/pro-card';
import {Avatar, Button, Card, Col, Descriptions, PageHeader, Rate, Row, Tag} from "antd";
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
       type : 'employee',
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
              <ProCard hoverable style={{maxHeight:1000}} layout="default" bordered colSpan={8} >
                <Row gutter={[16, 16]} align={'top'} justify={'center'} wrap={true}>
                  <Col className={styles.col} span={24}>
                        <Avatar  src={'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg'}  style={{width:'100px',height:'100px',fontSize:'70px',lineHeight:'90px'}}/>
                  </Col>
                  <Col className={styles.col} span={24}>
                        <div style={{fontSize:30}}>付敬华</div>
                  </Col>
                  <Col className={styles.col} span={24}>
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
                      <Descriptions.Item label="最高学历">大学本科</Descriptions.Item>
                      <Descriptions.Item label="毕业院校">天津工业大学</Descriptions.Item>
                      <Descriptions.Item label="性别">男</Descriptions.Item>
                      <Descriptions.Item label="登录密码">*********</Descriptions.Item>
                      <Descriptions.Item label="个人综合评分" span={4}>
                        <Rate disabled defaultValue={4.5} allowHalf/>
                      </Descriptions.Item>
                      <Descriptions.Item label="理想工作方向" span={4}>
                        Data disk type: MongoDB
                        <br />
                        Database version: 3.4
                        <br />
                        Package: dds.mongo.mid
                        <br />
                        Storage space: 10 GB
                        <br />
                        Replication factor: 3
                        <br />
                        Region: East China 1<br />
                      </Descriptions.Item>
                      <Descriptions.Item span={4} label={'简历信息'}>
                        <Button type="primary" style={{width:'100%'}} onClick={()=>{window.location.href= '/employee/resume'}}>查看我的简历</Button>
                      </Descriptions.Item>

                    </Descriptions>

                  </Col>


                </Row>
              </ProCard>
              <ProCard  ghost={true} layout="default" bordered colSpan={16} direction={'column'} gutter={[20,20]}>
                <ProCard  layout="default" bordered colSpan={24}  title={'维诺智创软件公司'} extra={'当前任职的公司'}>
                    <ProCard style={{ width: '100%' }} hoverable bordered>
                       公司介绍
                    </ProCard>
                </ProCard>

                <PageHeader
                  ghost={false}
                  title="当前正在进行中的课程"
                  subTitle="Processing"
                  style={{marginBottom:'20px'}}
                  extra={[
                    <Button key="3">Operation</Button>,
                    <Button key="2">Operation</Button>,
                    <Button key="1" type="primary">
                      Primary
                    </Button>,
                  ]}
                >
                  <Descriptions size="small" column={3}>
                    <Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
                    <Descriptions.Item label="Association">
                      <a>421421</a>
                    </Descriptions.Item>
                    <Descriptions.Item label="Creation Time">2017-01-10</Descriptions.Item>
                    <Descriptions.Item label="Effective Time">2017-10-10</Descriptions.Item>
                    <Descriptions.Item label="Remarks">
                      Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
                    </Descriptions.Item>
                  </Descriptions>
                </PageHeader>


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
