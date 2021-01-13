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

- redo/undo
- add rect
- drag canvas
- zoom
- select(only can move rect)
- actived elements
- select fill and stroke color
- shortcut
- delete elements
- select multiple elements
- arranging elements(front, frontward, backwar, back)
- different tool cursors
- pencil tool

To do recently:

- draw bezier curve
- UI(using React)
- layer operation
- export svg file
- record coordinate when move
- element info card
- element breadcrumb

To fix bugs:

- (should) Only enable left mouse click when using tool
- Get right fill/stroke when setting actived elements
- Move elements when zoom is not 100%
- Different effect of `event.offsetX` between Chrome and Firefox

---

Code construction:

```
editor
  setting
  toolManager(add rect, select...)
  commandManager
  activedElsManager
  shortcut
  viewport(scroll, zoom)
  ...
FSVG
```