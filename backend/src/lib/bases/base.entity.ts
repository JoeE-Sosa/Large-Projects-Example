import { randomUUIDv7 } from 'node:crypto'

export type BasePrimitive = {
  id?: string
  disabled?: boolean
  removed?: boolean
  creationDate?: Date
  lastUpdate?: Date
}

export abstract class BaseEntity<T extends BasePrimitive> {
  protected readonly attributes: T

  constructor(attributes: T) {
    this.attributes = attributes
    this.attributes.id = attributes.id !== undefined ? attributes.id : randomUUIDv7()
    this.attributes.disabled = attributes.disabled !== undefined ? attributes.disabled : false
    this.attributes.removed = attributes.removed !== undefined ? attributes.removed : false
    this.attributes.creationDate = attributes.creationDate !== undefined ? attributes.creationDate : new Date()
    this.attributes.lastUpdate = attributes.lastUpdate !== undefined ? attributes.lastUpdate : new Date()
  }

  toPrimitive(): T {
    return this.attributes
  }

  enable() {
    this.attributes.disabled = false
    this.attributes.lastUpdate = new Date()
  }

  disable() {
    this.attributes.disabled = true
    this.attributes.lastUpdate = new Date()
  }

  remove() {
    this.attributes.removed = true
    this.attributes.lastUpdate = new Date()
  }

  getId() {
    return this.attributes.id
  }
}
