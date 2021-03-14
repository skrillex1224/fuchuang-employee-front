import {request} from '@/utils/promise';

export async function readNoticeId(params) {
    return request('delNotification','POST',params)
}

export async function queryCurrent(): Promise<any> {
  return request('fetchCurrentUser');
}

export async function queryNotices(): Promise<any> {
  return request('fetchNotification');
}
