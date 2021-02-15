
/**
 * EventEmiter
 *
 * Publish-Subscribe Design Pattern
 */

type EventName = string | symbol
type Listener = (...args: any[]) => void

class EventEmiter {
  private hashMap: { [eventName: string]: Array<Listener> } = {}

  on(eventName: EventName, listener: Listener): this {
    const name = eventName as any
    if (!this.hashMap[name]) {
      this.hashMap[name] = []
    }
    this.hashMap[name].push(listener)
    return this
  }
  emit(eventName: EventName, ...args: []): boolean {
    const handlers = this.hashMap[eventName as any]
    if (!handlers || handlers.length === 0) return false
    handlers.forEach(listener => {
      listener(...args)
    })
    return true
  }
  // off
}

export default EventEmiter
