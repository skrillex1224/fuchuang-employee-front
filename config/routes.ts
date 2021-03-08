export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/employee/jobSeekerList',
              },
              {
                name: '招聘信息总览',
                icon: 'HeatMapOutlined',
                path: '/employee/jobSeekerList',
                component: '../pages/employee/JobSeekerList',
                authority: ['admin','user']
              },
              {
                path:'/employee/resume',
                icon: 'FileWordOutlined',
                name: '我的简历',
                component: '../pages/Employee/Resume',
                authority: ['admin'],
              },
              {
                path:'/employee/interviewStatus',
                icon: 'RiseOutlined',
                name: '面试进度',
                component: '../pages/Employee/InterviewStatus',
                authority: ['admin'],
              },
              {
                path:'/account/center',
                icon: 'HomeOutlined',
                name: '个人中心',
                component: '../components/UserCenter',
                authority: ['admin'],
              },
              {
                path:'/Enterprise/publishHireInfo',
                icon: 'ContainerOutlined',
                name: '发布招聘信息(qiye)',
                component: '../pages/Enterprise/PublishHireInfo',
                authority: ['admin'],
              },
              {
                path:'/Enterprise/employedList',
                icon: 'MenuUnfoldOutlined',
                name: '在职人员管理(qiye)',
                component: '../pages/Enterprise/EmployedList',
                authority: ['admin'],
              },
              {
                path:'/account/enterpriseCenter',
                icon: 'HomeOutlined',
                name: '个人中心(qiye)',
                component: '../components/EnterpriseCenter',
                authority: ['admin'],
              },

              // {
              //   path: '/admin',
              //   name: 'admin',
              //   icon: 'crown',
              //   component: './Admin',
              //   authority: ['admin'],
              //   routes: [
              //     {
              //       path: '/admin/sub-page',
              //       name: 'sub-page',
              //       icon: 'smile',
              //       component: './Welcome',
              //       authority: ['admin'],
              //     },
              //   ],
              // },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
