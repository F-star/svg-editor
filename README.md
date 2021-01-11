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
- zoom center position
- layer operate
- export svg file
- record coordinate when move
- element info card
- element breadcrumb
- UI

---

Code construction:

```
editor
  setting
  toolManager
  commandManager
  activedElsManager
  shortcut
  viewport(scroll, zoom)
  ...
FSVG
```