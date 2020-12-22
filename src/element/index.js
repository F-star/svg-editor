import { Box } from "./box"
import { Rect } from "./rect"


/**
 * FSVG
 * 
 * simple SVGElement encapsulation
 */
function create(el) {
  const tagName = el.tagName
  if (tagName === 'rect') {
    return new FSVG.Rect(el)
  }
  else {
    throw new Error(`Can not creat ${tagName} instance, no match class.`)
  }
}

export const FSVG = {
  create,
  Rect,
  Box,
}