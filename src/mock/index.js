import Mock from 'mockjs'
let mockconfig = [
    {   //路径是正则，不能加引号
        api: /test/, method: 'get', res: {
            'guid': '@guid',
            'id': '@id',
            '姓名': '@cname',
            '电话号码': /(133|156|189)[0-9]{8}/,
            '邮箱': '@email',
            '域账号': '@first',
            'ip地址': '@ip',
            '备注': '备注信息',
            '在线状态|1': ['on', 'off'],
            '数组|1-10': [
                { name: '@cname' }
            ],
            '日期': '@date',
            '时间': '@time'
        }
    },
    {
        api: /systemDepartment\/listAllDepartment/, method: 'get', res: {
            'total':2,
            'list':[{label:'计算机室'},{label:'设计室'}],
            'msg':'hello'
        }
    },
    {
        api: /systemDepartment\/listAllUserByDepartmentId/, method: 'get', res: {
            'id': '@id',
            '姓名': '@cname',
        }
    },
    //在此处继续添加api
]
for (let item of mockconfig) {
    console.log(`mock api ${item['api']}`)
    Mock.mock(item['api'], item['method'], item['res'])
}