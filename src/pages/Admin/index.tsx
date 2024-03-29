import {observer} from "mobx-react";
import React from "react";
import {PageContainer} from "@ant-design/pro-layout";
import {Avatar, Button, Card, Carousel, Col, message, Modal, Row, Input, Descriptions, Rate, Tooltip} from "antd";
import styles from './index.less'
import Meta from "antd/es/card/Meta";
import AdminStore from "@/stores/AdminStore";
import {BulbOutlined, CommentOutlined, FieldNumberOutlined, HistoryOutlined} from "@ant-design/icons/lib";
import { List } from "antd";
import globalAblitity from "@/utils/globalAblitity";

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

@observer
export default class Index extends React.Component<any, any>{
   onChange = ()=>{

   }

   async componentDidMount() {
     await AdminStore.initializeRecheckInfos();
   }

  carouselRef : any  = React.createRef();

   render(): React.ReactNode {
     const {recheckInfos} : any  = AdminStore;

     return (
        <PageContainer title={<>
          复核中心
          <Button onClick={()=>this.carouselRef.current.prev()} type={'link'}>上一条复核申请</Button>
          <Button onClick={()=>this.carouselRef.current.next()} type={'link'}>下一条复核申请</Button>
        </>}>
          <Carousel ref={this.carouselRef} vertical={true} dots={false}  draggable={true} className={styles.carousel}  afterChange={this.onChange}>
            {
              recheckInfos.map((item : any )=>{
                return (
                  <Card hoverable key={item.recheckId}
                        actions={[
                          <div onClick={()=>{
                            Modal.confirm({
                              title:<>
                                <Tooltip title={'重新评估能力后将动态计算对应HR的评分和绩效'} >
                                  请重新评估{item.employee.employeeName}的能力
                                </Tooltip>
                              </>,
                              width:800,
                              content : <>
                                <Descriptions  className={styles.rateCol}  column={3} style={{width:660}} >
                                  {
                                    globalAblitity.map((item:any,index)=>
                                      <Descriptions.Item style={{verticalAlign:"middle"}}  label={item[0]}>
                                        <Rate allowHalf  defaultValue={item[1]}/>
                                      </Descriptions.Item>)
                                  }
                                </Descriptions>
                              </> ,
                              onOk :()=>{
                                return new Promise(resolve => {
                                  setTimeout(()=>{
                                    resolve(null);
                                    message.success("能力重新评估成功,对应HR绩效已动态更新");
                                    location.reload();
                                  },1923)
                                })
                              }
                            })}}>重新评估该用户星级</div>,
                          <div onClick={()=>{
                            Modal.confirm({
                              title:'请输入驳回原因',
                              content : <>
                                <Input.TextArea rows={4} />
                              </> ,
                              onOk :()=>{
                                return new Promise(resolve => {
                                  setTimeout(()=>{
                                    resolve(null);
                                    message.success("操作成功");
                                    location.reload();
                                  },1000)
                                })
                              }
                            })
                          }}>驳回该复核申请</div>
                        ]}
                  >
                    <Meta
                      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                      title={<>{item.employee.employeeName} <CommentOutlined /> {item.employee.employeePhoneNumber} </>}
                      description={<><BulbOutlined />申请复核选项 ： {item.recheckItem}  </>}
                    />
                    <Card style={{marginTop:20}}  title={'近期该用户星级修改记录'} type={"inner"}>
                      <List
                        dataSource={item.employee.interviews}
                        footer={
                          <div>
                            <HistoryOutlined /> 申请复核时间：{item.recheckTime.substring(0,10)}
                          </div>
                        }
                        renderItem={(current : any ) => (
                          <List.Item
                            key={current.interviewId}
                            actions={[<a>审查人：{item.hr.hrRealname}</a>, <a>审查人电话：{item.hr.hrPhoneNumber}</a>]}
                          >
                              <List.Item.Meta
                                title={<a>评分地点：{current.interviewLocation}</a>}
                                description={`评分时间：${current.interviewTime.substring(0,10)}`}
                              />
                              <Descriptions  className={styles.rateCol}  column={3} style={{width:660}} >
                                {
                                  globalAblitity.map((item:any,index)=>
                                    <Descriptions.Item style={{verticalAlign:"middle"}}  label={item[0]}>
                                      <Rate disabled allowHalf  defaultValue={item[1]}/>
                                    </Descriptions.Item>)
                                }
                              </Descriptions>
                          </List.Item>
                        )}
                      />
                    </Card>



                  </Card>
                )
              })
            }
          </Carousel>
        </PageContainer>
     )
   }
}
