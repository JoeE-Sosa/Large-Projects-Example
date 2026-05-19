import { EntityContract } from '../../../shared/domain/entities/entity.contract.ts'
import { ForeignIdVO } from '../../../shared/domain/value-objects/foreign-id.vo.ts'
import type { ExampleVO } from '../value-objects/example.vo.ts'

export interface PrimitiveExample {
  id?: number

  name: string
  age: number
  example: ExampleVO
  disabled: boolean

  links: ForeignIdVO

  createdAt?: Date
  updatedAt?: Date
}

export class Example extends EntityContract<PrimitiveExample> {
  static create(createExample: { name: string; age: number; example: ExampleVO; links: ForeignIdVO }) {
    const { name, age, example, links } = createExample
    return new Example({ name, age, disabled: false, example, links })
  }

  static build(buildExample: PrimitiveExample) {
    return new Example(buildExample)
  }

  update(updateExample: { name: string; age: number; links: ForeignIdVO }) {
    const { name, age, links } = updateExample
    return Example.build({ ...this.attributes, name, age, links, updatedAt: new Date() })
  }

  restore() {
    return Example.build({ ...this.attributes, disabled: false, updatedAt: new Date() })
  }

  disable() {
    return Example.build({ ...this.attributes, disabled: true, updatedAt: new Date() })
  }
}
