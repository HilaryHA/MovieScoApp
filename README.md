# MovieScoApp
> This is a small program for movie scoring.    
  这是一个电影评分的小程序

****
	
|Author|窩窩头:panda_face:|
|---|---
|E-mail|hilaryha@qq.com

****
## 目录
* [项目环境](#项目环境)
* [版本说明](#版本说明)
* [文件及运行说明](#文件及运行说明)
* [备注说明](#备注说明)
* [项目展示图](#项目展示图)

*****
### 项目环境
-----
1. 由 `小程序 + 云开发` 等组成，详细步骤参考[这里](https://blog.csdn.net/weixin_42512937/article/details/102818614 "微信小程序Demo之电影评分功能")  
  【前端】   通过开发模式 `小程序` 结合 `Vant Weapp` UI组件库进行展示  
  【数据库】 通过小程序云开发提供的 `数据库` 存储数据、`存储管理` 存储图片文件等  
  【后端】   通过云函数编辑业务逻辑代码  

2. 项目说明  
  此项目电影评分小程序，具有的主要功能如下：  
  - [ ] 获取当前电影列表（通过调用第三方接口，需要安装 `request`中间件等）    
  - [ ] 评价电影（评价的内容、上传的图片，存储于云开发的 数据库 和 存储管理中）    
  - [ ] 获取当前用户信息    

*****
### 版本说明
-----
1. `request` == 2.88.0
2. `request-promise` == 4.2.4
3. `vant-weapp` == 0.5.19
4. `wx-server-sdk` == latest


*****
### 文件及运行说明
------
1. **主要文件说明**   
    1. `MovieScoApp\cloudfunctions\` 目录  
        * 存储了三个云函数

    2. `MovieScoApp\miniprogram\app.json` 文件   
        * 全局 json 文件，底部 bar 在此声明

    3. `MovieScoApp\miniprogram\style\guide.wxss` 文件
        * 全局 wxss 文件，即样式文件

    4. `MovieScoApp\miniprogram\pages` 目录 
        * 存放的三个页面所需的文件
            * `js` 文件处理逻辑业务代码，定义变量、生命周期函数、自定义函数等， 对应 js文件
            * `json` 按需引入对应的 `Vant Weapp` UI组件模块、定义该页面标题、样式等
            * `wxml` 处理 DOM 元素的布局， 对应 html文件
            * `wxss` 处理元素的样式， 对应 css 文件    
    
    5. `MovieScoApp\.gitignore` 文件
        * 使用 `git` 命令提交时，定义需要忽略的文件、目录等


2. **运行说明**
    1. 微信开发者工具打开即可运行
        *  需要`npm install`的目录有：
            *  `MovieScoApp\cloudfunctions\getDetail`;
            *   `MovieScoApp\cloudfunctions\movielist`;
            *   `MovieScoApp\cloudfunctions\login`;
            *   `MovieScoApp\miniprogram\`


    2. 一般选择开发者工具顶部菜单对应： 小程序模式、普通编译
        * 点击普通编译，可自定义当前编译的页面，即每次修改代码，刷新页面时，保持当前页面


*****
### 备注说明
-----
1. **云开发的快速启动指引，其中如何上手使用云开发的三大基础能力如下**  
    1. 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
    
    2. 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理

    3. 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

2. **参考文档**  
    1. [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

    2. [微信官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)

    3. [微信社区交流](https://developers.weixin.qq.com/community/develop/mixflow) （有问题时可以在此网站搜索一哈）

    4. [VantWeapp组件库官网](https://youzan.github.io/vant-weapp/#/intro)


*****
### 项目展示图
-----

|展示图|
|---
|![image](https://github.com/HilaryHA/my-vue/blob/master/static/show_1.gif)
|![image](https://github.com/HilaryHA/my-vue/blob/master/static/show_2.gif)
|![image](https://github.com/HilaryHA/my-vue/blob/master/static/show_3.gif)
|![image](https://github.com/HilaryHA/my-vue/blob/master/static/show_4.gif)




******

