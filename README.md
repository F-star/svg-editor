svg-editor
---

A simple web svg editor. Built by Typescript.

Developing...

Try the editor: https://blog.fstars.wang/app/svg-editor/

Run project:

```sh
npm install
npm run dev
```

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

---

Code construction:

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

---

event summary(bind listener):

- Zoom change
- Redo/undo stack is empty
- Fill/stroke/strokeWidth change
- Switch tool