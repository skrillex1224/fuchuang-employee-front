import {request} from '@/utils/promise';
import ts from '@/utils/request';


export async function query(): Promise<any> {
  return ts('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return request('fetchCurrentUser');
}

export async function queryNotices(): Promise<any> {
  return ts('/api/notices');
}
