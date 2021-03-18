import React from "react";
import {observer} from "mobx-react";
import {PageContainer} from "@ant-design/pro-layout";
import {Avatar, Card, List, Space} from "antd";

const data = [
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
  {
    title: 'Title 5',
  },
  {
    title: 'Title 6',
  },
];

@observer
export default class Index extends React.Component<any, any>{

    render(): React.ReactNode {
      return (
        <PageContainer>


          <List
            grid={{
              gutter: 16,
            }}
            dataSource={data}
            renderItem={(item : any ) => (
              <List.Item>
                <Card title={item?.title} >Card content</Card>
              </List.Item>
            )}
          />
        </PageContainer>
      )
    }
}
