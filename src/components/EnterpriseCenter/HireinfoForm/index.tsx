import {Form, Input} from "antd";
import React, {useEffect, useRef} from "react";


export default  (props)=>{
  const {item,isEditing} = props;
  const currentForm :any = useRef();

  const {hireinfoRequireEducation,hireinfoRequireExperience,hireinfoSalary,hireinfoInfo}  = item

  useEffect(()=>{
    currentForm.current?.setFieldsValue({
      hireinfoRequireEducation,hireinfoRequireExperience,hireinfoSalary,hireinfoInfo
    })
  },[])

  return (
    <Form ref={currentForm}

          hideRequiredMark
      initialValues={{
        hireinfoRequireEducation,hireinfoRequireExperience,hireinfoSalary,hireinfoInfo
      }}
      layout={"horizontal"} colon={false}>
      <Form.Item name={"hireinfoRequireEducation"} style={{width:'100%'}} label={'学历要求:'} rules={[{required:true,message:'必填!'}]}>
        <Input  readOnly={!isEditing} bordered={isEditing || false} />
      </Form.Item>
      <Form.Item name={'hireinfoRequireExperience'} label={'经验要求:'} rules={[{required:true,message:'必填!'}]}>
        <Input  readOnly={!isEditing} bordered={isEditing || false}/>
      </Form.Item>
      <Form.Item name={'hireinfoSalary'} label={'薪资待遇:'} rules={[{required:true,message:'必填!'}]}>
        <Input  readOnly={!isEditing} bordered={isEditing || false} />
      </Form.Item>
      <Form.Item name={'hireinfoInfo'}  label={'招聘介绍:'} rules={[{required:true,message:'必填!'}]}>
        <Input readOnly={!isEditing} bordered={isEditing || false} />
      </Form.Item>
    </Form>
  )
}
