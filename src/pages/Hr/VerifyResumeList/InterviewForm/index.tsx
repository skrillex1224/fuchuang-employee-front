import {DatePicker, Form, Input, message, Space} from 'antd';
import React,{useEffect, useRef} from "react";
import {FormInstance} from "antd/es";
import moment from "moment";

export default (props) => {
  const interviewFormInstance : any = useRef<FormInstance>();

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(()=>{
     const formRef = interviewFormInstance.current;
      formRef.setFieldsValue({
        id : 1,
        employeeName:'程福源'
      })
    },[])


  function onChange(_, dateString) {
    console.log('Formatted Selected Time: ', moment(dateString).unix());
  }

  return (
    <Form
      ref={interviewFormInstance}
      layout={"vertical"}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="面试人id"
        name="username"
        hidden={true}
      >
        <Input value={undefined}/>
      </Form.Item>

      <Form.Item
        label="面试人姓名"
        name="employeeName"
      >
        <Input readOnly={true} onClick={()=>message.error('面试人姓名不可修改!')}/>
      </Form.Item>

      <Form.Item
        label="面试时间"
        name="interviewTime"
        rules={[{ required: true, message: '请选择面试时间!' }]}
      >
          <DatePicker showTime onChange={onChange} style={{width:'100%'}}  />
      </Form.Item>

      <Form.Item
        label="面试地点"
        name="interviewLocation"
        rules={[{ required: true, message: '请输入面试地点!' }]}
      >
        <Input placeholder={'30字以内'} />
      </Form.Item>

    </Form>
  );
};
