# 文档

> 基于vue-cli搭建的一个企业后台级的架构

## 技术栈

> vue + vuex + vue-router + vue-i18n + axios + iview + eslint + webpack

## 实现功能

- [x] vue jsx
- [x] 借助react的dva思想做的模块化
- [x] 国际化
- [x] svg sprite
- [x] eslint + git的precommit
- [x] 响应式布局方案

## 安装依赖
```js
    npm i 
```
## 运行项目
### 平常启项目
```js
    npm start 
```
### 如果你想启用dll，需要：
1、在/config/paths
```js
    module.exports = {
        ...
        isDll:true,
        ...
    };
```
2、在package.json,dll里面加入想打入动态链接库的包
```bash
    ...
    "dll": [
        
    ]
    ...

```
3、npm run dll-dev / npm run dll-build

4、npm run dev / npm run build:*

## 脚本含义

```js

    // 拉依赖
    npm install
    // 启开发环境
    npm run dev
    // 打开发环境的包
    npm run build
    // eslint检测
    npm run lint
    // 打开发环境的dll包
    npm run dll-dev
    // 打生产环境的dll包
    npm run dll-build
    // 打开发环境的包
    npm run build:dev
    // 打提测环境的包
    npm run build:test
    // 打集成环境的包
    npm run build:uat
    // 打线上环境的包
    npm run build:pub
```

### 代码目录

```js

+-- build/                                  --- 打生产包的配置文件
|   --- build.js							--- 打生产包的脚本
|   --- check-versions.js					
|   --- dll.js							    --- 打dll包的配置文件
|   --- utils.js							--- vue-cli的配置文件，以后准备废弃
|   --- webpack.base.conf.js				--- webpack基础的配置文件
|   --- webpack.dev.conf.js					--- webpack开发环境的配置文件
|   --- webpack.dll.conf.js					--- webpack dll的配置文件
|   --- webpack.prod.conf.js				--- webpack生产环境的配置文件
+-- config/                                 
|   --- dev.env.js				            --- 设置开发环境的环境变量
|   --- env.js				                --- 设置其他的全局变量
|   --- index.js					        --- vue-cli的配置文件，以后准备废弃
|   --- paths.js				            --- 配置各种webpack的路径及少数的配置
|   --- prod.env.js				            --- 设置生产环境的环境变量
+-- dist/                                   --- 打包的文件和dll文件
+-- node_modules/                           --- npm下载文件目录
+-- src/                                    --- 核心代码目录
|   +-- client                              --- 业务模块代码
|   |   +-- demo/                           --- 一个业务模块
|   |   |   --- component				    --- 组件
|   |   |   --- container.	                --- 容器组件
|   |   |   --- i18n/				        --- i18n配置文件
|   |   |   +-- store/ 				        --- vuex store
|   |   |   |--- getter.js		            --- vuex数据进行映射
|   |   |   |--- model.js		            --- vuex的model，数据处理
|   |   |   --- index.js		            --- 导出模块的vuex,router,i18n
|   |    --- index.js                       --- 把业务模块的vuex，router，i18n集成
|   +-- component/                          --- 全局组件存放处
|   +-- lang/                               --- 国际化公共配置
|   +-- router/                             --- 路由集成
|   +-- store/                              --- vuex集成
|   +-- styles/                             --- 共有样式及方法
|   +-- utils/                              --- 工具函数
|   --- app.vue                             
|   --- main.js                             --- 主入口
+-- static/                                 --- 静态资源
+-- test/                                   
|-- .env.local                              --- 启动项目自定义环境配置文件
|-- .eslintrc                               --- 自定义eslint配置文件
|-- package.json  

```
- 模块导出的index.js
    ```js
        import model from './store/model'
        import getter from './store/getter'
        import i18n from './i18n'
        /*namespace必须写*/
        const namespace = 'demo'
        export const route = { ... }
        export const stores = { ... }
        export const lang = { ... }

    ```
- vue-router
    - 普通写法

        ```js
        export const route = {
            path: '/',
            name: 'HelloWorld',
            component: () => import('./container/HelloWorld')
        }
        ```
    - 多个子组件

        ```js
        export const route = {
            path: '/demo',
            name: 'demo',
            component: () => import('component/container'),
            redirect: '/demo/index',
            children: [
                {
                path: 'index',
                name: 'index',
                component: () => import('./container/axios')
                },
                {
                path: 'index1',
                name: 'index1',
                component: () => import('./container/axios1')
                }
            ]
        }
        ```
- vuex
    - getter
        - 方法一 (推荐)

        ```js
        const getters = (namespace) => ({
            source: state => state[namespace].source,
            loading: state => state[namespace].loading,
            count: state => state[namespace].count
        })
        export default getters

        ```
        - 方法二

        ```js
        const getters = {
            source: state => state.list.source,
            loading: state => state.list.loading,
            count: state => state.list.count
        }
        export default getters

        ```
        ```js

        /*model*/
        export default{
            namespace: 'list',
            state:{
                source:''
            }
        }
        /*container*/
        export default {
            data () {...},
            computed: {
                ...mapGetters({
                    source: 'list/source',
                })
            },
        }
        ```
    - model

        ```js
        export default{
        /*可以不写，以index的namespace为主，优先级高于index的namespace*/
        namespace: 'list',
        state: {...},
        mutations: {...},
        actions: {...}
        ```

    - actions
        基于模块进行拆分，会自动在所有action上加上命名空间（namespace）,在dispatch的时候需要加上namespace/
        ```js
        /*model*/
        export default{
        namespace: 'list',
        actions: {
            getList ({ commit }, data) {...}
        }
        /*container*/
        export default {
            data () {...},
            methods: {
                getList (opt = {}) {
                    this.$store.dispatch('list/getList', {...defaultOpt, ...opt})
                }
            },
            ...
        }
        ```
- i18n

    ```js
    /*i18n配置文件*/
    export default{
        zh: {
            search: '查询',
            English: '英文',
            Chinese: '中文'
        },
        en: {
            search: 'search',
            English: 'en',
            Chinese: 'zh'
        }
    }
    /*在vue中使用*/
    ...
      <span slot="close">{{$t('demo.Chinese')}}</span>
    ...

- jsx

    vue2.0以后的版本都可以使用vue jsx语法了,可以对照react的写法，但还是有点不一样
    
    - 方法一 （推荐）
    
    ```js
        /*其他的同react，绑定事件用on-加上事件名来绑定*/
       <Switch
          v-model={this.switchBol}
          size="large"
          style="margin-left:20px"
          on-on-change = { this.switchChange}
        >
    ```

    - 方法二 

    ```js
        /*这种方法最安全，但写法不优雅，配置项参考vue render函数的第二个参数*/
        <Button 
            
            {...{
                attrs:{
                    type:'primary' 
                },
                on: {
                    click: this.search
                    }
                }
            }
        ></Button>
    ```

    ```
```
