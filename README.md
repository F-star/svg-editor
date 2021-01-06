svg-editor
---

A simple web svg editor.

Developing...

Try the editor: https://f-star.github.io/svg-editor/dist/

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

To do recently:

- pencil
- draw bezier curve
- export
- layer
- record coordinate when move
- zoom center position
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
```