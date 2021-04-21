import { Path } from '../path'

/* 貌似是因为 jest 配置问题，进行单元测试时，会出现类型错误 */
describe('Element', () => {
  const path = new Path()
  path.setMetaData('meta-a', 'meta-a-value')
  it('get metaData', () => {
    expect(path.getMetaData('meta-a')).toBe('meta-a-value')
  })
})
