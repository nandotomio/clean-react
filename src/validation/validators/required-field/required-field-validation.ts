import { FieldValidation } from '@/validation/protocols'
import { RequiredFieldError } from '@/validation/errors'

export class RequiredFieldValidation implements FieldValidation {
  constructor (readonly fieldName: string) {}

  validate (value: string): Error {
    return value ? null : new RequiredFieldError()
  }
}
