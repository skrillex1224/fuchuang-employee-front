import {  Result } from 'antd';
import React from 'react';
import {BackwardOutlined} from "@ant-design/icons/lib";

const NoFoundPage: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="对不起,您所访问的页面不存在."
    extra={
        <a><BackwardOutlined />点击左侧导航栏</a>
    }
  />
);

export default NoFoundPage;
