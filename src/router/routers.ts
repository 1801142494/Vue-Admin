//对外暴露配置路由（常量路由）
export const constantRoute = [
  {
    // 登录
    name: 'login', //命名路由
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      hidden: true, //是否隐藏， 隐藏为true
      icon: 'Promotion',
    },
  },
  {
    // 登录成功展示数据的路由
    name: 'layout',
    path: '/',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '',
      hidden: false,
      icon: '',
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
    ],
  },
  {
    name: 'Screen',
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    meta: {
      hidden: false,
      title: '数据大屏',
      icon: 'Platform',
    },
  },
  {
    name: 'Acl',
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    meta: {
      hidden: false,
      title: '权限管理',
      icon: 'Lock',
    },
    redirect: '/acl/user',
    children: [
      {
        name: 'User',
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        meta: {
          hidden: false,
          title: '用户管理',
          icon: 'User',
        },
      },
      {
        name: 'Role',
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        meta: {
          hidden: false,
          title: '角色管理',
          icon: 'UserFilled',
        },
      },
      {
        name: 'Permission',
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/index.vue'),
        meta: {
          hidden: false,
          title: '菜单管理',
          icon: 'Monitor',
        },
      },
    ],
  },
  {
    name: 'Product',
    path: '/product',
    component: () => import('@/layout/index.vue'),
    meta: {
      hidden: false,
      title: '商品管理',
      icon: 'Goods',
    },
    redirect: '/product/trademark',
    children: [
      {
        name: 'Trademark',
        path: '/product/trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        meta: {
          hidden: false,
          title: '品牌管理',
          icon: 'ShoppingCartFull',
        },
      },
      {
        name: 'Attr',
        path: '/product/attr',
        component: () => import('@/views/product/attr/index.vue'),
        meta: {
          hidden: false,
          title: '属性管理',
          icon: 'ChromeFilled',
        },
      },
      {
        name: 'Spu',
        path: '/product/spu',
        component: () => import('@/views/product/spu/index.vue'),
        meta: {
          hidden: false,
          title: 'SPU管理',
          icon: 'Calendar',
        },
      },
      {
        name: 'Sku',
        path: '/product/sku',
        component: () => import('@/views/product/sku/index.vue'),
        meta: {
          hidden: false,
          title: 'SKU管理',
          icon: 'Orange',
        },
      },
    ],
  },
  {
    // 404页面
    name: '404',
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404',
      hidden: true,
      icon: 'WarnTriangleFilled',
    },
  },
  {
    // 任意路由，上面都没匹配到
    name: 'Any',
    path: '/:pathMatch(.*)*', //特殊的路由配置，用于捕获任意路径并进行路由重定向
    redirect: '/404',
    meta: {
      title: '任意路由',
      hidden: true,
      icon: 'Notification',
    },
  },
]
