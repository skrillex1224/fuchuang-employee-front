import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {Alert,  Tabs,  notification} from 'antd';
import React, { useState } from 'react';
import ProForm, {  ProFormText } from '@ant-design/pro-form';
import { useIntl, connect, FormattedMessage } from 'umi';
import type { Dispatch } from 'umi';
import type { StateType } from '@/models/login';
import type { LoginParamsType } from '@/services/login';
import type { ConnectState } from '@/models/connect';
import RegisterDrawer from './RegisterDrawer/index'

import styles from './index.less';
import { RightCircleOutlined} from "@ant-design/icons/lib";

export type LoginProps = {
  dispatch: Dispatch;
  userLogin: StateType;
  submitting?: boolean;
};

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC<LoginProps> = (props) => {


  const { userLogin = {}, submitting } = props;
  const { status } = userLogin;


  // 当前的登录用户类型
  const [type, setType] = useState<string>('employee');

  //抽屉是否显示
  const [visible, setVisible] = useState(false);
  // 切换登录方式
  const [isUser,setIsUser] = useState(true);


  const intl = useIntl();

  const handleSubmit = (values: LoginParamsType) => {

    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values, type },
    });
  };

  const handleRegister = ()=>{
    if(type === 'admin'){
      notification.open({
        message: `提示信息:`,
        description:
          '请致电18735380816或联系天津工业大学计算机学院协助进行管理员权限的开通,暂不支持自行注册~',
        onClick: () => {
        },
      });
      return ;
    }

     setVisible(true);
  }

  return (
    <div className={styles.main}>
      <ProForm
        initialValues={{
          autoLogin: true,
        }}
        submitter={{
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            loading: submitting,
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        onFinish={(values) => {
          handleSubmit(values as LoginParamsType);
          return Promise.resolve();
        }}
      >
        {
          isUser ? (
              <Tabs activeKey={type} onChange={setType}>
                <Tabs.TabPane
                  key="employee"
                  tab={intl.formatMessage({
                    id: 'pages.login.accountLogin.tab',
                    defaultMessage: '求职者登录',
                  })}
                />
                <Tabs.TabPane
                  key="enterprise"
                  tab={intl.formatMessage({
                    id: 'pages.login.accountLogin.tab2',
                    defaultMessage: '企业登录',
                  })}
                />
              </Tabs>
          ) : (
            <Tabs activeKey={type} onChange={setType}>
              <Tabs.TabPane
                key="hr"
                tab={intl.formatMessage({
                  id: 'pages.login.accountLogin.tab3',
                  defaultMessage: 'HR登录',
                })}
              />

              <Tabs.TabPane
                key="admin"
                tab={intl.formatMessage({
                  id: 'pages.login.accountLogin.tab4',
                  defaultMessage: '管理员登录',
                })}
              />
            </Tabs>
          )
        }


        {status === 'error'  && !submitting && (
          <LoginMessage
            content={intl.formatMessage({
              id: 'pages.login.accountLogin.errorMessage',
              defaultMessage: '账户或密码错误',
            })}
          />
        )}
        {type === 'employee' && (
          <>
            <ProFormText
              name="userName"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.username.placeholder',
                defaultMessage: '用户名: 请输入您的用户名',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="请输入用户名!"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.password.placeholder',
                defaultMessage: '密码...',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="请输入密码！"
                    />
                  ),
                },
              ]}
            />
          </>
        )}

        {type === 'enterprise' && (
          <>
            <ProFormText
              name="userName"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.username.placeholder',
                defaultMessage: '用户名: 请输入您的用户名',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="请输入用户名!"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.password.placeholder',
                defaultMessage: '密码...',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="请输入密码！"
                    />
                  ),
                },
              ]}
            />
          </>
        )}
        {type === 'hr' && (
          <>
            <ProFormText
              name="userName"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.username.placeholder',
                defaultMessage: '用户名: 请输入您的用户名',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="请输入用户名!"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.password.placeholder',
                defaultMessage: '密码...',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="请输入密码！"
                    />
                  ),
                },
              ]}
            />
          </>
        )}

        {type === 'admin' && (
          <>
            <ProFormText
              name="userName"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.username.placeholder',
                defaultMessage: '用户名: 请输入您的用户名',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="请输入用户名!"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.password.placeholder',
                defaultMessage: '密码...',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="请输入密码！"
                    />
                  ),
                },
              ]}
            />
          </>
        )}

        <div
          style={{
            marginBottom: 24,
          }}
        >
          <a onClick={()=>{
            setIsUser(!isUser)
            setType(  !isUser ? 'employee' :  'hr')
          }} >{isUser ? '前往管理员登录页' : '我是用户,前往登录'} <RightCircleOutlined /></a>
          <a
            style={{
              float: 'right',
            }} onClick={handleRegister}
          >
            <div >{{'employee':'求职者注册?','enterprise':'企业注册?','admin':'管理员申请?','hr':'HR申请?'}[type]}</div>
          </a>
        </div>
      </ProForm>

      <RegisterDrawer visible={visible} setVisible={setVisible} type={type} />
    </div>

  );
};

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);

