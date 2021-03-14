import React, { Component } from 'react';
import type { ConnectProps } from 'umi';
import { connect } from 'umi';
import { Tag } from 'antd';
import groupBy from 'lodash/groupBy';
import moment from 'moment';
import type { NoticeItem } from '@/models/global';
import type { CurrentUser } from '@/models/user';
import type { ConnectState } from '@/models/connect';
import NoticeIcon from '../NoticeIcon';
import styles from './index.less';

export type GlobalHeaderRightProps = {
  notices?: NoticeItem[];
  currentUser?: CurrentUser;
  fetchingNotices?: boolean;
  onNoticeVisibleChange?: (visible: boolean) => void;
  onNoticeClear?: (tabName?: string) => void;
} & Partial<ConnectProps>;

class GlobalHeaderRight extends Component<GlobalHeaderRightProps> {
  componentDidMount() {
    const { dispatch } = this.props;

    if (dispatch) {
      dispatch({
        type: 'global/fetchNotices',
      });
    }
  }

  changeReadState = (clickedItem: NoticeItem): void => {
    const { id } = clickedItem;
    const { dispatch } = this.props;

    if (dispatch) {
      dispatch({
        type: 'global/changeNoticeReadState',
        payload: id,
      });
    }
  };

  getNoticeData = (): Record<string, NoticeItem[]> => {
    const { notices = [] } = this.props;

    if (!notices || notices.length === 0 || !Array.isArray(notices)) {
      return {};
    }

    const newNotices = notices.map((notice) => {
      const newNotice = { ...notice };

      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime as string).fromNow();
      }

      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }

      if (newNotice.extra ) {
          // processing: 'blue',
          // urgent: 'red',
          // doing: 'gold',
        newNotice.extra = (
          <Tag
            color={'blue'}
            style={{
              marginRight: 0,
            }}
          >
            {newNotice.extra}
          </Tag>
        );
      }

      return newNotice;
    });
    return groupBy(newNotices, 'type');
  };


  render() {
    const { currentUser, fetchingNotices, onNoticeVisibleChange } = this.props;
    const noticeData = this.getNoticeData();
    return (
      <NoticeIcon
        className={styles.action}
        count={currentUser && currentUser.notifyCount}
        onItemClick={(item) => {
          this.changeReadState(item as NoticeItem);
        }}
        loading={fetchingNotices}
        onPopupVisibleChange={onNoticeVisibleChange}
      >
        <NoticeIcon.Tab
          tabKey="notification"
          count={noticeData && noticeData.notification && noticeData.notification.length}
          list={noticeData && noticeData.notification}
          title="通知"
          emptyText="你已查看所有通知"
        />
      </NoticeIcon>
    );
  }
}

export default connect(({ user, global, loading }: ConnectState) => ({
  currentUser: user.currentUser,
  collapsed: global.collapsed,
  fetchingMoreNotices: loading.effects['global/fetchMoreNotices'],
  fetchingNotices: loading.effects['global/fetchNotices'],
  notices: global.notices,
}))(GlobalHeaderRight);
