import React from "react";
import {PageContainer} from "@ant-design/pro-layout";
import Search from "antd/lib/input/Search";
import {Card, Divider,  List, Select, Collapse, Tag, Button, Descriptions, message,} from "antd";
import {CaretRightOutlined, MoneyCollectOutlined, SearchOutlined} from "@ant-design/icons/lib";
import EmployeeStore from "@/stores/EmployeeStore";
import {observer} from "mobx-react";
import moment from "moment";
import TagSelect from 'ant-design-pro/lib/TagSelect';

const {Panel} = Collapse;

const {Option} = Select;


@observer
export default class Index extends React.Component<any> {
    state = {
      //搜索状态
      loading : false,
      //投递简历的状态
      submitResume : false,
      checkedList : [
        'Java开发',
        'PHP开发',
        'WEB前端',
        '大数据',
        'Linux运维',
        'Android',
        'IOS',
        'C/Python',
        '软件测试'
      ],
      salary : 100000,
      college : '不限',
      experience : '不限',
      enterpriseType : '不限',
      welfare: '不限',
      enterpriseSize : 10000

    }

  //投递简历
  handleSubmitResume = async  ()=>{
      this.setState({submitResume:true });
      //异步请求
      setTimeout(()=>{
        this.setState({submitResume:false});
      },2000)

  }

  //重新根据条件筛选列表
  rerenderList = async ()=>{
    message.loading({content: '加载中....',key:'loading'})
    await EmployeeStore.initializeHireInfo() ;
    let hireInfoList  : any = EmployeeStore.hireInfoList;
    const {checkedList, salary, college,experience ,enterpriseType , welfare,enterpriseSize } = this.state;

    //薪水,如果有限制
    switch (salary) {
      case 100000:
        break;
      case 12000:
        hireInfoList = hireInfoList.filter((item : any )=>{return Number(item.hireinfoSalary) > 12000})
        break;
      case 8000:
        hireInfoList = hireInfoList.filter((item : any )=>(Number(item.hireinfoSalary) <= 12000 && Number(item.hireinfoSalary) >= 8000)   )
        break;
      case 5000:
        hireInfoList = hireInfoList.filter((item : any )=>(Number(item.hireinfoSalary) <= 8000 && Number(item.hireinfoSalary) >= 5000)   )
        break;
      case 3000:
        hireInfoList = hireInfoList.filter((item : any )=>(Number(item.hireinfoSalary) <= 5000 && Number(item.hireinfoSalary) >= 3000)   )
        break;
      case 0:
        hireInfoList = hireInfoList.filter((item : any )=>( Number(item.hireinfoSalary) <= 3000)   )
        break;
    }
    //学历要求
    if(college !== '不限'){
      hireInfoList = hireInfoList.filter((item :any) => item.hireinfoRequireEducation === college);
    }

    //工作经验
    if(experience !== '不限'){
      hireInfoList = hireInfoList.filter((item : any) => item.hireinfoRequireExperience === experience);
    }

    //公司类型
    if(enterpriseType !== '不限'){
      hireInfoList = hireInfoList.filter((item : any) => item.enterprise.enterpriseType === enterpriseType);
    }

    //津贴福利
    if(welfare !== '不限'){
      hireInfoList = hireInfoList.filter((item : any) => item.enterprise.enterpriseWelfare === welfare);
    }
    // 公司规模
    switch (enterpriseSize) {
      case 10000:
          break;
      case 0 :
          hireInfoList = hireInfoList.filter((item :any) => item.enterprise.enterpriseNumsPerson <= 5)
          break;
      case 5 :
        hireInfoList = hireInfoList.filter((item :any) => (item.enterprise.enterpriseNumsPerson <= 10 && item.enterprise.enterpriseNumsPerson >= 5) )
        break;
      case 10 :
        hireInfoList = hireInfoList.filter((item :any) => {
         return  item.enterprise.enterpriseNumsPerson <= 20 && item.enterprise.enterpriseNumsPerson >= 10})
        break;
      case 20 :
        hireInfoList = hireInfoList.filter((item :any) => (item.enterprise.enterpriseNumsPerson <= 50 && item.enterprise.enterpriseNumsPerson >= 20))
        break;
      case 50 :
        hireInfoList = hireInfoList.filter((item :any) => item.enterprise.enterpriseNumsPerson >=50 )
        break;
      default:
        break;
    }

    //职位类型
    //不是全选才进行操作
     hireInfoList = hireInfoList.filter((item : any) => checkedList.indexOf(item.hireinfoTitle) > -1);


      //重新渲染列表
      EmployeeStore.rerenderHireInfo(hireInfoList);
  }

  componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<{}>, snapshot?: any): void {
    message.destroy('loading')
  }

  handleSearch = async  (enterpriseName)=>{
    this.setState({loading:true });
    //如果是空的说明是清空操作
    if(enterpriseName){

      await EmployeeStore.rerenderHireInfoBySearch(enterpriseName);
    }else{
      await EmployeeStore.initializeHireInfo();
    }


    this.setState({loading:false });
  }



  async componentDidMount() {
      await EmployeeStore.initializeHireInfo();
  }



  render(): React.ReactNode {
      const {loading,checkedList } = this.state;
      // @ts-ignore
      return (
          <PageContainer>
              <Card hoverable  style={{display:'flex',justifyContent:'center'}} >
                <Search style={{width:'800px'}} onSearch={this.handleSearch} allowClear  placeholder="输入公司的名称或信息....."
                          enterButton={<>搜索 <SearchOutlined style={{verticalAlign:'middle',fontSize:20}}/></>}  size="large" loading={loading} />
              </Card>
              <Card hoverable>
                  <div style={{display:'flex',justifyContent:'flex-start'}}>
                    <div style={{width:'80px',marginLeft:'20px',lineHeight:'30px'}}>职位类型:</div>
                    <div >
                      <TagSelect   actionsText={{
                        selectAllText :'全选'
                      }} value={checkedList}  onChange={(value)=>{
                        this.setState({checkedList:value},()=>{
                          this.rerenderList();
                        }) } }>

                        {
                          [
                            'Java开发',
                            'PHP开发',
                            'WEB前端',
                            '大数据',
                            'Linux运维',
                            'Android',
                            'IOS',
                            'C/Python',
                            '软件测试'
                          ].map((item,index)=>{
                            return ( <TagSelect.Option value={item} key={index}>{item}</TagSelect.Option>)
                          })
                        }

                      </TagSelect>
                    </div>
                  </div>
                  <Divider/>
                    <span style={{marginLeft:'20px'}}>薪资要求:</span>
                    <Select onChange={(value)=>{
                      this.setState({salary:value},()=>{
                        this.rerenderList();
                      })

                    }} bordered={false} defaultValue={100000} style={{ width: 200 }} >
                      <Select.Option value={100000}>不限</Select.Option>
                      <Select.Option value={0}>3K以下</Select.Option>
                      <Select.Option value={3000}>3K-5K</Select.Option>
                      <Select.Option value={5000}>5K-8K</Select.Option>
                      <Select.Option value={8000}>8K-12K</Select.Option>
                      <Select.Option value={12000}>12K以上</Select.Option>
                    </Select>

                    <span style={{marginLeft:'80px'}}>学历要求:</span>
                    <Select onChange={(value)=>{
                      this.setState({college:value},()=>{
                        this.rerenderList();
                      })
                    }}  bordered={false} defaultValue="不限" style={{ width: 200 }} >
                      <Option value="不限">不限</Option>
                      <Option value="职业高中">职业高中</Option>
                      <Option value="大学专科">大学专科</Option>
                      <Option value="大学本科">大学本科</Option>
                      <Option value="硕士">硕士</Option>
                      <Option value="博士">博士</Option>
                      <Option value="其他">其他</Option>
                    </Select>

                    <span style={{marginLeft:'80px'}}>工作经验:</span>
                    <Select onChange={(value)=>{
                      this.setState({experience:value},()=>{
                        this.rerenderList();
                      })
                    }}  bordered={false} defaultValue={'不限'} style={{ width: 200 }} >
                      <Option value={'不限'}>不限</Option>
                      <Option value={'应届生/在校生'}><b>应届生/在校生</b></Option>
                      <Option value={'一年以下'}>一年以下</Option>
                      <Option value={'1~3年'}>1~3年</Option>
                      <Option value={'3~5年'}>3~5年</Option>
                      <Option value={'5~10年'}>5~10年</Option>
                    </Select>
                <Divider/>
                <span style={{marginLeft:'20px'}}>公司类型:</span>
                <Select onChange={(value)=>{
                  this.setState({enterpriseType:value},()=>{
                    this.rerenderList();
                  })
                }}  bordered={false} defaultValue="不限" style={{ width: 200 }} >
                  <Select.Option value={'不限'}>不限</Select.Option>
                  <Select.Option value={'合资'}>合资</Select.Option>
                  <Select.Option value={'独资'}>独资</Select.Option>
                  <Select.Option value={'国有'}>国有</Select.Option>
                  <Select.Option value={'私营'}>私营</Select.Option>
                  <Select.Option value={'全民所有制'}>全民所有制</Select.Option>
                  <Select.Option value={'集体所有制'}>集体所有制</Select.Option>
                  <Select.Option value={'股份制'}>股份制</Select.Option>
                  <Select.Option value={'有限责任'}>有限责任</Select.Option>
                </Select>

                <span style={{marginLeft:'80px'}}>津贴福利:</span>
                <Select  onChange={(value)=>{
                  this.setState({welfare:value},()=>{
                    this.rerenderList();
                  })
                }}  bordered={false} defaultValue="不限" style={{ width: 200 }} >
                  <Select.Option value={'不限'}>不限</Select.Option>
                  <Select.Option value={'五险一金'}>五险一金</Select.Option>
                  <Select.Option value={'六险一金'}>六险一金</Select.Option>
                  <Select.Option value={'无'}>无</Select.Option>
                </Select>


                <span style={{marginLeft:'80px'}}>公司规模:</span>
                <Select  onChange={(value)=>{
                  this.setState({enterpriseSize:value},()=>{
                    this.rerenderList();
                  })
                }}  bordered={false} defaultValue={10000} style={{ width: 200 }} >
                  <Select.Option value={10000}>不限</Select.Option>
                  <Select.Option value={0}>0~5人</Select.Option>
                  <Select.Option value={5}>5~10人</Select.Option>
                  <Select.Option value={10}>10~20人</Select.Option>
                  <Select.Option value={20}>20人~50人</Select.Option>
                  <Select.Option value={50}>50人以上</Select.Option>
                </Select>
              </Card>
              <Card hoverable style={{marginTop:'20px'}} >
                <List
                  itemLayout="vertical"
                  size="large"
                  pagination={{
                    onChange: page => {
                      let minusVal = 10;
                      const timer = setInterval(()=>{
                        if(window.scrollY <= 0) clearInterval(timer);
                        minusVal += 5;
                        window.scrollTo( 0,window.scrollY - minusVal)
                      },10)
                    },
                    pageSize: 10,
                  }}
                  dataSource={EmployeeStore.hireInfoList}
                  renderItem={(item : any ) => (
                    <List.Item
                      key={item.hireInfoId}
                      extra={
                        <img
                          width={272}
                          alt="logo"
                          src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        />
                      }
                    >
                      <List.Item.Meta

                        title={
                          <div>
                            <a><b>{`${item.hireinfoTitle} [${item.enterprise && item.enterprise.enterpriseLocation}]`}</b></a>
                            <Tag style={{marginLeft:'10px'}} color={'#DA5757'}>{item.hireinfoRequireEducation}</Tag>
                            <Tag style={{marginLeft:'10px'}} color={'#DA5757'}>{item.hireinfoRequireExperience}</Tag>
                            <Tag style={{marginLeft:'10px'}} color={'#DA5757'}>需要{item.hireinfoRequireNumsPerson}人</Tag>
                            <a style={{fontSize:20,fontWeight:'bold',float:'right'}}>{item.enterprise && item.enterprise.enterpriseName}</a>
                          </div>
                        }
                        description={<div>
                          <span style={{fontSize:20,color:'#fc703e'}}><MoneyCollectOutlined />{item.hireinfoSalary/1000}K/月</span>
                          <span>{item.hireinfoInfo}</span>
                          <div style={{float:'right'}}>
                            <Tag color={"red"}>{item.enterprise && item.enterprise.enterpriseType}</Tag>
                            <Tag color={"red"}>{item.enterprise && item.enterprise.enterpriseNumsPerson}人</Tag>
                            <Tag color={"red"}>{item.enterprise && item.enterprise.enterpriseWelfare}</Tag>
                          </div>
                        </div>}

                      />
                      <Collapse
                        ghost={false}
                        bordered={false}
                        defaultActiveKey={['1']}
                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                        className="site-collapse-custom-collapse"
                      >
                        <Panel style={{backgroundColor:'#FFFFFFAA'}}   header="招聘公司扩展信息" key="1" className="site-collapse-custom-panel">
                          <Descriptions column={2}>
                            <Descriptions.Item label="公司建立时间">{item.enterprise && moment(item.enterprise.enterpriseEstablishTime).format("YYYY-MM-DD")}</Descriptions.Item>
                            <Descriptions.Item label="公司注册资金">{item.enterprise && item.enterprise.enterpriseRegisterAmount}万</Descriptions.Item>
                            <Descriptions.Item label="公司法人姓名">{item.enterprise && item.enterprise.enterpriseCorperationName}</Descriptions.Item>
                            <Descriptions.Item label="公司法人联系电话">{item.enterprise && item.enterprise.enterpriseCorperationPhoneNumber}</Descriptions.Item>
                            <Descriptions.Item label="公司介绍信息" span={4}>
                              {item.enterprise && item.enterprise.enterpriseInfo}
                            </Descriptions.Item>
                          </Descriptions>
                        </Panel>
                      </Collapse>
                      <Button loading={this.state.submitResume} onClick={this.handleSubmitResume}  type={"primary"} style={{float:'right',marginTop:'10px'}}>投递我的简历至改公司</Button>
                    </List.Item>
                  )}
                />

              </Card>
          </PageContainer>
      )
    }
}
