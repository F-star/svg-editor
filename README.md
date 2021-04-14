# svg-editor

一款正在开发的简单的 Web 端 SVG 编辑器，基于 TypeScript 技术。

DEMO: https://blog.fstars.wang/app/svg-editor/

[view English Doc](./README.EN.md)
## 运行项目

```sh
npm install
npm run dev
```

## 项目相关的博客

- [图形编辑器开发（1）——模块设计与认识](https://blog.fstars.wang/2021/03/14/%E5%9B%BE%E5%BD%A2%E7%BC%96%E8%BE%91%E5%99%A8%E5%BC%80%E5%8F%91%EF%BC%881%EF%BC%89%E2%80%94%E2%80%94%E6%A8%A1%E5%9D%97%E8%AE%BE%E8%AE%A1%E4%B8%8E%E8%AE%A4%E8%AF%86/)


## 构建 Electron 应用（不完善）

package.json 中没有 electron 相关的依赖，因为 electron 的包太大了而且大多数人不需要构建 electron 应用。所以如果你要构建 electron 应用，需要自己手动开一个分支再安装一个依赖。

```sh
npm install -D electron
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
