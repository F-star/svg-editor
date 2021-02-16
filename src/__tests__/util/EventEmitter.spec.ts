import EventEmiter from '../../util/EventEmitter'

describe('EventEmitter class', () => {
  test('on and emit method', () => {
    const emitter = new EventEmiter()
    let num = -1
    emitter.on('event', (n: number) => {
      num = n
    })
    emitter.emit('event', 999)
    expect(num).toBe(999)
  })

  test('multi listeners call in added order', () => {
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

  test('off method', () => {
    const emitter = new EventEmiter()
    const arr: number[] = []
    const addZero = function() { arr.push(0) }
    emitter
      .on('event', addZero)
      .on('event', () => { arr.push(1) })
      .off('event', addZero)
    emitter.emit('event')

    expect(arr).toEqual([1])
  })
})
