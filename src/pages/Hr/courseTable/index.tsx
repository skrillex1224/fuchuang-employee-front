import React from "react";
import {PageContainer} from "@ant-design/pro-layout";
import {Badge, Calendar, Col, Row, Select, Alert, Button,Modal} from "antd";
import styles from './index.less'
import moment from "moment";
import {MenuUnfoldOutlined} from "@ant-design/icons/lib";

const {confirm} = Modal

export default class Index extends React.Component<any, any>{
  state = {
    listData : [],
  };

  getListData(value) {
    let listData;
    console.log(moment(value).format("YYYY-MM-DD"))

    switch (value.date()) {
      case 8:
        listData = [
          {  content: 'This is warning event.' },
          {  content: 'This is usual event.' },
        ];
        break;
      case 10:
        listData = [
          {  content: 'This is warning event.' },
          {  content: 'This is usual event.' },
          { content: 'This is error event.' },
        ];
        break;
      case 15:
        listData = [
          {  content: 'This is warning event' },
          {  content: 'This is very long usual event。。....' },
          { content: 'This is error event 1.' },
          { content: 'This is error event 2.' },
          { content: 'This is error event 3.' },
          { content: 'This is error event 4.' },
        ];
        break;
      default:
    }
    return listData || [];
  }

  dateCellRender = (value)=> {
    const listData = this.getListData(value);
    return (
      <ul className={styles.events}>
        {listData.map(item => (
          <li key={item.content} onClick={()=>{
            //点击事件
            confirm(item.content)
          }}>
            <Badge className={styles.badge} color={'#DA504F'} text={item.content} />
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
          confirm({
            title: 'Do you Want to delete these items?',
            icon:  <MenuUnfoldOutlined />,
            content: 'Some descriptions',
            onOk() {
              console.log('OK');
            },
            onCancel() {
              console.log('Cancel');
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
        <Calendar headerRender={this.headerRender} dateCellRender={this.dateCellRender}  />,
      </PageContainer>
    )
  }
}
