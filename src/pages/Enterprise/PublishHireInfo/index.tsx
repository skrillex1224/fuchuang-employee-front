import {observer} from "mobx-react";
import React from "react";
import {PageContainer} from "@ant-design/pro-layout";
import {Button,  Form, Input, InputNumber, Select, } from "antd";

import styles from './index.less'
import TextArea from "antd/es/input/TextArea";

const {Option} = Select;

@observer
export default class Index extends React.Component<any, any>{

  formInstance : any  = React.createRef();

  onFinish  = (val)=>{
    console.log(val )
  }

  onFinishFailed = ()=>{

  }


   render(): React.ReactNode {
    const {current : formRef} = this.formInstance;

     return (
       <PageContainer >

         <Form
           className={styles.pubForm}
           ref={this.formInstance}
           name="basic"
           wrapperCol={{span : 8,offset:8}}
           labelCol={{span : 8,offset:8}}
           layout={'vertical'}
           initialValues={{ remember: true }}
           onFinish={this.onFinish}
           onFinishFailed={this.onFinishFailed}
         >
           <h1 className={styles.pageHeader}>发布招聘信息</h1>

           <Form.Item
             label="岗位名称:"
             name="hireInfoTitle"
             rules={[{ required: true, message: '请选择岗位名称!' }]}
           >
             <Select
               showArrow
               defaultValue={['WEB前端']}
               style={{ width: '100%' }}
               placeholder={'choose....'}
               onChange={()=>this.forceUpdate()}
             >
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
           </Form.Item>

           {
             formRef && formRef.getFieldValue('hireInfoTitle') === '其他' &&
             <Form.Item
               label="自定义岗位名称:"
               name="hireInfoTitleDiy"
               rules={[{ required: true, message: '请输入岗位名称!' }]}
             >
               <Input/>
             </Form.Item>
           }
           <Form.Item
             label="岗位薪资区间下界:"
             name="hireInfoSalarySub"
             rules={[{ required: true, message: '请选择岗位薪资!' }]}
           >
             <InputNumber
               defaultValue={1000}
               formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
               parser={value => value?.replace(/\$\s?|(,*)/g, '')}
               style={{width:'100%'}}
             />
           </Form.Item>

           <Form.Item
             name="hireInfoSalaryTop"
             label="岗位薪资区间上界:"
             rules={[{ required: true, message: '请选择岗位薪资!' }]}
           >
             <InputNumber
               defaultValue={1000}
               formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
               parser={value => value?.replace(/\$\s?|(,*)/g, '')}
               style={{width:'100%'}}
             />
           </Form.Item>

           <Form.Item
             label="学历要求:"
             name="hireInfoRequiredEducation"
             rules={[{ required: true, message: '请选择最低学历要求!' }]}
           >
             <Select
               style={{ width: '100%' }}
               placeholder={'choose....'}
             >
               <Option value="职业高中">职业高中</Option>
               <Option value="大学专科">大学专科</Option>
               <Option value="大学本科">大学本科</Option>
               <Option value="硕士">硕士</Option>
               <Option value="博士">博士</Option>
               <Option value="其他">其他</Option>
             </Select>
           </Form.Item>

           <Form.Item
             label="经验要求:"
             name="hireInfoRequiredExperience"
             rules={[{ required: true, message: '请选择经验要求!' }]}
           >
             <Select
               style={{ width: '100%' }}
               placeholder={'choose....'}
             >
               <Option value="应届生/在校生"><b>应届生/在校生</b></Option>
               <Option value="一年以下">一年以下</Option>
               <Option value="1~3年">1~3年</Option>
               <Option value="3~5年">3~5年</Option>
               <Option value="5~10年">5~10年</Option>
             </Select>
           </Form.Item>

           <Form.Item
             label="岗位招聘人数:"
             name="hireInfoRequiredNumsPerson"
             rules={[{ required: true, message: '请输入岗位招聘人数!' }]}
             help={'请输入1-100之间的整数,单位(人)'}
           >
             <InputNumber
               defaultValue={2}
               style={{width:'100%'}}
               min={1}
               max={100}
             />
           </Form.Item>

           <Form.Item
             label="岗位简介:"
             name="hireInfoInfo"
             rules={[{ required: true, message: '请输入岗位简介!' }]}
           >
             <TextArea rows={6} placeholder={'请输入岗位简介，100字以内'} size={"large"}/>
           </Form.Item>

           <Form.Item >
             <Button type="primary"  htmlType="submit" block size={"large"}>
               发&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;布
             </Button>
           </Form.Item>
         </Form>

       </PageContainer>
     )
   }
}
