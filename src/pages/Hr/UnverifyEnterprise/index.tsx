import React from "react";
import {PageContainer} from "@ant-design/pro-layout";
import {Alert, Button, Card, Col, Descriptions, List, Row} from "antd";
import styles from "@/components/EnterpriseCenter/index.less";
import ProCard from "@ant-design/pro-card";

const dataSource : {id: number}[]= [];
for (let i = 0; i < 1000; i++) {
  dataSource.push({
    id : i
  })
}

export default class  Index extends React.Component<any, any>{
  auditEnterprise= (item)=>{
     console.log(item)
  }

  render(): React.ReactNode {
    return (
      <PageContainer>
        <Alert style={{marginBottom:'20px'}} banner={true} message="欢迎您,HR,以下是刚刚新注册公司列表,在公司通过注册前需要通过您的审核,您可以通过点击对应公司的卡片来对该公司的注册信息进行操作"
               type="warning"  closable={true} />
        <List
         grid={{
           column:2,
         }}
          dataSource={dataSource}
          pagination={{
            defaultPageSize:10
          }}
          renderItem={ item =>{
          return (
                 <ProCard onClick={()=>{this.auditEnterprise(item)}} hoverable={true} style={{marginBottom:'40px'}} layout="default" bordered colSpan={22}  >
                  <Row gutter={[16, 16]} align={'top'} justify={'center'} wrap={true}>
                    <Col className={styles.col} span={24}>
                      <img
                        style={{width:'100%'}}
                        alt="logo"
                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                      />
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
                          <Button type="link" style={{width:'100%'}} onClick={(e)=>{

                            // window.location.href= '/employee/resume'
                            e.stopPropagation();
                          }}>查看营业执照</Button>
                        </Descriptions.Item>

                      </Descriptions>

                    </Col>
                    <Col span={24}>
                      <Descriptions  style={{marginTop:'40px'}}
                                     bordered
                                     title="法人信息"
                                     column={2}
                      >
                        <Descriptions.Item label="企业法人姓名" span={4}>程福源</Descriptions.Item>
                        <Descriptions.Item label="企业法人手机号" span={4}>18735380816</Descriptions.Item>
                      </Descriptions>


                    </Col>


                  </Row>
                   <h3 style={{marginTop:'20px',fontWeight:'bold'}}> 操作</h3>
                   <Row gutter={[16, 16]} align={'top'} style={{marginTop:'30px'}} justify={'space-around'} wrap={true}>
                     <Button type={"default"} shape={"round"} style={{width:'40%'}}>审核通过该公司</Button>
                     <Button type={"default"} shape={"round"} style={{width:'40%'}} danger>删除该公司注册数据</Button>
                   </Row>
                </ProCard>
          )
        }}>

        </List>
      </PageContainer>
    )
  }
}
