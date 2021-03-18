import React from "react";
import {PageContainer} from "@ant-design/pro-layout";
import {Badge, Calendar, Col, Row, Select, Alert, Button, Modal, Descriptions, Popover, message, Form, Input, DatePicker} from "antd";
import styles from './index.less'
import moment from "moment";
import {MenuUnfoldOutlined} from "@ant-design/icons/lib";
import HrStore from "@/stores/HrStore";
import {observer} from "mobx-react";

const {info} = Modal

@observer
export default class Index extends React.Component<any, any>{
  state = {
    listData : [],
    currentMonth : moment().format('YYYY-MM')
  };

  formInstance : any = React.createRef();

  async componentDidMount() {
    message.loading({content:'loading...',key:'loading'})
     await HrStore.loadAllCourseByMonth(moment().format('YYYY-MM'));
     this.forceUpdate(()=>{
        message.destroy("loading");
     });
  }


  getListData(value) {
    let listData : any  = [];



    const today = value.date();

    HrStore.currentInterviewList.forEach((item : any ) =>{
      if(moment(item.courseTime).date() === today){
        listData.push({
          courseName : `${item.courseName}`,
          content : <>
            <Descriptions colon={false} title="课程详细信息" column={1} style={{width:'400px'}}>
              <Descriptions.Item label="开课时间:">{moment(item.courseTime).format("HH:mm:ss")}</Descriptions.Item>
              <Descriptions.Item label="上课地点:">{item.courseLocation}</Descriptions.Item>
              <Descriptions.Item label="已选课程人数:">{item.courseExtantNumsPerson}</Descriptions.Item>
              <Descriptions.Item label="空余名额:">{item.courseTotalNumsPerson - item.courseExtantNumsPerson}</Descriptions.Item>
              <Descriptions.Item label="教师姓名:">{item.couseTeacherName}</Descriptions.Item>
              <Descriptions.Item label="教师所在院校:">{item.courseTeacherCollege}</Descriptions.Item>
            </Descriptions>
          </>,
          status : item.courseStatus
        })
      }
    })

    return listData || [];
  }

  dateCellRender = (value)=> {
    const listData = this.getListData(value);
    return (
      <ul className={styles.events}>
        {listData.map(item => (
          <Popover content={item.content} placement={'right'}  trigger={'click'}>
          <li key={item.content} >
            <Badge className={styles.badge} color={item.status === '未开课' ? '#87d068' : '#f50'} text={
              <>
                {item.courseName}
                <a>查看详情</a>
              </>
            } />
          </li>
          </Popover>
        ))}
      </ul>
    );
  }

 headerRender=({ value, type, onChange, onTypeChange }) => {
  const start = 0;
  const end = 12;
  const monthOptions = [];

  const current = value.clone();
  const localeData = value.localeData();
  const months = [];
  for (let i = 0; i < 12; i++) {
  current.month(i);
  // @ts-ignore
    months.push(localeData.monthsShort(current));
}

for (let index = start; index < end; index++) {
  // @ts-ignore
  monthOptions.push(<Select.Option className="month-item" key={`${index}`}>
      {months[index]}
    </Select.Option>,
  );
}
const month = value.month();

const year = value.year();
const options = [];
for (let i = year - 10; i < year + 10; i += 1) {
  // @ts-ignore
  options.push(<Select.Option key={i} value={i} className="year-item">
      {i}
    </Select.Option>,
  );
}




return (
  <div style={{ padding: 8 }}>
    <Alert
      message={'培训信息日程表'}
      style={{fontSize:30,fontWeight:"bold",textAlign:'center',fontFamily:'楷体'}}
      type={'error'}
    />
    <Row justify={'end'} style={{margin:'20px  0'}} gutter={8}>
      <Col>
        <Select
          style={{width:'200px'}}
          size="large"
          dropdownMatchSelectWidth={false}
          onChange={newYear => {
            const now = value.clone().year(newYear);
            onChange(now);
          }}
          value={String(year)}
        >
          {options}
        </Select>
      </Col>
      <Col>
        <Select
          style={{width:'200px'}}
          size="large"
          dropdownMatchSelectWidth={false}
          value={String(month)}
          onChange={selectedMonth => {
            const newValue = value.clone();
            newValue.month(parseInt(selectedMonth, 10));
            onChange(newValue);
          }}
        >
          {monthOptions}
        </Select>
      </Col>
      <Col>
        <Button onClick={()=>{
          //@ts-ignore
          info({
            title: '发布培训信息',
            icon:  <MenuUnfoldOutlined />,
            content: <>
              <Form
                labelCol={{span:6}}
                ref={this.formInstance}
              >
                <Form.Item
                  name="courseName"
                  label="课程名字"
                  rules={[
                    {
                      required: true,
                      message: '请输入课程名字!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="couseTeacherName"
                  label="教师姓名"
                  rules={[
                    {
                      required: true,
                      message: '请输入教师姓名!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input />
                </Form.Item>
                <Form.Item hidden={true} name='courseTeacherGender' initialValue='男'/>

                <Form.Item
                  name="courseTeacherCollege"
                  label="教师所在大学"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: '请输入教师所在大学!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="courseTeacherInfo"
                  label="教师简介"
                  hasFeedback
                  rules={[{ required: true, message: '请输入教师简介!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="课程时间"
                  name="courseTime"
                  hasFeedback
                  rules={[
                    {  required: true, message: '请选择程时间!' },
                  ]}
                >
                  <DatePicker showTime style={{width:'100%'}} />
                </Form.Item>

                <Form.Item
                  label="课程地点"
                  name="courseLocation"
                  hasFeedback
                  rules={[{ required: true, message: '请输入上课地点!' }]}
                >
                  <Input  />
                </Form.Item>

                <Form.Item
                  name="courseTotalNumsPerson"
                  label="课程总人数"
                  hasFeedback
                  rules={[{ required: true, message: '课程总人数!' }]}
                >
                    <Input type={"number"}/>
                </Form.Item>
              </Form>
              </>,
            width: 600,
            onOk : async ()=> {
                const {current : formRef} = this.formInstance;
              try {
                await formRef.validateFields();
                const fieldsValue =  formRef.getFieldsValue();
                await HrStore.publishCourse(fieldsValue);
                await HrStore.loadAllCourseByMonth(this.state.currentMonth);
                this.forceUpdate();
              } catch (e) {

              }

            },
            okText:'发布',
            cancelText:'取消',
            okCancel:true,
            onCancel() {

            },
          });
        }} type={"primary"} size={"large"}>培训信息发布</Button>
      </Col>
    </Row>
  </div>
);}

  render(): React.ReactNode {
    return (
      <PageContainer>
        <Alert style={{marginBottom:'20px'}} banner={true} message="欢迎您,HR,以下是培训具体信息表,点击某一培训项目即可查看详细信息"
               type="warning"  closable={true} />
        <Calendar headerRender={this.headerRender} dateCellRender={this.dateCellRender}  onPanelChange={async (value)=>{
          message.loading({content:'loading...',key:'loading'})
          await HrStore.loadAllCourseByMonth(moment(value).format('YYYY-MM'));
          this.setState({currentMonth:moment(value).format('YYYY-MM')})
          this.forceUpdate(()=>{
            message.destroy("loading");
          });
        }} />,
      </PageContainer>
    )
  }
}
