【重要】本项目不再开发，所有精力放在基于 Canvas 的图形编辑器：[Suika](https://github.com/F-star/suika)

> 有问题可以关注公众号「前端西瓜哥」并留言

# svg-editor

一款简单的 Web 端 SVG 编辑器（半成品）。

使用 React + TypeScript。

![image](https://user-images.githubusercontent.com/18698939/206910372-86a41560-8b52-46b3-ab6e-dab25319fb9e.png)

DEMO: https://blog.fstars.wang/app/svg-editor/

[view English Doc](./README.EN.md)
## 运行项目

```sh
yarn
yarn dev
```

## 构建 Electron 应用（不完善）

package.json 中没有 electron 相关的依赖，因为 electron 的包太大了而且大多数人不需要构建 electron 应用。所以如果你要构建 electron 应用，需要自己手动全局安装 electron

```sh
npm install -g electron
```

国内的话需要修改一下 npm config 解决下载问题：

```sh
npm config set registry https://registry.npm.taobao.org/
npm config set ELECTRON_MIRROR http://npm.taobao.org/mirrors/electron/
```

构建，然后预览或打包：

```sh
# electron 会使用 /dist/index 作为入口，所以你每次修改代码后都需要 build 一下
npm run build

# 预览 electron 的运行效果
npm run electron

# 或 根据所在操作系统正式打包
npm run electron:package
```
