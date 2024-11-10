import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// 引入path模块
import path from 'path'
// 引入svg需要用到的插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// mock插件提供的方法 模拟后端接口
import { viteMockServe } from 'vite-plugin-mock'
export default defineConfig(({ command,mode })=>{
  // 获取各种环境下的对应变量
  let env=loadEnv(mode,process.cwd())
  return {
    plugins: [vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        // 保证开发阶段使用mock接口
        enable: command === 'serve',
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src") // 相对路径别名配置，使用 @ 代替 src
      }
    },
    // scss全局变量设置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
    // 代理服务器
    // server:{
    //   proxy:{
    //     [env.VITE_APP_BASE_API]:{
    //       // 获取数据的服务器地址
    //       target:env.VITE_SERVE,
    //       // 需要代理跨域
    //       changeOrigin:true,
    //       // 路径重写
    //       rewrite:(path)=>path.replace(/^\/api/,'')
    //     }
    //   }
    // }
    server: {
      proxy: {
        "/api/admin/acl": { // 更新代理规则以匹配新的路径
        target: "http://sph-api.atguigu.cn", // 目标后端服务
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        },
        "/api": {
        //获取数据的服务器地址设置
        target: "http://39.98.123.211:8510",
        //需要代理跨域
        changeOrigin: true,
        //路径重写
        rewrite: (path) => path.replace(/^\/api/, ''),
        }
      }
    }
  }
})
