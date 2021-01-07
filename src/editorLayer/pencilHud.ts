


class PencilHud {
  container: SVGGElement

  constructor() {
    this.container = document.createElementNS(NS.SVG, 'g') as SVGGElement
  }
}