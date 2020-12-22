import { FSVG } from "../element"

export function isVaildColorVal() {
  // TODO:
  // 1. all color brower supported
  // 2. #fff and #f0f0f0
  // 3. rgb(x,x,x)
  // ...
}

export function getElementsInBox(box, parent) {
  const tagNameForbidList = ['g']
  box = new FSVG.Box(box)
  const elsInBox = []

  function r(box, parent) {
    const elements = parent.children
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i] // FSVG.create(elements[i])

      if (!tagNameForbidList.includes(el.tagName)) {
        const bbox = el.getBBox()
        if (box.contains(bbox)) {
          elsInBox.push( FSVG.create(el))
        }
      }

      if (el.children.length > 0) r(box, el)
    }
  }
  r(box, parent)
  return elsInBox
}

export function uniq(arr) {
  return Array.from(new Set(arr))
}