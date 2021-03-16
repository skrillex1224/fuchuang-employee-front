import React from "react";
import {PageContainer} from "@ant-design/pro-layout";
import {observer} from "mobx-react";
import {Avatar, Button, Checkbox, Descriptions, Divider, Input, notification, Rate, Select, Space, Tag} from "antd";
import ProList from "@ant-design/pro-list";
import ProCard from "@ant-design/pro-card";
import EnterpriseStore from "@/stores/EnterpriseStore";
import { Document, Page ,pdfjs} from 'react-pdf';

const {Option} = Select;

@observer
export default class Index extends React.Component<any, any>{
  state = {
    expandedRowKeys : [],
    checkboxChecked : true,
    starCount : 3,
    selectChanged : '不限',
    selectChanged2 : '不限'
  }

  constructor(props) {
    super(props);
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
  }

  setExpandedRowKeys = (expandedRowKeys)=>{
    this.setState({expandedRowKeys})
  }

  onCheckBoxChanged = ()=>{
    this.setState({checkboxChecked : !this.state.checkboxChecked})
  }

  onRated = (val)=>{
      this.setState({starCount:val})
  }

  // 专业
  onSelectChanged = (selectChanged)=>{
    this.setState({selectChanged})
  }

  // 学历
  onSelectChanged2 = (selectChanged2)=>{
    this.setState({selectChanged2})
  }

  onSearch = (val)=>{
    console.log(val)
  }

  //真正的筛选方法
  onFilter = async  ()=>{
    //重新获取数据
    await EnterpriseStore.initializeHireEmployeeList();
    let hireEmployeeList :any = EnterpriseStore.hireEmployeeList;

    const {checkboxChecked,starCount,selectChanged,selectChanged2} = this.state

    //如果只显示意愿来公司的员工
    if(checkboxChecked){
      hireEmployeeList = hireEmployeeList.filter((item :any)=>{
        return JSON.parse(item.employeeWillingEnterpriseList || "[]").indexOf(localStorage.getItem("userName")) > -1;
      })
    }

    hireEmployeeList = hireEmployeeList.filter((item : any)=>{
       return item.employeeStar >=  starCount;
    })

    if(selectChanged !== '不限'){
      hireEmployeeList = hireEmployeeList.filter((item : any)=>{
        return JSON.parse(item.employeeWillingJob || "[]").indexOf(selectChanged) > -1 ;
      })
    }

    if(selectChanged2 !== '不限'){
      hireEmployeeList = hireEmployeeList.filter((item : any)=>{
        return  item.employeeEducation === selectChanged2;
      })
    }


    await  EnterpriseStore.rerenderHireEmployeeList(hireEmployeeList);

  }

  async  componentDidMount() {
    await this.onFilter();
  }


