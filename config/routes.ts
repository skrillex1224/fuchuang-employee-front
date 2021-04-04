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
            authority: ['admin', 'employee','enterprise','hr'],
            routes: [
              {
                path: '/employee',
                redirect: '/account/employeeCenter',
              },

              {
                path: '/hr',
                redirect: '/account/hrCenter',
              },

              {
                path: '/enterprise',
                redirect: '/account/enterpriseCenter',
              },
              {
                path: '/admin',
                redirect: '/admin/adminCenter',
              },
              {
                name: '复核中心',
                icon: 'HomeOutlined',
                path: '/admin/adminCenter',
                component: '../pages/admin/index',
                authority: ['admin']
              },
              {
                name: '招聘信息总览',
                icon: 'HeatMapOutlined',
                path: '/employee/jobSeekerList',
                component: '../pages/employee/JobSeekerList',
                authority: ['employee']
              },
              {
                path:'/employee/resume',
                icon: 'FileWordOutlined',
                name: '我的简历',
                component: '../pages/Employee/Resume',
                authority: ['employee'],
              },
              {
                path:'/employee/interviewStatus',
                icon: 'RiseOutlined',
                name: '面试进度',
                component: '../pages/Employee/InterviewStatus',
                authority: ['employee'],
              },
              {
                path:'/employee/courseList',
                icon: 'BlockOutlined',
                name: '选课列表',
                component: '../pages/Employee/CourseList',
                authority: ['employee'],
              },
              {
                path:'/account/employeeCenter',
                icon: 'HomeOutlined',
                name: '个人中心',
                component: '../components/UserCenter',
                authority: ['employee'],
              },
              {
                path:'/Enterprise/hireEmployeeList',
                icon: 'UnorderedListOutlined',
                name: '招聘人才列表',
                component: '../pages/Enterprise/HireEmployeeList',
                authority: ['enterprise'],
              },
              {
                path:'/Enterprise/publishHireInfo',
                icon: 'ContainerOutlined',
                name: '发布招聘信息',
                component: '../pages/Enterprise/PublishHireInfo',
                authority: ['enterprise'],
              },
              {
                path:'/Enterprise/employedList',
                icon: 'MenuUnfoldOutlined',
                name: '在职人员管理',
                component: '../pages/Enterprise/EmployedList',
                authority: ['enterprise'],
              },
              {
                path:'/account/enterpriseCenter',
                icon: 'HomeOutlined',
                name: '个人中心',
                component: '../components/EnterpriseCenter',
                authority: ['enterprise'],
              },
              {
                path:'/hr/unverifyEnterprise',
                icon: 'PaperClipOutlined',
                name: '审核企业注册信息',
                component: '../pages/Hr/UnverifyEnterprise',
                authority: ['hr'],
              },
              {
                path:'/hr/verifyResumeList',
                icon: 'HighlightOutlined',
                name: '审阅求职简历',
                component: '../pages/Hr/VerifyResumeList',
                authority: ['hr'],
              },
              {
                path:'/hr/interviewTable',
                icon: 'SelectOutlined',
                name: '面试信息安排',
                component: '../pages/Hr/interviewTable',
                authority: ['hr'],
              },
              {
                path:'/hr/courseTable',
                icon: 'CoffeeOutlined',
                name: '培训信息安排',
                component: '../pages/Hr/courseTable',
                authority: ['hr'],
              },
              {
                path:'/account/hrCenter',
                icon: 'HomeOutlined',
                name: '个人中心',
                component: '../components/HrCenter',
                authority: ['hr'],
              },

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
