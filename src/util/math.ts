import { IPoint } from '../interface'

export function getBoxBy2points(x1: number, y1: number, x2: number, y2: number) {
  const w = Math.abs(x2 - x1)
  const h = Math.abs(y2 - y1)
  const x = Math.min(x2, x1)
  const y = Math.min(y2, y1)
  return { x, y, w, h }
}

export function getSymmetryPoint(pt: IPoint, cx: number, cy: number): IPoint {
  return {
    x: cx * 2 - pt.x,
    y: cy * 2 - pt.y,
  }
}
