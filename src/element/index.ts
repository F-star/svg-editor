import { Box } from './box'
import { Rect } from './rect'
import { Group } from './group'
import { FElement } from './baseElement'

/**
 * FSVG
 *
 * simple SVGElement encapsulation
 */
function create(el: SVGElement): FElement {
  const tagName = el.tagName
  if (tagName === 'rect') {
    return new FSVG.Rect(el as SVGRectElement)
  } else if (tagName === 'g') {
    return new FSVG.Group(el)
  } else {
    throw new Error(`Can not creat ${tagName} instance, no match class.`)
  }
}


export const FSVG = {
  create,
  Rect,
  Box,
  Group,
}
