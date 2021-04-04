import {observer} from "mobx-react";
import React from "react";
import {PageContainer} from "@ant-design/pro-layout";
import {Alert, Avatar, Button, Card, Col, Descriptions, Input, message, Modal, Popover, Rate, Row, Space, Spin, Table, Tag} from "antd";
import {CheckCircleFilled, CheckOutlined, ExclamationCircleOutlined, SearchOutlined} from "@ant-design/icons/lib";
import Highlighter from 'react-highlight-words';
import ProCard from "@ant-design/pro-card";
import InterviewForm from './InterviewForm'

import styles from './index.less'
import TextArea from "antd/lib/input/TextArea";

import { Document, Page ,pdfjs} from 'react-pdf';
import HrStore from "@/stores/HrStore";

const { success,confirm,info } = Modal;

@observer
export default class Index extends React.Component<any, any>{
  state = {
    searchText: '',
    searchedColumn: '',
    data: [],
    starCount: 4,
    isLoading : false,
    dismissReason:'',
  };

  constructor(props) {
    super(props);
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
  }

  searchInput : any ;


  //子组件的方法
  childFormMethod = ()=>{};

   // 获取子类的一个方法,并供父类调用
  getChildMethod = (childMethod)=>{
    this.childFormMethod = childMethod;
  }

