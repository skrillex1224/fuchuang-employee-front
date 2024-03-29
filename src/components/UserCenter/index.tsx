import React from "react";
import {observer} from "mobx-react";
import ProCard from '@ant-design/pro-card';
import {Avatar, Badge, Button, Card, Col, Descriptions, Empty, Input, Modal, PageHeader, Rate, Row, Tag, Tooltip} from "antd";
import EditDrawer  from './EditDrawer'

import styles from './index.less'
import ProList from "@ant-design/pro-list";
import EmployeeStore from "@/stores/EmployeeStore";
import {SmileOutlined} from "@ant-design/icons/lib";
import moment from "moment";
import globalAblitity from "@/utils/globalAblitity";




@observer
export default class UserCenter extends React.Component<any, any>{

    state = {
       visible : false,
       type : 'employee',
    }


    async componentDidMount(){
      const {initializeCurrentUser,initializePassedInterviewList} = EmployeeStore;
      await initializeCurrentUser();
      await initializePassedInterviewList();
    }

  setVisible = (visible : boolean )=>{
      this.setState({visible})
    }


  showDrawer = ()=>{
      this.setVisible(true);
  }

  handleReaudit = (name)=>{
      Modal.info({
          centered:true,
        title: <>您将要申请复核的信息是<b>{name}</b></>,
          content:`当前的评级为${4}星`,
          okText:'确认复核',
          onOk:()=>{
            return new Promise(async resolve => {
               await EmployeeStore.recheckApply({recheckItem:name, recheckTime: moment().unix()});
               resolve(null);
            })
          },
          maskClosable:true,
      })
  }


