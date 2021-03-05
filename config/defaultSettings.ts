import { Settings as ProSettings } from '@ant-design/pro-layout';

type DefaultSettings = Partial<ProSettings> & {
  pwa: boolean;
};

const proSettings: DefaultSettings = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#C70303AA',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '微\u00A0\u00A0聘',
  pwa: false,
  iconfontUrl: '',
};

export type { DefaultSettings };

export default proSettings;
