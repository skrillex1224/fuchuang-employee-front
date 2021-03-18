import React from "react";
import {observer} from "mobx-react";
import {PageContainer} from "@ant-design/pro-layout";
import {Button, Card, Descriptions, List} from "antd";
import moment from "moment";

import './index.less'
import EmployeeStore from "@/stores/EmployeeStore";
import {CheckOutlined} from "@ant-design/icons/lib";




@observer
export default class Index extends React.Component<any, any>{

   async componentDidMount() {
        await EmployeeStore.initializeCourseList();
    }

    state = {
        opacityList : [],
        isEnterBtn: false,
       isLoading :false
    }

  render(): React.ReactNode {
      return (
        <PageContainer>
              <List
                grid={{
                  gutter: 16,
                  column:4,
                }}
                dataSource={EmployeeStore.restCourseList}
                renderItem={(item : any ) => (
                  <List.Item style={{position:'relative'}} onMouseOver={()=>{
                    const opacityList : any  = this.state.opacityList;
                    opacityList[item.courseId] = 1;
                    this.setState({opacityList })
                  }} onMouseLeave={()=>{
                    const opacityList : any  = this.state.opacityList;
                    opacityList[item.courseId] = 0;
                    this.setState({opacityList })
                  }}>
                    <Card  title={`${item.courseName}`} >
                      <Descriptions colon={false} title="" column={1} style={{width:'400px'}}>
                        <Descriptions.Item label="开课时间:">{moment(item.courseTime).format("YYYY-MM-DD HH:mm:ss")}</Descriptions.Item>
                        <Descriptions.Item label="上课地点:">{item.courseLocation}</Descriptions.Item>
                        <Descriptions.Item label="已选课程人数:">{item.courseExtantNumsPerson}</Descriptions.Item>
                        <Descriptions.Item label="空余名额:">{item.courseTotalNumsPerson - item.courseExtantNumsPerson}</Descriptions.Item>
                        <Descriptions.Item label="教师姓名:">{item.couseTeacherName}</Descriptions.Item>
                        <Descriptions.Item label="教师所在院校:">{item.courseTeacherCollege}</Descriptions.Item>
                      </Descriptions>
                    </Card>
                    <Card  className='cardMask' style={{position:'absolute',left:0,top:0, zIndex:999,
                      backgroundColor: this.state.isEnterBtn ? "#fff" : '#DA504F' ,width:'100%',height:'100%',transition:'.4s',
                      opacity:this.state.opacityList[item.courseId] || 0}} >
                      <Button onMouseOver={()=>{
                          this.setState({isEnterBtn: true})
                      }}  onMouseLeave={()=>{
                        this.setState({isEnterBtn: false})
                      }} className='mask'  loading={this.state.isLoading}  ghost size={"large"} shape={"round"} onClick={ async ()=>{
                        this.setState({isLoading:true});
                        await EmployeeStore.chooseCourse(item.courseId);
                        this.setState({isLoading:false});
                      }} >
                        <CheckOutlined />
                          选课
                      </Button>
                    </Card>
                  </List.Item>
                )}
              />
        </PageContainer>
      )
    }
}
