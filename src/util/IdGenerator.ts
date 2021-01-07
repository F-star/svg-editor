
export class IdGenerator {
  private i = 0

  constructor() {}
  getId() {
    return this.i++
  }
}
