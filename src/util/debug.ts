
// 根据提供的 x， y 画点

export function drawPoint(editor, x: number, y: number) {
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
  circle.setAttribute('r', '6')
  circle.setAttribute('cx', x + '')
  circle.setAttribute('cy', y + '')
  editor.getCurrentLayer().appendChild(circle)
}
