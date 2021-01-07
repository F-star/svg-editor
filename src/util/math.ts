
export function getBoxBy2points(x1: number, y1: number, x2: number, y2: number) {
  const w = Math.abs(x2 - x1)
  const h = Math.abs(y2 - y1)
  const x = Math.min(x2, x1)
  const y = Math.min(y2, y1)
  return { x, y, w, h }
}
