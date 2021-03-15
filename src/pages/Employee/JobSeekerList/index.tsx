import React from "react";
import {PageContainer} from "@ant-design/pro-layout";
import Search from "antd/lib/input/Search";
import {Card, Divider, Checkbox, List , Select, Collapse, Tag, Button, Descriptions,} from "antd";
import {CaretRightOutlined ,MoneyCollectOutlined} from "@ant-design/icons/lib";
import EmployeeStore from "@/stores/EmployeeStore";
import {observer} from "mobx-react";
import moment from "moment";

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
        '全选',
        'Java开发',
        'PHP开发',
        'WEB前端',
        '大数据',
        'Linux运维',
        'Android',
        'IOS',
        'C/Python',
        '软件测试'
      ]

    }

  handleCheckBox = (checkedList)=>{
    /***
     *  精华就是 this.state.checkedList 是上次的状态
     *  参数checkedList 是这次的状态
     *   然后看有没有全选
     */

    /*选择了所有其他的自动全选*/
      if((!checkedList.find((item)=>item === '全选')) &&  checkedList.length === 9 && this.state.checkedList.length < 10){
        this.setState({checkedList: [...checkedList,"全选"]})
        return ;
      }

      /*如果选择了全选*/
      if(checkedList.find((item)=>item === '全选' && this.state.checkedList.length < 10)){
        this.setState({checkedList: ["全选", "Java开发", "PHP开发", "WEB前端", "大数据", "Linux运维", "Android", "IOS", "C/Python", "软件测试"]})
        return ;
      }

      /**如果点击了其他按钮,且全选是10个的时候取消全选*/
      if(this.state.checkedList.length === 10 && checkedList.find((item)=>item === '全选')){
         this.setState({checkedList : checkedList.filter(item => item !=='全选')})
        return;
      }

      /**如果点击的是全选,则取消所有*/
      if(this.state.checkedList.length === 10  && (!checkedList.find((item)=>item === '全选'))){
        console.log('dsadasdad')
         this.setState({checkedList : []})
        return ;
      }


      this.setState({checkedList})
  }

  //投递简历
  handleSubmitResume = async  ()=>{
      this.setState({submitResume:true });
      //异步请求
      setTimeout(()=>{
        this.setState({submitResume:false});
      },2000)



  }


  async componentDidMount() {
      await EmployeeStore.initializeHireInfo();
  }

  render(): React.ReactNode {
      const {loading,checkedList} = this.state;
      // @ts-ignore
      return (
          <PageContainer>
              <Card hoverable  style={{display:'flex',justifyContent:'center'}} >
                <Search style={{width:'800px'}}  placeholder="输入公司的名称或信息....." enterButton="搜索" size="large" loading={loading} />
              </Card>
              <Card hoverable  style={{display:'flex',justifyContent:'flex-start',marginTop:'20px'}}  >
                  职位类型: <Checkbox.Group options={[
                    '全选',
                    'Java开发',
                    'PHP开发',
                    'WEB前端',
                    '大数据',
                    'Linux运维',
                    'Android',
                    'IOS',
                    'C/Python',
                    '软件测试'
              ]} value={checkedList} onChange={this.handleCheckBox} />
                  <Divider/>
                    <span style={{marginLeft:'20px'}}>薪资要求:</span>
                    <Select bordered={false} defaultValue="不限" style={{ width: 200 }} >
                      <Select.Option value="不限">不限</Select.Option>
                      <Select.Option value="lucy">3K以下</Select.Option>
                      <Select.Option value="juck">3K-5K</Select.Option>
                      <Select.Option value="mick">5K-8K</Select.Option>
                      <Select.Option value="mick">8K-12K</Select.Option>
                      <Select.Option value="mick">12K以上</Select.Option>
                    </Select>

                    <span style={{marginLeft:'80px'}}>学历要求:</span>
                    <Select bordered={false} defaultValue="不限" style={{ width: 200 }} >
                      <Option value="不限">不限</Option>
                      <Option value="职业高中">职业高中</Option>
                      <Option value="大学专科">大学专科</Option>
                      <Option value="大学本科">大学本科</Option>
                      <Option value="硕士">硕士</Option>
                      <Option value="博士">博士</Option>
                      <Option value="其他">其他</Option>
                    </Select>

                    <span style={{marginLeft:'80px'}}>工作经验:</span>
                    <Select bordered={false} defaultValue="不限" style={{ width: 200 }} >
                      <Option value="不限">不限</Option>
                      <Option value="应届生/在校生"><b>应届生/在校生</b></Option>
                      <Option value="一年以下">一年以下</Option>
                      <Option value="1~3年">1~3年</Option>
                      <Option value="3~5年">3~5年</Option>
                      <Option value="5~10年">5~10年</Option>
                    </Select>
                <Divider/>
                <span style={{marginLeft:'20px'}}>公司类型:</span>
                <Select bordered={false} defaultValue="不限" style={{ width: 200 }} >
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
                <Select bordered={false} defaultValue="不限" style={{ width: 200 }} >
                  <Select.Option value={'不限'}>不限</Select.Option>
                  <Select.Option value={'五险一金'}>五险一金</Select.Option>
                  <Select.Option value={'六险一金'}>六险一金</Select.Option>
                  <Select.Option value={'无'}>无</Select.Option>
                </Select>


                <span style={{marginLeft:'80px'}}>公司规模:</span>
                <Select bordered={false} defaultValue="不限" style={{ width: 200 }} >
                  <Select.Option value={'不限'}>不限</Select.Option>
                  <Select.Option value={5}>0~5人</Select.Option>
                  <Select.Option value={10}>5~10人</Select.Option>
                  <Select.Option value={20}>10~20人</Select.Option>
                  <Select.Option value={50}>20人~50人</Select.Option>
                  <Select.Option value={1000}>50人以上</Select.Option>
                </Select>
              </Card>
              <Card hoverable style={{marginTop:'20px'}} >
                <List
                  itemLayout="vertical"
                  size="large"
                  pagination={{
                    onChange: page => {
                      console.log(page);
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
