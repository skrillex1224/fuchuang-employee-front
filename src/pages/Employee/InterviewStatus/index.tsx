import React from "react";
import {PageContainer} from "@ant-design/pro-layout";
import ProCard from "@ant-design/pro-card";
import {AlertFilled, CloseSquareFilled, EditOutlined, EllipsisOutlined, SettingOutlined} from "@ant-design/icons/lib";
import {Card, Descriptions, Empty, message, Steps} from "antd";


export default class Index extends React.Component<any, any>{

  render(): React.ReactNode {
    return (
      <PageContainer title={'正在进行的面试'} >
        <ProCard
          title="面试公司:  维诺智创大数据有限公司"
          hoverable
          headerBordered
          actions={[
            <div onClick={()=>{
               message.loading({content:'loading...',key:'msg',duration:0})
              setTimeout(()=>{
                message.destroy('msg');
                setTimeout(()=>{
                  message.success('催促hr成功,请耐心等待~');
                },400)
              },400)

            }}>进度停滞不前?催一下<AlertFilled /></div>,
            <div >取消该简历投递<CloseSquareFilled /></div>,
          ]}
        >
          <Steps current={2} >
            <Steps.Step title="简历已投递" description="等待Hr进行审核"/>
            <Steps.Step title="简历投递成功" description="等待Hr安排面试时间" />
            <Steps.Step title="面试时间地点确定" description="线下面试环节,准备好自己" />
            <Steps.Step title="面试通过" description="面试已通过,请等待公司进行商务联系" />
          </Steps>

          <Card style={{marginTop:'20px'}} bordered type={'inner'}  title={'线下面试信息'}>
            {
              false ? <Empty description={'请等待Hr确认线下面试信息'} />
                :
                <Descriptions column={2}>
                  <Descriptions.Item label="面试地点">Cloud Database</Descriptions.Item>
                  <Descriptions.Item label="面试时间">2021年12月1日 上午9:20</Descriptions.Item>
                </Descriptions>
            }
          </Card>
        </ProCard>
      </PageContainer>
    )
  }

}
