import {observer} from "mobx-react";
import React from "react";
import {PageContainer} from "@ant-design/pro-layout";
import {Alert, Avatar, Button, Card, Col, Descriptions, Input, Modal, Rate, Row, Space, Table} from "antd";
import {CheckCircleFilled, CheckOutlined, ExclamationCircleOutlined, SearchOutlined} from "@ant-design/icons/lib";
import Highlighter from 'react-highlight-words';
import ProCard from "@ant-design/pro-card";
import InterviewForm from './InterviewForm'

import styles from './index.less'
import TextArea from "antd/lib/input/TextArea";

import { Document, Page ,pdfjs} from 'react-pdf';

const { success,confirm,info } = Modal;

@observer
export default class Index extends React.Component<any, any>{
  state = {
    searchText: '',
    searchedColumn: '',
    data: []
  };

  constructor(props) {
    super(props);
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
  }

  searchInput : any ;

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
      info({
        title: '请完善具体面试信息:',
        icon: <CheckOutlined/>,
        content: (<InterviewForm current={current}/>),
        okText: '通知他',
        cancelText:'取消',
        okCancel:true,
        onCancel() {
          console.log('Cancel');
        },
        onOk: function () {
          success({
            title: <>为他的简历评分: </>,
            icon: <CheckCircleFilled/>,
            content: (<>
                <Rate style={{fontSize: 40}} allowHalf/>
            </>),
            okText: '完成',
            onOk() {
              console.log('......')
            },
          });
        },
      });
      e.stopPropagation()
    }

  }

  refuseResume = (current)=>{
    return (e)=>{
      console.log(current)
      //@ts-ignore
      confirm({
        title: '请输入拒绝原因并确认:',
        icon: <ExclamationCircleOutlined />,
        content: <TextArea placeholder={'拒绝原因:未达到面试的目标公司最低要求'} showCount={true} allowClear bordered={true} rows={4}/>,
        onOk() {
          console.log('OK');
        },
        onCancel() {
          console.log('Cancel');
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
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      ...this.getColumnSearchProps('age'),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      ...this.getColumnSearchProps('age'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      ...this.getColumnSearchProps('address'),
    },
    {

      title: 'Column 1', dataIndex: 'address', key: '1' },
    { title: 'Column 2', dataIndex: 'address', key: '2' },
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



  componentDidMount(): void {
    let data : any[]  = [];
      for (let i = 0; i < 1000; i++) {
        data.push({
          key: i,
          avatar :<Avatar src={'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg'} size={"default"} />,
          name: `{John Brown}`,
          age: Math.random() * 100,
          address: 'New York No. 1 Lake Park',
          description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
        });
      }
      this.setState({data});
    }

  render(): React.ReactNode {
      // @ts-ignore
    return (
        <PageContainer>
          <Alert style={{marginBottom:'20px'}} banner={true} message="欢迎您,HR,以下为近期投递的简历信息,您可以对以下投递的简历信息进行筛选和打分"
                 type="warning"  closable={true} />
          <Table
            size={"middle"}
            columns={this.columns}
            pagination={{
              defaultPageSize:20
            }}
            expandable={{
              expandedRowRender: record => (
                <>
                  {/*style={{margin:'0 auto'}} */}
                  <ProCard hoverable  bordered colSpan={24} >
                    <Row gutter={[16, 16]} >
                      <Col className={styles.col} span={24}>
                        <Avatar  src={'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg'}  style={{width:'100px',height:'100px',fontSize:'70px',lineHeight:'90px'}}/>
                      </Col>
                      <Col className={styles.col} span={24}>
                        <div style={{fontSize:30}}>付敬华</div>
                      </Col>
                      <Col className={styles.col} span={24}>
                        <Card style={{ width: '100%' }} >
                          sdadadadad
                        </Card>
                      </Col>

                      <Col span={24} >
                        <Descriptions
                          bordered
                          title="个人信息"
                          column={2}
                        >
                          <Descriptions.Item label="真实姓名">付敬华</Descriptions.Item>
                          <Descriptions.Item label="手机号码">18735380816</Descriptions.Item>
                          <Descriptions.Item label="最高学历">大学本科</Descriptions.Item>
                          <Descriptions.Item label="毕业院校">天津工业大学</Descriptions.Item>
                          <Descriptions.Item label="性别">男</Descriptions.Item>
                          <Descriptions.Item label="个人综合评分" >
                            <Rate disabled defaultValue={4.5} allowHalf/>
                          </Descriptions.Item>
                          <Descriptions.Item label="理想工作方向" span={4}>
                            Data disk type: MongoDB
                            <br />
                            Database version: 3.4
                            <br />
                            Package: dds.mongo.mid
                            <br />
                            Storage space: 10 GB
                            <br />
                            Replication factor: 3
                            <br />
                            Region: East China 1<br />
                          </Descriptions.Item>
                          <Descriptions.Item span={4} label={'简历信息'}>
                            <Document
                              file={'https://react-fuchuang.oss-cn-zhangjiakou.aliyuncs.com/APP/DNOSS11869619_zh-CN_intl_181211182439_public_b0b3e034e3b1ba422c2d90da94d6afa7.pdf'} //PDF文件在此
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
            dataSource={this.state.data}
          />

        </PageContainer>
      )
    }
}
