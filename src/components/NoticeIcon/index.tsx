import { BellOutlined } from '@ant-design/icons';
import { Badge, Spin } from 'antd';
import useMergedState from 'rc-util/es/hooks/useMergedState';
import React from 'react';
import classNames from 'classnames';
import type { NoticeIconTabProps } from './NoticeList';
import NoticeList from './NoticeList';

import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';


export type NoticeIconData = {
  avatar?: string | React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  datetime?: React.ReactNode;
  extra?: React.ReactNode;
  style?: React.CSSProperties;
  key?: string | number;
  read?: boolean;
};

export type NoticeIconProps = {
  count?: number;
  bell?: React.ReactNode;
  className?: string;
  loading?: boolean;
  onClear?: (tabName: string, tabKey: string) => void;
  onItemClick?: (item: NoticeIconData, tabProps: NoticeIconTabProps) => void;
  onViewMore?: (tabProps: NoticeIconTabProps, e: MouseEvent) => void;
  onTabChange?: (tabTile: string) => void;
  style?: React.CSSProperties;
  onPopupVisibleChange?: (visible: boolean) => void;
  popupVisible?: boolean;
  clearText?: string;
  viewMoreText?: string;
  clearClose?: boolean;
  emptyImage?: string;
  children: React.ReactElement<NoticeIconTabProps>[];
};

const NoticeIcon: React.FC<NoticeIconProps> & {
  Tab: typeof NoticeList;
} = (props) => {
  const getNotificationBox = (): React.ReactNode => {
    const {
      children,
      loading,
      onClear,
      onItemClick,
      onViewMore,
      clearText,
      viewMoreText,
    } = props;
    if (!children) {
      return null;
    }
    const panes: React.ReactNode[] = [];
    React.Children.forEach(children, (child: React.ReactElement<NoticeIconTabProps>): void => {
      if (!child) {
        return;
      }
      const { list, title, count, tabKey, showClear } = child.props;
      const len = list && list.length ? list.length : 0;
      // @ts-ignore
      const msgCount = count || count === 0 ? count : len;
      panes.push(
          <NoticeList
            {...child.props}
            clearText={clearText}
            viewMoreText={viewMoreText}
            data={list}
            onClear={(): void => {
              onClear?.(title, tabKey);
            }}
            onClick={(item): void => {
              onItemClick?.(item, child.props);
            }}
            onViewMore={(event): void => {
              onViewMore?.(child.props, event);
            }}
            showClear={showClear}
            showViewMore={false}
            title={title}
          />
      );
    });
    return (
      <Spin spinning={loading} delay={300}>
          {panes}
      </Spin>
    );
  };

  const { className, count, bell } = props;

  const [visible, setVisible] = useMergedState<boolean>(false, {
    value: props.popupVisible,
    onChange: props.onPopupVisibleChange,
  });
  const noticeButtonClass = classNames(className, styles.noticeButton);
  const notificationBox = getNotificationBox();
  const NoticeBellIcon = bell || <BellOutlined className={styles.icon} />;
  const trigger = (
    <span className={classNames(noticeButtonClass, { opened: visible })}>
      <Badge count={count} style={{ boxShadow: 'none' }} className={styles.badge}>
        {NoticeBellIcon}
      </Badge>
    </span>
  );
  if (!notificationBox) {
    return trigger;
  }

  return (
    <HeaderDropdown
      placement="bottomRight"
      overlay={notificationBox}
      overlayClassName={styles.popover}
      trigger={['click']}
      visible={visible}
      onVisibleChange={setVisible}
    >
      {trigger}
    </HeaderDropdown>
  );
};

NoticeIcon.defaultProps = {
  emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg',
};

NoticeIcon.Tab = NoticeList;

export default NoticeIcon;
