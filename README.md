svg-editor
---

A simple web svg editor. Built by typescript.

Developing...

Try the editor: https://blog.fstars.wang/app/svg-editor/

Backup url(not latest): https://f-star.github.io/svg-editor/dist/

Run project:

```sh
npm i
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

To do recently:

- UI(using React)
- Contectmenu
- Draw bezier curve
- Layer operation
- Export svg file
- Record coordinate when move
- Element info card
- Element breadcrumb

To fix bugs:

- (Should) Only enable left mouse click when using tool
- Get right fill/stroke when setting actived elements
- Move elements when zoom is not 100%
- Different effect of `event.offsetX` between Chrome and Firefox
- mousedown outside and mouseup inside with error

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