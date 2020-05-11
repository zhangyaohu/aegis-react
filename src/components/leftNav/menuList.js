export const alarmList =  [
	{
    path: 'main/alarm-list',
    title: '告警明细表',
    type: 'link',
    icon: 'aegis-jifenmingxi',
    children: []
  },
  {
    path: 'main/trend-list',
    title: '趋势图预警',
    type: 'link',
    icon: 'aegis-icon-',
    children: []
  },
  {
    path: 'main/tablespace',
    title: '表空间预警',
    type: 'link',
    icon: 'aegis-danganziliao-kongjianshuju',
    children: []
  },
  {
    path: 'main/section-space',
    title: '段空间预警',
    type: 'link',
    icon: 'aegis-shot_time',
    children: []
  },
  {
    path: 'main/sql-report',
    title: 'SQL区段报表',
    type: 'link',
    icon: 'aegis-mysql',
    children: []
  },
  {
    path: 'main/sql-bind',
    title: 'SQL区段绑定变量',
    type: 'link',
    icon: 'aegis-SQLshujuji',
    children: []
  },
  {
    path: '$$sql-bind',
    title: 'SQL区段绑定变量',
    type: 'button',
    icon: 'aegis-SQLshujuji',
    children: [
      {
        path: 'main/sql-bind1',
        title: 'SQL区段绑定变量',
        type: 'link',
        icon: 'aegis-SQLshujuji',
        children: []
      },
    ]
  }
];

export const oracleList = [
  {
    path: 'trend-metric',
    title: '关键指标趋势',
    type: 'link',
    icon: 'aegis-qushitu',
    children: []
  },
  {
    path: 'session-history',
    title: '活动会话历史',
    type: 'link',
    icon: 'aegis-lishi',
    children: []
  },
  {
    path: 'awr-snapshot',
    title: 'AWR快照报表',
    type: 'link',
    icon: 'aegis-yunyingpankuaizhao',
    children: []
  },
  {
    path: 'sql-quote',
    title: 'SQL全文索引',
    type: 'link',
    icon: 'aegis-suoyinguanli',
    children: []
  },
  {
    path: 'quote-report',
    title: '索引访问报表',
    type: 'link',
    icon: 'aegis-biaoge',
    children: []
  },
  {
    path: 'record-change',
    title: '记录变更报表',
    type: 'link',
    icon: 'aegis-jilu',
    children: []
  },
  {
    path: 'order-report',
    title: '序列监控报表',
    type: 'link',
    icon: 'aegis-xulie',
    children: []
  },
  {
    path: 'data-dict',
    title: '数据字典报表',
    type: 'link',
    icon: 'aegis-shujuzidian',
    children: []
  },
  {
    path: 'tablespace-report',
    title: '表空间报表',
    type: 'link',
    icon: 'aegis-jiqunguanli',
    children: []
  },
  {
    path: 'sectionspace-report',
    title: '段空间报表',
    type: 'link',
    icon: 'aegis-shot_time',
    children: []
  }
]

export const configList = [
  {
    path: 'user-manager',
    title: '用户管理',
    type: 'link',
    icon: 'aegis-yonghuguanli',
    children: []
  },
  {
    path: 'role-manager',
    title: '角色管理',
    type: 'link',
    icon: 'aegis-jiaoseguanli',
    children: []
  },
  {
    path: 'host-manager',
    title: '主机管理',
    type: 'link',
    icon: 'aegis-pingtaiguanlizhujiguanli',
    children: []
  },
  {
    path: 'host-group',
    title: '主机群组',
    type: 'link',
    icon: 'aegis-jiqun',
    children: []
  },
  {
    path: 'template-manager',
    title: '模板管理',
    type: 'link',
    icon: 'aegis-template-management',
    children: []
  },
  {
    path: 'except-manager',
    title: '异常管理',
    type: 'link',
    icon: 'aegis-yichangguanli',
    children: []
  },
  {
    path: 'login-rank',
    title: '登录排行',
    type: 'link',
    icon: 'aegis-paihang',
    children: []
  }
]