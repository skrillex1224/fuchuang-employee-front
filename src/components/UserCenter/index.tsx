import React from "react";
import {observer} from "mobx-react";
import ProCard from '@ant-design/pro-card';
import {Avatar, Button, Card, Col, Descriptions, Row, Statistic} from "antd";
import {UserOutlined} from "@ant-design/icons/lib";

import styles from './index.less'
const { Divider } = ProCard;

@observer
export default class UserCenter extends React.Component<any, any>{


    render() {
      return (
          <>
            <ProCard  ghost gutter={20} >
              <ProCard layout="center" bordered colSpan={9}>
                <Row gutter={[16, 16]} align={'middle'} justify={'center'} wrap={true}>
                  <Col className={styles.col} span={24}>
                        <Avatar icon={<UserOutlined/>} size={"large"} style={{width:'100px',height:'100px',fontSize:'70px',lineHeight:'90px'}}/>
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
                      extra={<Button type="primary">修改个人信息</Button>}
                    >
                      <Descriptions.Item label="真实姓名">付敬华</Descriptions.Item>
                      <Descriptions.Item label="手机号码">18735380816</Descriptions.Item>
                      <Descriptions.Item label="最高学历">大学本科</Descriptions.Item>
                      <Descriptions.Item label="毕业院校">天津工业大学</Descriptions.Item>
                      <Descriptions.Item label="性别">男</Descriptions.Item>
                      <Descriptions.Item label="登录密码">*********</Descriptions.Item>
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
                        <Button type="primary" style={{width:'100%'}}>查看我的简历</Button>
                      </Descriptions.Item>

                    </Descriptions>

                  </Col>


                </Row>
                <Row gutter={[16, 16]}>
                  <Col span={6} />
                  <Col span={6} />
                  <Col span={6} />
                  <Col span={6} />
                </Row>
              </ProCard>
              <ProCard layout="center" bordered colSpan={14}>
                卡片内容
              </ProCard>
            </ProCard>
          </>
      )
    }

}
