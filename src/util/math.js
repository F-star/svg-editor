
export function getBoxBy2points(x1, y1, x2, y2) {
  let x, y, w, h
  w = Math.abs(x2 - x1)
  h = Math.abs(y2 - y1)
  x = Math.min(x2, x1)
  y = Math.min(y2, y1)
  return { x, y, w, h }
}
