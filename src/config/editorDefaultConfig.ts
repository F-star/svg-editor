
type configType = {
  readonly tool: string;
  readonly fill: string;
  readonly stroke: string;
  readonly strokeWidth: string;
  readonly selectAreaFill: string;
  readonly selectAreaStroke: string;
}

const config: configType = {
  tool: 'select',

  fill: '#fff',
  stroke: '#000',
  strokeWidth: '1px',

  selectAreaFill: 'rgba(200, 200, 200, .2)',
  selectAreaStroke: '#888',
}

export default config
