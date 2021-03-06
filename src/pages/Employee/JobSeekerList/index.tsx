import React from "react";
import {PageContainer} from "@ant-design/pro-layout";
import Search from "antd/lib/input/Search";
import {Avatar, Card, Divider, Checkbox, List, Space, Select} from "antd";
import {LikeOutlined, MessageOutlined, StarOutlined} from "@ant-design/icons/lib";

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export default class Index extends React.Component<any> {
    state = {
      loading : false,
      checkedList : []
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
                    <span style={{marginLeft:'20px'}}>工资边界:</span>
                    <Select bordered={false} defaultValue="lucy" style={{ width: 200 }} >
                      <Select.Option value="lucy">1000元以上</Select.Option>
                      <Select.Option value="juck">3000元以上</Select.Option>
                      <Select.Option value="mick">5000元以上</Select.Option>
                    </Select>

                    <span style={{marginLeft:'80px'}}>最低学历要求:</span>
                    <Select bordered={false} defaultValue="lucy" style={{ width: 200 }} >
                      <Select.Option value="lucy">1000元以上</Select.Option>
                      <Select.Option value="juck">3000元以上</Select.Option>
                      <Select.Option value="mick">5000元以上</Select.Option>
                    </Select>

                    <span style={{marginLeft:'80px'}}>工作经验(年):</span>
                    <Select bordered={false} defaultValue="lucy" style={{ width: 200 }} >
                      <Select.Option value="lucy">1000元以上</Select.Option>
                      <Select.Option value="juck">3000元以上</Select.Option>
                      <Select.Option value="mick">5000元以上</Select.Option>
                    </Select>
                <Divider/>
                <span style={{marginLeft:'20px'}}>公司类型:</span>
                <Select bordered={false} defaultValue="lucy" style={{ width: 200 }} >
                  <Select.Option value="lucy">1000元以上</Select.Option>
                  <Select.Option value="juck">3000元以上</Select.Option>
                  <Select.Option value="mick">5000元以上</Select.Option>
                </Select>

                <span style={{marginLeft:'80px'}}>津贴福利:</span>
                <Select bordered={false} defaultValue="lucy" style={{ width: 200 }} >
                  <Select.Option value="lucy">1000元以上</Select.Option>
                  <Select.Option value="juck">3000元以上</Select.Option>
                  <Select.Option value="mick">5000元以上</Select.Option>
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
                  dataSource={listData}
                  renderItem={item => (
                    <List.Item
                      key={item.title}
                      actions={[
                        <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                        <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                        <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                      ]}
                      extra={
                        <img
                          width={272}
                          alt="logo"
                          src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        />
                      }
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={<a href={item.href}>{item.title}</a>}
                        description={item.description}
                      />
                      {item.content}
                    </List.Item>
                  )}
                />

              </Card>
          </PageContainer>
      )
    }
}
