import React, {CSSProperties} from "react";
import {observer} from "mobx-react";
import ProCard from '@ant-design/pro-card';
import {Avatar, Badge, Button, Card, Col, Descriptions, Input, Comment, Popover, Progress, Row, Tag, Empty, Collapse,  Popconfirm} from "antd";
import EditDrawer  from './EditDrawer'
import styles from './index.less'
import ProList from "@ant-design/pro-list";
import EnterpriseStore from "@/stores/EnterpriseStore";
import moment from "moment";
import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import HireinfoForm from './HireinfoForm'
import { Document, Page ,pdfjs} from 'react-pdf';
import {DownSquareOutlined} from "@ant-design/icons/lib";


const gridStyle : CSSProperties= {
  width: '33.33%',
  height:'150px',
  cursor:'pointer',
};

@observer
export default class UserCenter extends React.Component<any, any>{

    state = {
       visible : false,
       type : 'enterprise',
       isLawer : false,
       collapsedKey : -1,
      //子组件是否在编辑
      /*因为这个组件是map遍历出来的所以他的状态需要是数组*/
       isEditing : []
    }

  constructor(props) {
    super(props);
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
  }

    setVisible = (visible : boolean )=>{
      this.setState({visible})
    }


  showDrawer = (isLawer)=>{
      this.setVisible(true);
      this.setState({isLawer})
  }

  setCollapse = (collapsedKey)=>{
    this.setState({collapsedKey })
  }

  // 设置表单组件的值是否为编辑状态
  handleFormUpdate= (item)=>{
    this.setCollapse(item.hireinfoId)

    let isEditing : boolean[] | undefined[] = this.state.isEditing;
    //取反
    isEditing[item.hireinfoId] = !isEditing[item.hireinfoId];

    this.setState({isEditing})
  }

  async componentDidMount() {
      await EnterpriseStore.initializeEnterpriseInfo();
  }



