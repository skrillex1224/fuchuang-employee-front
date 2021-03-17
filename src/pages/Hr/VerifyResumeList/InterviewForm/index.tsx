import {DatePicker, Form, Input, message} from 'antd';
import React,{useEffect, useRef} from "react";
import {FormInstance} from "antd/es";
import moment from "moment";

export default ({getFormValues,current}) => {
  const interviewFormInstance : any = useRef<FormInstance>();

  useEffect(()=>{
     const formRef = interviewFormInstance.current;
      formRef.setFieldsValue({
        id : 1,
        empName:'程福源'
      })

      getFormValues(async ()=>{
        try {
          await formRef.validateFields();
          const formValues = formRef.getFieldsValue()
          formValues.interviewTime = moment(formValues.interviewTime).unix();
          return formValues;
        } catch (e) {
          throw new Error(e);
        }
      })

    },[])



  return (
    <Form
      ref={interviewFormInstance}
      layout={"vertical"}

    >
      <Form.Item
        label="面试人姓名:"
        name="empName"
      >
        <Input bordered={true} readOnly={true} onClick={()=>message.error('面试人姓名不可修改!')}/>
      </Form.Item>

      <Form.Item
        label="面试时间:"
        name="interviewTime"
        rules={[{ required: true, message: '请选择面试时间!' }]}
      >
          <DatePicker showTime  style={{width:'100%'}}  />
      </Form.Item>

      <Form.Item
        label="面试地点:"
        name="interviewLocation"
        rules={[{ required: true, message: '请输入面试地点!' }]}
      >
        <Input placeholder={'30字以内'} />
      </Form.Item>

    </Form>
  );
};