    render() {
      const {visible, type } = this.state;
      const {currentUser :{course = {},enterprise ={} , applications = []},currentUser } : any  = EmployeeStore;
      return (
          <>
            <ProCard  ghost={true} gutter={20}  >
              <ProCard hoverable style={{maxHeight:1200}} layout="default" bordered colSpan={8} >
                <Row gutter={[16, 16]} align={'top'} justify={'center'} wrap={true}>
                  <Col className={styles.col} span={24}>
                        <Avatar  src={'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg'}  style={{width:'100px',height:'100px',fontSize:'70px',lineHeight:'90px'}}/>
                  </Col>
                  <Col className={styles.col} span={24}>
                        <div style={{fontSize:30}}>{currentUser.employeeName}</div>
                  </Col>
                  <Col className={styles.col} span={24}>
                    <Card title={<b>个人简介</b>} bordered style={{ width: '100%' }} >
                      {currentUser.employeeInfo}
                    </Card>
                  </Col>

                  <Col span={24}>
                    <Descriptions
                      bordered
                      title="个人信息"
                      column={2}
                      extra={<Button type="primary" onClick={this.showDrawer}>修改个人信息</Button>}
                    >
                      <Descriptions.Item label="真实姓名">{currentUser.employeeName}</Descriptions.Item>
                      <Descriptions.Item label="手机号码">{currentUser.employeePhoneNumber}</Descriptions.Item>
                      <Descriptions.Item label="最高学历">{currentUser.employeeEducation}</Descriptions.Item>
                      <Descriptions.Item label="毕业院校">{currentUser.employeeCollege}</Descriptions.Item>
                      <Descriptions.Item label="性别">{currentUser.employeeGender}</Descriptions.Item>
                      <Descriptions.Item label="登录密码">
                        <Input.Password value={currentUser.employeePassword} readOnly bordered={false} />
                      </Descriptions.Item>
                      <Descriptions.Item label="理想工作方向" span={4}>
                        {
                          currentUser.employeeWillingJob && currentUser.employeeWillingJob.map((item,index)=>{
                                return <p key={index}>{item}</p>
                            })
                        }
                      </Descriptions.Item>
                      <Descriptions.Item span={4} label={'简历信息'}>
                        <Button type="primary" style={{width:'100%'}} onClick={()=>{window.location.href= '/employee/resume'}}>查看我的简历</Button>
                      </Descriptions.Item>

                    </Descriptions>

                  </Col>


                </Row>
              </ProCard>
              <ProCard  ghost={true} layout="default" bordered colSpan={16} direction={'column'} gutter={[20,20]}>
                <PageHeader
                  ghost={false}
                  title="个人评分"
                  subTitle={`${currentUser.employeeStar *20}%`}
                  style={{marginBottom:'20px'}}
                >
                  <Rate  value={currentUser.employeeStar *2 >= 5 ? 5 : currentUser.employeeStar * 2 } disabled={true} character={<SmileOutlined />} style={{ fontSize: 66  }} />
                  <Rate value={currentUser.employeeStar *2  <= 5 ? 0 : currentUser.employeeStar * 2 -5 } disabled={true} character={<SmileOutlined />} style={{ fontSize: 66  }} />

                  <Descriptions className={styles.rateCol} column={2} style={{marginTop:'20px'}} title={<>
                     <h3 onClick={()=>this.handleReaudit('所有评分')} >评分细则 <a style={{fontSize:14}}>申请全部复核</a></h3>
                  </>}>
                    {
                      globalAblitity.map((item: any   ,index)=>
                        <Descriptions.Item style={{verticalAlign:"middle"}}  label={item[0]}>
                            <Rate disabled allowHalf  value={item[1]}/> {item[1] <= 2 ? <Badge style={{backgroundColor:'volcano'}} count={'评分较低'} /> : <Badge style={{backgroundColor:'blue'}} count={'优势特长'} /> }
                          <Tooltip title={'遭到恶意评分?点击申诉请求复核'}>
                            <Button onClick={()=>this.handleReaudit(item[0])} type={"link"} >申请复核</Button>
                          </Tooltip>
                        </Descriptions.Item>)
                    }

                  </Descriptions>

                </PageHeader>
                <PageHeader
                  ghost={false}
                  title="当前任职的公司"
                  subTitle={`enterprise`}
                  style={{marginBottom:'20px'}}
                  extra={[
                    <Button type="ghost">
                       查看公司详细信息
                    </Button>,
                  ]}
                >
                  {
                    enterprise?.enterpriseName ?
                       <div style={{display:'flex',justifyContent:'space-evenly',alignItems:'center'}}>
                            <img src={'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'} height={200} />
                         <Descriptions size="middle" style={{width:'50%'}} column={1}  colon bordered>
                           <Descriptions.Item label="公司名称">{enterprise?.enterpriseName}</Descriptions.Item>
                           <Descriptions.Item label="公司地点">
                             {enterprise?.enterpriseLocation}
                           </Descriptions.Item>
                           <Descriptions.Item label="公司人数">{enterprise?.enterpriseNumsPerson}</Descriptions.Item>
                           <Descriptions.Item label="公司邮箱">{enterprise?.enterpriseAccount}</Descriptions.Item>
                         </Descriptions>
                       </div>
                      :
                    <Empty />
                  }
                </PageHeader>

                <PageHeader
                  ghost={false}
                  title="当前正在进行中的课程"
                  subTitle="course"
                  style={{marginBottom:'20px'}}
                  extra={[
                    <Button key="1" type="ghost">
                      退课
                    </Button>,
                  ]}
                >
                  {
                    course?.courseName ?
                      <Descriptions size="small" column={3} colon>
                        <Descriptions.Item label="课程名称">{course?.courseName}</Descriptions.Item>
                        <Descriptions.Item label="课程状态">
                          <Tag color={course.courseStatus === '未开课' ? 'red' : 'skyblue'}>{course?.courseStatus}</Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="上课地点">{course?.courseLocation}</Descriptions.Item>
                        <Descriptions.Item label="上课时间">{moment(course?.courseTime).format("YYYY-MM-DD HH:mm:ss")}</Descriptions.Item>
                        <Descriptions.Item label="课程人数">
                          {course?.courseTotalNumsPerson}
                        </Descriptions.Item>
                        <Descriptions.Item label="课程讲师">
                          {course?.couseTeacherName}
                        </Descriptions.Item>
                        <Descriptions.Item label="课程简介" span={6} style={{border:'1px solid #F0F0F0'}} >
                          {/*课程简介*/}
                          {course?.courseTeacherInfo}
                        </Descriptions.Item>
                      </Descriptions>
                      :
                      <Empty />
                  }
                </PageHeader>


                <ProCard  layout="default" bordered colSpan={24} >
                  {
                    applications?.length ?
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
                        headerTitle="我参与过的面试:"
                        dataSource={EmployeeStore.passedInterviewList?.map((currentItem :any) => ({
                          title: "面试公司："  + currentItem.enterprise?.enterpriseName,
                          subTitle:  <Tag color={currentItem.applicationEmpStatus === '未通过' ? 'red' : 'skyblue'}>状态：{currentItem.applicationEmpStatus}</Tag> ,
                          actions: [<a onClick={()=>window.location.href ='/employee/interviewStatus'}>查看当前面试进度→</a>],
                          avatar: 'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
                          content: (
                            <div
                              style={{
                                flex: 1,
                              }}
                            >
                              <Descriptions column={2}>
                                <Descriptions.Item label="面试地点">{currentItem.interview && currentItem.interview.interviewLocation}</Descriptions.Item>
                                <Descriptions.Item label="面试时间">{moment(currentItem.interview && currentItem.interview.interviewTime).format("YYYY-MM-DD HH:mm:ss")}</Descriptions.Item>
                              </Descriptions>
                            </div>
                          ),
                        }))}
                      />
                      :
                      <Empty/>
                  }

                </ProCard>

              </ProCard>
            </ProCard>

            <EditDrawer visible={visible} setVisible={this.setVisible} type={type} />
          </>
      )
    }

}
