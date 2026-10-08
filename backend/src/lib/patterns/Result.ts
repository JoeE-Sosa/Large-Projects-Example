export class Result<T> {
  private readonly _isSuccess: boolean
  private readonly _value: T | null
  private readonly _error: string | null

  constructor(isSuccess: boolean, value: T | null, error: string | null) {
    this._isSuccess = isSuccess
    this._value = value
    this._error = error
  }

  static ok<T>(value: T): Result<T> {
    return new Result<T>(true, value, null)
  }

  static fail<T>(error: string): Result<T> {
    return new Result<T>(false, null, error)
  }

  IsSuccess(): boolean {
    return this._isSuccess
  }

  GetValue(): T | null {
    if (this._isSuccess === false) throw new Error('It is not possible to get the value of a failed result.')
    return this._value
  }

  GetError(): string {
    if (this._error === null) return 'Error not defined.'
    return this._error
  }
}
