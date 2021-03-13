import {request} from '@/utils/promise';


export async function query(): Promise<any> {
  // return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return request('fetchCurrentUser');
}

export async function queryNotices(): Promise<any> {
  // return request('/api/notices');
}