  render() {
      const {visible, type } = this.state;
      const {enterpriseInfo,enterpriseInfo : { employeeList ,hireinfos}} :any  = EnterpriseStore;

      return (
          <>
          <Badge.Ribbon text={`目前已完成${78}%`}>
            <ProCard hoverable={true} style={{marginBottom:'20px'}}>

               <h1 style={{fontWeight:'bold'}}>企业招聘总进度</h1>
              <Progress
                strokeWidth={50}
                strokeColor={{
                  '0%': '#F98B83',
                  '100%': '#F54133',
                }}
                showInfo={false}
                type={"line"}
                percent={78}
                status="active"
              />
            </ProCard>
          </Badge.Ribbon>
            <ProCard  ghost={true} gutter={20}  >
              <ProCard hoverable style={{maxHeight:1500}} layout="default" bordered colSpan={10} >
                <Row gutter={[16, 16]} align={'top'} justify={'center'} wrap={true}>
                  <Col className={styles.col} span={24}>
                    <img
                      style={{width:'100%'}}
                      alt="logo"
                      src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                    />
                  </Col>
                  <Col className={styles.col} span={24}>
                        <div style={{fontSize:30}}>{enterpriseInfo.enterpriseName}</div>
                  </Col>
                  <Col className={styles.col} span={24}>
                    <Card style={{ width: '100%' }} >
                      {enterpriseInfo.enterpriseInfo}
                    </Card>
                  </Col>

                  <Col span={24}>
                    <Descriptions
                      bordered
                      title="企业信息"
                      column={2}
                      extra={<Button type="primary" onClick={()=>{this.showDrawer(false)}}>修改企业信息</Button>}
                    >
                      <Descriptions.Item label="企业名称">{enterpriseInfo.enterpriseName}</Descriptions.Item>
                      <Descriptions.Item label="企业邮箱">{enterpriseInfo.enterpriseAccount}</Descriptions.Item>
                      <Descriptions.Item label="注册资金">{enterpriseInfo.enterpriseRegisterAmount}</Descriptions.Item>
                      <Descriptions.Item label="企业人数">{enterpriseInfo.enterpriseNumsPerson}</Descriptions.Item>
                      <Descriptions.Item label="企业经营类型">{enterpriseInfo.enterpriseType}</Descriptions.Item>
                      <Descriptions.Item label="企业福利保障">{enterpriseInfo.enterpriseWelfare}</Descriptions.Item>
                      <Descriptions.Item label="企业建立时间">{moment(enterpriseInfo.enterpriseEstablishTime).format("YYYY-MM-DD")}</Descriptions.Item>
                      <Descriptions.Item label="企业登录密码">
                        <Input.Password bordered={false} readOnly  value={enterpriseInfo.enterprisePassword}/>
                      </Descriptions.Item>
                      <Descriptions.Item label="企业注册地址" span={4}>{enterpriseInfo.enterpriseLocation}</Descriptions.Item>
                      <Descriptions.Item span={4} label={'企业营业执照'}>
                         <Popover  trigger={'click'} placement={"top"} content={<Document
                            file={enterpriseInfo.enterpriseLicense} //PDF文件在此
                            onLoadSuccess={()=>{}}
                          >
                            <Page pageNumber={1} />
                          </Document>}  >
                           <Button type="ghost"  style={{width:'100%',color:'#D95656'}}  >点击查看企业营业执照</Button>
                        </Popover>
                      </Descriptions.Item>

                    </Descriptions>

                  </Col>
                  <Col span={24}>
                    <Descriptions  style={{marginTop:'40px'}}
                      bordered
                      title="法人信息"
                      column={2}
                      extra={<Button type="primary" onClick={()=>{this.showDrawer(true)}}>修改企业法人信息</Button>}
                    >
                      <Descriptions.Item label="企业法人姓名" span={4}>{enterpriseInfo.enterpriseCorperationName}</Descriptions.Item>
                      <Descriptions.Item label="企业法人手机号" span={4}>{enterpriseInfo.enterpriseCorperationPhoneNumber}</Descriptions.Item>
                    </Descriptions>

                  </Col>


                </Row>
              </ProCard>
              <ProCard  ghost={true} layout="default" bordered colSpan={14} direction={'column'} gutter={[20,20]}>

                <ProCard collapsible={true}  layout="default" bordered colSpan={24}  title={'公司团队成员:'}>
                  {
                    employeeList?.length ? employeeList.map((item : any) =>{
                      return (
                        <Card.Grid key={item.employeeId}  style={gridStyle} onClick={()=>{window.location.href='/Enterprise/employedList'}}>
                          <Comment
                            author={<a>{item.employeeName}</a>}
                            avatar={
                              <Avatar
                                src="https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg"
                              />
                            }
                            datetime={<Tag color={'red'}>
                              {JSON.parse(item.employeeWillingJob || [])[0]}
                            </Tag> }
                            content={
                              <p style={{textAlign:'left'}}>
                                <Ellipsis tooltip lines={3}>{item.employeeInfo}</Ellipsis>
                              </p>
                            }
                          />
                        </Card.Grid>
                      )
                    }) : <Empty/>
                  }
                </ProCard>

                <ProCard title={'正在进行的招聘信息:'} collapsible={true}  layout="default" bordered colSpan={24} >
                  {
                    hireinfos?.length ?
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
                        dataSource={
                          hireinfos.map((item) => ({
                            title: item.hireinfoTitle,
                            subTitle: <Tag color="#5BD8A6">需要{item.hireinfoRequireNumsPerson}人</Tag>,
                            actions: [<a onClick={()=>this.handleFormUpdate(item)}>{this.state.isEditing[item.hireinfoId] ? '完成' : '修改'}</a>,
                            <Popconfirm title={'你确定要删除?'} >
                              <a>删除</a>
                            </Popconfirm>],
                            avatar: 'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
                            content: (
                              <>
                                <Collapse  ghost  activeKey={this.state.collapsedKey}>
                                  <Collapse.Panel showArrow={false}  header={<a onClick={()=>this.setCollapse(item.hireinfoId)}>点击查看详细信息<DownSquareOutlined /></a>} key={item.hireinfoId}>
                                      {/*::::::::::::::::::::::如何在map遍历的时候引用多个form对象*/}
                                      <HireinfoForm isEditing={this.state.isEditing[item.hireinfoId]}  item={item}/>
                                  </Collapse.Panel>
                                </Collapse>

                              </>
                            )
                          }))
                        }
                      />
                      :
                      <Empty/>
                  }
                </ProCard>
              </ProCard>
            </ProCard>

            <EditDrawer visible={visible} setVisible={this.setVisible}  type={type}  isLawer={this.state.isLawer}/>
          </>
      )
    }

}
