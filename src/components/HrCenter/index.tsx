import React from "react";
import {observer} from "mobx-react";
import ProCard from '@ant-design/pro-card';
import {Avatar, Button, Card, Col, Descriptions, Input,  Row,} from "antd";
import EditDrawer  from './EditDrawer'

import { EyeInvisibleOutlined, EyeTwoTone,  PieChartTwoTone} from "@ant-design/icons/lib";
import {ChartCard, Field, MiniArea, MiniBar,  WaterWave} from "ant-design-pro/lib/Charts"
import numeral from 'numeral';
import moment from 'moment';


//审核公司数目图标
const visitData : any = [];
const beginDay = new Date().getTime();
for (let i = 0; i < 7; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: Math.floor(Math.random() * 100) + 10,
  });
}

//面试场次
const chartData : any = [];
for (let i = 0; i < 20; i += 1) {
  chartData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y1: Math.floor(Math.random() * 100) + 1000,
  });
}



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
              <ProCard  hoverable layout="default" bordered colSpan={8} style={{maxHeight:'1282px'}} >
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

                <Row style={{marginTop:'50px'}} gutter={[16, 16]} align={'top'} justify={'center'} wrap={true}>
                  <WaterWave height={480} title="综合能力已超越其他HR" percent={80} color={'#D42C26'}  />
                </Row>

              </ProCard>
              <ProCard  ghost={true} layout="default" bordered colSpan={16} direction={'column'} gutter={[20,20]}>
                <ProCard style={{
                  textAlign:'center',
                  fontSize:40,
                  color:'#329AFF'
                }}   layout="default" bordered colSpan={24}  >
                    数据统计  <PieChartTwoTone />
                </ProCard>
                <ProCard ghost={true}  layout="default" bordered colSpan={24}  >
                  <ChartCard
                    title="审核简历/安排面试总计"
                    total={numeral(1235).format('0,0')}
                    footer={<Field label="今日审核数" value={numeral(1234).format('0,0')} />}
                    contentHeight={450}
                    hoverable={true}
                  >
                    <MiniArea line height={450} data={visitData} />
                  </ChartCard>
                </ProCard>

                <ProCard ghost={true}  layout="default" bordered colSpan={24}  >
                  <ChartCard
                    hoverable={true}
                    title="审核注册企业总计"
                    total={numeral(1235).format('0,0')}
                    footer={<Field label="今日审核数" value={numeral(1234).format('0,0')} />}
                    contentHeight={400}
                  >
                    <MiniBar height={400} data={visitData} />
                  </ChartCard>
                </ProCard>
              </ProCard>
            </ProCard>

            <EditDrawer visible={visible} setVisible={this.setVisible} type={type} />
          </>
      )
    }

}
