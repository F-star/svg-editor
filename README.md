# svg-editor

A simple web svg editor. Built by Typescript. Developing...

Try the editor: https://blog.fstars.wang/app/svg-editor/

## Run project

```sh
npm install
npm run dev
```

## Build Electron App

There is not electron dependency in `package.json`, because electron Installation is too big and someone maybe want not to build electron app. So you have to install in manually :

```sh
npm install -D electron
// or install globally
npm install -g electron
```

If you are in China, maybe you should set npm config before install electron:

```
npm config set registry https://registry.npm.taobao.org/
npm config set ELECTRON_MIRROR http://npm.taobao.org/mirrors/electron/
```

build, then view or package:

```sh
# electron will use /dist/index as entry, so you have to build while you changed code.
npm run build

# view the result of electron
npm run electron
# or package electron app according to your OS
npm run electron:package
```
## Feature and Todo

The simple features has added(of course with some bugs):

- Redo/undo
- Add rect
- Drag canvas
- Zoom
- Select(only can move rect)
- Actived elements
- Select fill and stroke color
- Shortcut
- Delete elements
- Select multiple elements
- Arranging elements(front, frontward, backwar, back)
- Different tool cursors
- Pencil tool
- UI layer(powered by React)
- Tool icons (powered by iconfont)
- Export svg file

To do recently:

- Draw bezier curve
- Contentmenu
- Layer operation
- Record coordinate when move
- Element info card
- Element breadcrumb

To fix bugs:

- (Should) Only enable left mouse click when using tool
- Get right fill/stroke when setting actived elements
- Different effect of `event.offsetX` between Chrome and Firefox

## Code Construction

```
Editor
  Setting
  ToolManager(add rect, select...)
  CommandManager
  ActivedElsManager
  Shortcut
  Viewport(scroll, zoom)
  ...
FSVG
```

event summary(bind listener):

- Zoom change
- Redo/undo stack is empty
- Fill/stroke/strokeWidth change
- Switch tool

