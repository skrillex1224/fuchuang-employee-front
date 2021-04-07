import {observer} from "mobx-react";
import React from "react";
import {PageContainer} from "@ant-design/pro-layout";
import {Avatar, Button, Card, Carousel, Col, message, Modal, Row,Input} from "antd";
import styles from './index.less'
import Meta from "antd/es/card/Meta";

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

@observer
export default class Index extends React.Component<any, any>{
   onChange = ()=>{

   }

  carouselRef : any  = React.createRef();

   render(): React.ReactNode {
     return (
        <PageContainer title={<>
          复核中心
          <Button onClick={()=>this.carouselRef.current.prev()} type={'link'}>上一条复核申请</Button>
          <Button onClick={()=>this.carouselRef.current.next()} type={'link'}>下一条复核申请</Button>
        </>}>
          <Carousel ref={this.carouselRef} vertical={true} dots={false}  draggable={true} className={styles.carousel}  afterChange={this.onChange}>
            <Card hoverable
              actions={[
                <div onClick={()=>{
                  Modal.confirm({
                     title:'请输入驳回原因',
                     content : <>
                      <Input.TextArea rows={4} />
                     </> ,
                    onOk :()=>{
                       return new Promise(resolve => {
                          setTimeout(()=>{
                             resolve(null);
                             message.success("操作成功");
                          },1000)
                       })
                    }
                  })
                }}>驳回该复核申请</div>,
              ]}
            >
              <Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title="付敬华"
                description="申请复核选项: 创新能力"
              />
                <Card style={{marginTop:20}}  title={'近期hr审查记录'} type={"inner"} >
                  <Card style={{marginTop:20}} title="Card title" type={"inner"} >
                    Card content
                  </Card>

                  <Card style={{marginTop:20}}  title="Card title" type={"inner"} >
                    Card content
                  </Card>

                </Card>



            </Card>
            <div className={styles.carousel_item}>2</div>
            <div className={styles.carousel_item}>3</div>
            <div className={styles.carousel_item}>4</div>
          </Carousel>
        </PageContainer>
     )
   }
}
