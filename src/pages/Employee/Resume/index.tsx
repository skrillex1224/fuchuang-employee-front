import React from "react";
import {PageContainer} from "@ant-design/pro-layout";
import {observer} from "mobx-react";
import { Document} from "react-pdf";

import {message} from "antd";
import {InboxOutlined} from "@ant-design/icons/lib";
import Dragger from "antd/es/upload/Dragger";
import {host} from "@/utils/promise";
import {isContainerResume} from "@/apis/employee";



@observer
export default class Index extends React.Component<any, any>{

  state = {
    fileList : [],
    isContainerResume : false
  }

  employeeUploadProps = {
    name: 'resume',
    multiple: false,
    action: `${host}uploadResumeSeparately`,
    onChange : (info : any )=> {
      const { status } = info.file;
      let fileList = [...info.fileList];
      fileList = fileList.slice(-1);
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.url;
        }
        return file;
      });

      this.setState({ fileList: fileList });


      if (status !== 'uploading') {
      }
      if (status === 'done') {
        message.success(`${info.file.name} 文件上传成功!`);
      } else if (status === 'error') {
        message.error(`${info.file.name}文件上传失败!`);
      }
    },
  };


 async componentDidMount() {
     const response = (await isContainerResume()).data;
     this.setState({isContainerResume:response.flag});
  }


  render() {
     return (
        <PageContainer>
          {
            this.state.isContainerResume ?
            <Document
              file='https://www.gov.cn/zhengce/pdfFile/2021_PDF.pdf'
            /> :
              <Dragger height={700}   {...this.employeeUploadProps} fileList={this.state.fileList}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">您还没有上传过简历</p>
                <p className="ant-upload-text">拖拽或点击进行简历的上传</p>
              </Dragger>


          }
        </PageContainer>
     )
   }
}
