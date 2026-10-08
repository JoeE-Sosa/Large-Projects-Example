export abstract class VOContact<T> {
  private readonly value: T

  constructor(value: T) {
    this.value = value
  }

  GetValue() {
    return this.value
  }
}
