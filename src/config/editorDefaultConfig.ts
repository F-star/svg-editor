const config = {
  tool: 'select',

  fill: '#fff',
  stroke: '#000',
  strokeWidth: '1px',

  selectAreaFill: 'rgba(200, 200, 200, .2)',
  selectAreaStroke: '#888',
}

type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
}

export default config as DeepReadonly<typeof config>
