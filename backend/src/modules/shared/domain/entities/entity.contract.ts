export abstract class EntityContract<T> {
  protected readonly attributes: T

  constructor(attributes: T) {
    this.attributes = attributes
  }

  toPrimitive(): T {
    return this.attributes
  }
}