  //搜索
  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };
  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`搜索${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            搜索
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            重置
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            过滤
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  //安排面试
  arrangeInterview = (current)=>{
    return (e)=>{
      this.setState({visible: true })
      info({
        title: '请完善具体面试信息:',
        icon: <CheckOutlined/>,
        /**::::::::::::::: 子组件给父组件传值*/
        content: (<InterviewForm getFormValues={this.getChildMethod} current={current}/>),
        okText: '通知他',
        cancelText:'取消',
        width:600,
        okCancel:true,
        onCancel() {
        },
        onOk: async ()=>{
          try {
            const childFormValue = await this.childFormMethod();

            success({
              title: <>为他的简历评分: </>,
              width:600,
              icon: <CheckCircleFilled/>,
              content: (<>
                <Descriptions className={styles.rateCol} column={2} style={{marginTop:'20px'}} >
                  {
                    [1,2,3,3,4,,4,123,1,3,123,12,3,123,12,3,12,3,123].map((item,index)=>
                      <Descriptions.Item style={{verticalAlign:"middle"}}  label="创新能力">
                        <Rate  allowHalf  defaultValue={4}/>
                      </Descriptions.Item>)
                  }
                </Descriptions>
              </>),
              okText: '完成',
              onOk : async () => {
                  this.setState({isLoading:true})
                  await HrStore.hrArrangeInterview(this.state.starCount,childFormValue,current);
                this.setState({isLoading:false})
              },
            });
            return Promise.resolve();
            } catch (e) {
            return Promise.reject();
          }
        },
      });
      e.stopPropagation()
    }

  }

  refuseResume = (current)=>{
    return (e)=>{
      //@ts-ignore
      confirm({
        title: '请填写拒绝回执并确认:',
        icon: <ExclamationCircleOutlined />,
        width:600,
        content: <TextArea   onChange={(event)=>{
          this.setState({dismissReason : event.target.value})
        }} placeholder={'未达到面试的目标公司最低要求'} showCount={true} allowClear bordered={true} rows={4}/>,
        onOk : async ()=> {

          success({
            title: <>为他的简历评分: </>,
            icon: <CheckCircleFilled/>,
            width:600,
            content: (<>
              <Descriptions className={styles.rateCol} column={2} style={{marginTop:'20px'}} >
                {
                  [1,2,3,3,4,,4,123,1,3,123,12,3,123,12,3,12,3,123].map((item,index)=>
                    <Descriptions.Item style={{verticalAlign:"middle"}}  label="创新能力">
                      <Rate  allowHalf  defaultValue={4}/>
                    </Descriptions.Item>)
                }
              </Descriptions>
            </>),
            okText: '完成',
            onOk : async () => {
              this.setState({isLoading:true})
              await HrStore.hrRefuseInterview(this.state.dismissReason, current.applicationId,this.state.starCount);
              this.setState({isLoading:false})

            },

          });

        },
        onCancel : ()=> {
        },
      } );

      e.stopPropagation()
    }
  }



  columns : any = [
    {
      dataIndex: 'avatar',
      key: 'avatar',
      width: "3%"
    },
    {
      title: 'ID',
      dataIndex: 'applicationId',
      key: 'applicationId',
      ...this.getColumnSearchProps('applicationId'),
    },
    {
      title: '姓名',
      dataIndex: ["employee","employeeName"],
      key: ["employee","employeeName"],
      ...this.getColumnSearchProps(["employee","employeeName"]),
    },
    {
      title: '联系电话',
      dataIndex: ["employee","employeePhoneNumber"],
      key: ["employee","employeePhoneNumber"],
      ...this.getColumnSearchProps("[employee,employeePhoneNumber]"),
    },
    {
    title: '总体评级', dataIndex: ["employee","employeeStar"], key: ["employee","employeeStar"],
    render: (text) =>{
        return (
            <>
              <Rate value={text} disabled={true}/>
              <Popover style={{width:600}} title={'具体详情'} placement={"right"} content={<>
                <Descriptions className={styles.rateCol} column={2} style={{marginTop:'20px'}} >
                  {
                    [1,2,3,3,4,,4,123,1,3,123,12,3,123,12,3,12,3,123].map((item,index)=>
                      <Descriptions.Item style={{verticalAlign:"middle"}}  label="创新能力">
                        <Rate  allowHalf  defaultValue={4}/>
                      </Descriptions.Item>)
                  }
                </Descriptions>
              </>}>
              <a style={{marginLeft:'10px'}}>详情</a>
              </Popover>
            </>
        )
    }},
    { title: '专业能力',
      dataIndex: ["employee","employeeWillingJob"],
      key: ["employee","employeeWillingJob"] ,
      render : (text) => {
          const jobList  = JSON.parse(text || "[]");

         return  jobList.map((item)=>{
            return (
              <Tag color={'red'}>
                {item}
              </Tag>
            )
          })
      }},
    {
      title: '操作',
      dataIndex: 'operation',
      width: "12%",
      key: 'operation',
      fixed:'right',
      render : (_,current)=>{
         return (
           <div style={{display:'flex',justifyContent:'space-evenly'}}>
             <a style={{color:'#1890FF'}} onClick={this.arrangeInterview(current)}>安排面试</a>
             <a onClick={this.refuseResume(current)}>拒绝简历</a>
           </div>
         )
      }
    },
  ];



  async  componentDidMount() {
    //初始化applicationList
    this.setState({isLoading:true})
    await HrStore.initializeAllApplication();
    this.setState({isLoading:false});
   }

  render(): React.ReactNode {
      // @ts-ignore
    return (
        <PageContainer>
          <Alert style={{marginBottom:'20px'}} banner={true} message="欢迎您,HR,以下为近期投递的简历信息,您可以对以下投递的简历信息进行筛选和打分"
                 type="warning"  closable={true} />
          <Spin size={"large"} spinning={this.state.isLoading}>
            <Table
              size={"middle"}
              columns={this.columns}

              pagination={{
                defaultPageSize:20
              }}
              expandable={{

                expandedRowRender: (record:any ) => (
                  <>
                    {/*style={{margin:'0 auto'}} */}
                    <ProCard hoverable  bordered colSpan={24} >
                      <Row gutter={[16, 16]} >
                        <Col className={styles.col} span={24}>
                          <Avatar  src={'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg'}  style={{width:'100px',height:'100px',fontSize:'70px',lineHeight:'90px'}}/>
                        </Col>
                        <Col className={styles.col} span={24}>
                          <div style={{fontSize:30}}>{record.employee?.employeeName}</div>
                        </Col>
                        <Col className={styles.col} span={24}>
                          <Card style={{ width: '100%' }} >
                            {record.employee?.employeeInfo}
                          </Card>
                        </Col>

                        <Col span={24} >
                          <Descriptions
                            bordered
                            title="个人信息"
                            column={2}
                          >
                            <Descriptions.Item label="真实姓名">{record.employee?.employeeName}</Descriptions.Item>
                            <Descriptions.Item label="手机号码">{record.employee?.employeePhoneNumber}</Descriptions.Item>
                            <Descriptions.Item label="最高学历">{record.employee?.employeeEducation}</Descriptions.Item>
                            <Descriptions.Item label="毕业院校">{record.employee?.employeeCollege}</Descriptions.Item>
                            <Descriptions.Item label="性别">{record.employee?.employeeGender}</Descriptions.Item>
                            <Descriptions.Item label="个人综合评分" >
                              <Rate disabled defaultValue={record.employee?.employeeStar} allowHalf/>
                            </Descriptions.Item>
                            <Descriptions.Item label="理想工作方向" span={4}>
                              {
                                JSON.parse(record.employee?.employeeWillingJob).map((item)=>{
                                  return (
                                    <p>{item}</p>
                                  )
                                })
                              }
                            </Descriptions.Item>
                            <Descriptions.Item span={4} label={'简历信息'}>
                              <Document
                                file={record.employee?.employeeResume} //PDF文件在此
                                onLoadSuccess={()=>{}}
                              >
                                <Page pageNumber={1} />
                              </Document>
                            </Descriptions.Item>

                          </Descriptions>

                        </Col>


                      </Row>
                    </ProCard>
                  </>
                ),
              }}
              expandRowByClick={true}
              dataSource={HrStore.applicationList}
            />
          </Spin>

        </PageContainer>
      )
    }
}
