import React from "react";
import {PageContainer} from "@ant-design/pro-layout";
import {observer} from "mobx-react";
import { Document} from "react-pdf";

import {message} from "antd";
import {InboxOutlined} from "@ant-design/icons/lib";
import Dragger from "antd/es/upload/Dragger";



@observer
export default class Index extends React.Component<any, any>{

  state = {
    fileList : [],
  }

  employeeUploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
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
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} 文件上传成功!`);
      } else if (status === 'error') {
        message.error(`${info.file.name}文件上传失败!`);
      }
    },
  };


  componentDidMount(): void {
  }


  render() {
     return (
        <PageContainer>
          {
            false ?
            <Document
              file='https://www.gov.cn/zhengce/pdfFile/2021_PDF.pdf'
            /> :
              <Dragger style={{height:'400px'}}  {...this.employeeUploadProps} fileList={this.state.fileList}>
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
