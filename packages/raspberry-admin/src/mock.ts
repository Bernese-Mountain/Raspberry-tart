import Mock from 'mockjs';

// 编写拦截规则
Mock.mock('/api/user', 'get', {
  id: '@id',
  name: '@cname',
  age: '@integer(20, 50)',
});

// 启动Mock拦截
Mock.setup({
  timeout: '200-600',
});