  render() {
    const {expandedRowKeys,checkboxChecked,starCount} = this.state;

    return (
      <PageContainer>
        <ProCard title={'筛选人才信息'} type={"inner"} style={{marginBottom:'20px'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignContent:'space-between',flexWrap:'wrap'}}>
            <ProCard  style={{width:'100%'}} >
               <Input.Search   onSearch={this.onSearch}   enterButton={true} style={{width:'50%',marginLeft:'20%'}} placeholder={'搜索人才姓名'}/>
            </ProCard>
            <Divider  />
            <span>
              <Checkbox style={{position:'relative',top:'8px'}}  checked={checkboxChecked}    onChange={this.onCheckBoxChanged}>只显示已意愿任职本公司的人才</Checkbox>
            </span>
            <span>
             人才最低星数:<Rate allowHalf  value={starCount} onChange={this.onRated}/>
            </span>
            <span>
                人才专业:  <Select
                showArrow
                defaultValue={['不限']}
                dropdownMatchSelectWidth={200}
                bordered={false}
                onChange={this.onSelectChanged}
                placeholder={'choose....'}
              >
                <Option value={'不限'}>不限</Option>
                <Option value={'Java开发'}>Java开发</Option>
                <Option value={'PHP开发'}>PHP开发</Option>
                <Option value={'WEB前端'}>WEB前端</Option>
                <Option value={'大数据'}>大数据</Option>
                <Option value={'Linux运维'}>Linux运维</Option>
                <Option value={'Android'}>Android</Option>
                <Option value={'IOS'}>IOS</Option>
                <Option value={'C/Python'}>C/Python</Option>
                <Option value={'软件测试'}>软件测试</Option>
                <Option value={'其他'}>其他</Option>
              </Select>
            </span>
            <span>
              人才学历: <Select bordered={false}
                            defaultValue={'不限'}
                            dropdownMatchSelectWidth={200}
                            onChange={this.onSelectChanged2}
              placeholder={'choose....'}
            >
               <Option value="不限">不限</Option>
               <Option value="职业高中">职业高中</Option>
               <Option value="大学专科">大学专科</Option>
               <Option value="大学本科">大学本科</Option>
               <Option value="硕士">硕士</Option>
               <Option value="博士">博士</Option>
               <Option value="其他">其他</Option>
             </Select>
            </span>

            <span>
              <Button type={"link"} style={{color:'#DA504F'}} size={"middle"} onClick={ async ()=>{
                 await EnterpriseStore.initializeHireEmployeeList()
                  this.setState( {
                    expandedRowKeys : [],
                    checkboxChecked : false,
                    starCount : 0,
                    selectChanged : '不限',
                    selectChanged2 : '不限'
                  })
              }} >清空所有筛选条件</Button>
              <span style={{width:'10px'}}> </span>
              <Button type={"primary"}  size={"middle"} onClick={this.onFilter} >筛选</Button>
            </span>
          </div>
        </ProCard>

        <ProList
          rowKey="employeeId"
          headerTitle={'人才列表'}
          showHeader={true}
          showActions={'hover'}
          pagination={{
            defaultPageSize:20,
          }}
          expandable={{ expandedRowKeys, onExpandedRowsChange: this.setExpandedRowKeys }}
          dataSource={EnterpriseStore.hireEmployeeList}
          metas={{
            title: {
              dataIndex:'employeeName',
            },
            avatar: {
              render: ()=>{
                return (<Avatar src={'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg'} />)
              }
            },
            subTitle: {
              dataIndex:'employeeWillingJob',
              render: (item : any ) => {
                return (
                  <Space size={0}>
                    {
                      JSON.parse(item || "[]").map((item,index) =>{
                          return (
                            <Tag key={index} color={'red'}>{item}</Tag>
                          )
                      })
                    }
                  </Space>
                );
              },
            },
            description: {
              dataIndex:'employeeInfo',
            },
            content: {
              render: (_,record:any) => (
                  <Descriptions
                    bordered={false}
                    title="个人信息"
                    column={2}
                  >
                    <Descriptions.Item label="真实姓名">{record.employeeName}</Descriptions.Item>
                    <Descriptions.Item label="手机号码">{record.employeePhoneNumber}</Descriptions.Item>
                    <Descriptions.Item label="最高学历">{record.employeeEducation}</Descriptions.Item>
                    <Descriptions.Item label="毕业院校">{record.employeeCollege}</Descriptions.Item>
                    <Descriptions.Item label="性别">{record.employeeGender}</Descriptions.Item>
                    <Descriptions.Item label="理想工作方向" span={4}>
                      {
                        record.employeeWillingJob && JSON.parse(record.employeeWillingJob).map((item,index)=>{
                          return <span style={{marginRight:'5px'}} key={index}>{item}</span>
                        })
                      }
                    </Descriptions.Item>
                  </Descriptions>
              ),
            },
            actions: {
              dataIndex: 'employeeResume',
              render: (_,record : any ) => {
                return (
                  <>
                    <a  onClick={()=>{
                      this.setExpandedRowKeys([record.employeeId]);
                      notification.open({
                        message: `${record.employeeName}的简历信息`,
                        duration : null,
                        style: {
                          width:'auto'
                        },
                        description: <>
                          <Document
                            file={record.employeeResume} //PDF文件在此
                            onLoadSuccess={()=>{}}
                          >
                            <Page pageNumber={1} />
                          </Document>
                        </>,

                        onClick: () => {
                          console.log('Notification Clicked!');
                        },
                      });

                    }}>查看Ta的简历</a>
                    <a style={{marginLeft:'15px'}} key="invite">邀请加入公司</a>
                  </>
                );
              },
            },
          }}
        />
      </PageContainer>
    )
  }
}
