import EventEmiter from '../../util/EventEmitter'

describe('EventEmitter class', () => {
  test('on and emit method base test', () => {
    const emitter = new EventEmiter()
    let isEmitted = false
    emitter.on('event', () => {
      isEmitted = true
    })
    emitter.emit('event')
    expect(isEmitted).toBe(true)
  })

  test('multi listeners call in order', () => {
    const emitter = new EventEmiter()
    const arr: number[] = []
    emitter
      .on('event', () => { arr.push(0) })
      .on('event', () => { arr.push(1) })
      .on('event', () => { arr.push(2) })
      .on('event', () => { arr.push(3) })
    emitter.emit('event')

    expect(arr).toEqual([0, 1, 2, 3])
  })
})
