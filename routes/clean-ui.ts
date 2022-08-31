const routes: MenuRoute[] = [
  {
    path: '/',
    name: 'index',
    permission: 'register.active',
    meta: {
      title: {
        en: 'Register',
        th: 'ลงทะเบียน',
      },
      icon: 'trademark',
    },
    childrens: [
      // ใช้จริง
      // {
      //   path: '/auth/pre-register',
      //   name: 'auth-pre-register',
      //   permission: 'register.enco',
      //   meta: {
      //     title: {
      //       en: 'ENCO',
      //       th: 'อาคาร ENCO',
      //     },
      //     icon: 'team',
      //   },
      // },
      {
        path: '/auth/work-permit',
        name: 'auth-work-permit',
        permission: 'register.dataCenter',
        meta: {
          title: {
            en: 'Data Center (ENCO A)',
            th: 'ห้อง Data Center',
          },
          icon: 'laptop',
        },
      },
    ],
  },
  {
    path: '/history',
    name: 'history',
    permission: 'history.active',
    meta: {
      title: {
        en: 'History',
        th: 'ประวัติการลงทะเบียน',
      },
      icon: 'history',
    },
  },
  // {
  //   path: '/report',
  //   name: 'report',
  //   permission: 'report.active',
  //   meta: {
  //     title: {
  //       en: 'Report',
  //       th: 'รายงาน',
  //     },
  //     icon: 'file-done',
  //   },
  //   childrens: [
  //     {
  //       path: '/report/Reportdashboard',
  //       name: 'report-reportdashboard',
  //       permission: 'report.summary',
  //       meta: {
  //         title: {
  //           en: 'Overview Report',
  //           th: 'รายงานภาพรวมระบบ',
  //         },
  //         icon: 'read',
  //       },
  //     },
  //     {
  //       path: '/report/ReportBulid',
  //       name: 'report-report-bulid',
  //       permission: 'report.checkinCheckout',
  //       meta: {
  //         title: {
  //           en: 'Summary Report',
  //           th: 'รายงานสรุปเข้า-ออก',
  //         },
  //         icon: 'read',
  //       },
  //     },
  //     {
  //       path: '/report/ReportDay',
  //       name: 'report-report-day',
  //       permission: 'report.daily',
  //       meta: {
  //         title: {
  //           en: 'Daily Report',
  //           th: 'รายงานเข้า-ออก ประจำวัน',
  //         },
  //         icon: 'read',
  //       },
  //     },
  //     {
  //       path: '/report/Reportvip',
  //       name: 'xx-Reportvip',
  //       meta: {
  //         title: {
  //           en: 'Vip Report',
  //           th: 'รายงานผู้ติดต่อ VIP',
  //         },
  //         icon: 'read',
  //       },
  //     },
  //     {
  //       path: '/report/Reportban',
  //       name: 'xx-Reportban',
  //       meta: {
  //         title: {
  //           en: 'Ban Report',
  //           th: 'รายงานผู้ติดต่อถูก BANNED',
  //         },
  //         icon: 'read',
  //       },
  //     },
  //     {
  //       path: '/report/ReportPreregister',
  //       name: 'xx-ReportPreregister',
  //       meta: {
  //         title: {
  //           en: 'Preregister',
  //           th: 'ข้อมูลลงทะเบียนล่วงหน้า',
  //         },
  //         icon: 'read',
  //       },
  //     },
  //   ],
  // },
  {
    path: '/account',
    name: 'account',
    permission: 'account.active',
    meta: {
      title: {
        en: 'Account Manage',
        th: 'จัดการผู้ใช้งาน',
      },
      icon: 'folder-open',
    },
    childrens: [
      {
        path: '/account/account',
        name: 'account-account',
        permission: 'account.user',
        meta: {
          title: {
            en: 'Account',
            th: 'ผู้ใช้งาน',
          },
          icon: 'user',
        },
      },
      {
        path: '/account/role',
        name: 'account-role',
        permission: 'account.role',
        meta: {
          title: {
            en: 'Role',
            th: 'บทบาท',
          },
          icon: 'star',
        },
      },
    ],
  },
  // {
  //   path: '/master-data',
  //   name: 'master-data',
  //   permission: 'master.active',
  //   meta: {
  //     title: {
  //       en: 'master-data',
  //       th: 'ข้อมูลระบบ',
  //     },
  //     icon: 'folder-open',
  //   },
  //   childrens: [
  //     {
  //       path: '/master-data/visitorIndex',
  //       name: 'master-data-visitor-index',
  //       permission: 'master.visitor',
  //       meta: {
  //         title: {
  //           en: 'Visitor',
  //           th: 'ผู้ติดต่อ',
  //         },
  //         icon: 'solution',
  //       },
  //     },
  //     {
  //       path: '/master-data/accesscardIndex',
  //       name: 'master-data-accesscard-index',
  //       permission: 'master.card',
  //       meta: {
  //         title: {
  //           en: 'Accesscard',
  //           th: 'ข้อมูลบัตรแลกเข้า',
  //         },
  //         icon: 'audit',
  //       },
  //     },
  //     {
  //       path: '/master-data/buildingIndex',
  //       name: 'master-data-building-index',
  //       permission: 'master.building',
  //       meta: {
  //         title: {
  //           en: 'Building',
  //           th: 'ข้อมูลอาคาร/ตึก',
  //         },
  //         icon: 'idcard',
  //       },
  //     },
  //     {
  //       path: '/master-data/floorIndex',
  //       name: 'master-data-floor-index',
  //       permission: 'master.floor',
  //       meta: {
  //         title: {
  //           en: 'Floor',
  //           th: 'ข้อมูลชั้น',
  //         },
  //         icon: 'select',
  //       },
  //     },
  //     {
  //       path: '/master-data/companyIndex',
  //       name: 'master-data-company-index',
  //       permission: 'master.company',
  //       meta: {
  //         title: {
  //           en: 'Company',
  //           th: 'ข้อมูลบริษัท',
  //         },
  //         icon: 'credit-card',
  //       },
  //     },
  //     {
  //       path: '/master-data/objectiveIndex',
  //       name: 'master-data-objective-index',
  //       permission: 'master.objective',
  //       meta: {
  //         title: {
  //           en: 'Objective',
  //           th: 'ข้อมูลวัตถุประสงค์',
  //         },
  //         icon: 'security-scan',
  //       },
  //     },
  //     {
  //       path: '/master-data/countryIndex',
  //       name: 'master-data-country-index',
  //       permission: 'master.country',
  //       meta: {
  //         title: {
  //           en: 'Country',
  //           th: 'ข้อมูลประเทศ',
  //         },
  //         icon: 'reconciliation',
  //       },
  //     },
  //   ],
  // },
]

export default routes
