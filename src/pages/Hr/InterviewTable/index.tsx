import React from "react";
import {PageContainer} from "@ant-design/pro-layout";
import {Badge, Calendar, Col, Row, Select, Alert, Popover, Descriptions, message, Button, Rate, Modal} from "antd";
import styles from './index.less'
import {observer} from "mobx-react";
import HrStore from "@/stores/HrStore";
import moment from "moment";
import {CheckCircleFilled} from "@ant-design/icons/lib";
import globalAblitity from "@/utils/globalAblitity";


@observer
export default class Index extends React.Component<any, any>{
  state = {
    listData : [],
    loading : false
  };

  async componentDidMount() {
    message.loading({content:'加载中...',key:'loading',});
    await HrStore.loadInterviewInfoByMonth(moment().format('YYYY-MM'));
    this.forceUpdate(()=>{
      message.destroy('loading');
    });

  }

  getListData(value) {
    let listData : any  = [];

    if(moment(HrStore.currentInterviewList[0]?.interviewTime).month() !== value.month()){
      return [];
    }


    const today = value.date();

    HrStore.currentInterviewList.forEach((item : any ) =>{
        if(moment(item.interviewTime).date() === today){
           listData.push({
               interviewTime : `${moment(item.interviewTime).format("HH:mm")}`,
              content : <>
                <Descriptions colon={false} title="面试详细信息" column={1} style={{width:'400px'}}>
                  <Descriptions.Item label="面试时间:">{moment(item?.interviewTime).format("YYYY-MM-DD HH:mm:ss")}</Descriptions.Item>
                  <Descriptions.Item label="面试地点:">{item?.interviewLocation}</Descriptions.Item>
                  <Descriptions.Item label="HR姓名:">{item?.hr?.hrRealname}</Descriptions.Item>
                  <Descriptions.Item label="面试人姓名:">{item?.employeeList && item?.employeeList[0]?.employeeName}</Descriptions.Item>
                  <Descriptions.Item label="操作:">
                    <Button type={"danger"} style={{marginRight:'10px'}} onClick={()=>{
                      this.setState({loading:true})
                        HrStore.dealWithInterviewResult(item.interviewId,1).then(()=>{
                            this.setState({loading:false})

                              Modal.success({
                                title: <>为他的面试表现评分: </>,
                                width: 600,
                                okText:'确认',
                                onOk:()=>{
                                  return new Promise((resolve)=>{
                                    setTimeout(()=>{
                                      message.success("操作成功!")
                                      resolve(null);
                                    },979)
                                  })
                                },
                                icon: <CheckCircleFilled/>,
                                content: (<>
                                  <Descriptions className={styles.rateCol} column={2} style={{marginTop: '20px'}}>
                                    {
                                      globalAblitity.slice(12).map((item:any , index) =>
                                        <Descriptions.Item style={{verticalAlign: "middle"}} label={item[0]}>
                                          <Rate allowHalf defaultValue={item[1]}/>
                                        </Descriptions.Item>)
                                    }
                                  </Descriptions>
                                </>)
                              });
                        });
                    }
                    }>拒绝面试</Button>
                    <Button type={"default"} onClick={()=>{
                        this.setState({loading:true})
                        HrStore.dealWithInterviewResult(item.interviewId,0).then(()=> {
                          this.setState({loading: false})

                          Modal.success({
                            title: <>为他的面试表现评分: </>,
                            width: 600,
                            okText:'确认',
                            onOk:()=>{
                               return new Promise((resolve)=>{
                                 setTimeout(()=>{
                                    message.success("操作成功!")
                                    resolve(null);
                                 },979)
                               })
                            },
                            icon: <CheckCircleFilled/>,
                            content: (<>
                              <Descriptions className={styles.rateCol} column={2} style={{marginTop: '20px'}}>
                                {
                                  globalAblitity.slice(12).map((item:any , index) =>
                                    <Descriptions.Item style={{verticalAlign: "middle"}} label={item[0]}>
                                      <Rate allowHalf defaultValue={item[1]}/>
                                    </Descriptions.Item>)
                                }
                              </Descriptions>
                            </>)
                          });
                        });
                    }
                    }>通过面试</Button>
                  </Descriptions.Item>
                </Descriptions>
              </>
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
          <li key={item.interviewTime} >
            <Popover style={{zIndex:999,position:'relative'}} content={item.content} placement={'right'} trigger={'hover'}>
              <Badge className={styles.badge} color={'#DA504F'} text={
                <>{item.interviewTime} <a>查看详情</a></> } />
              {/*<Badge className={styles.badge} color={'#DA504F'} text={} />*/}
            </Popover>
          </li>
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
      message={'面试信息日程表'}
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
    </Row>
  </div>
);}

  render(): React.ReactNode {
    return (
      <PageContainer>
        <Alert style={{marginBottom:'20px'}} banner={true} message="欢迎您,HR,以下是面试具体信息表,点击某一面试时间即可查看面试状态及详细信息"
               type="warning"  closable={true} />
        <Calendar headerRender={this.headerRender} onPanelChange={async (value)=>{
          message.loading({content:'加载中...',key:'loading',});
          await HrStore.loadInterviewInfoByMonth(moment(value).format('YYYY-MM'));
          this.forceUpdate(()=>{
              message.destroy('loading');
          });
        }} dateCellRender={this.dateCellRender}  />,
      </PageContainer>
    )
  }
}
