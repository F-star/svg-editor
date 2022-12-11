const editorDefaultConfig = {
  svgRootW: 3000,
  svgRootH: 1500,
  svgStageW: 800,
  svgStageH: 520,

  tool: 'select',

  fill: '#fff',
  stroke: '#000',
  strokeWidth: '1px',

  selectAreaFill: 'rgba(200, 200, 200, .2)',
  selectAreaStroke: '#888',

  outlineColor: '#5183fb',
  scaleGridSize: 7,
} as const

export default editorDefaultConfig
