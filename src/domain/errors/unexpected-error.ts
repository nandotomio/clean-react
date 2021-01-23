export class UnexpectedError extends Error {
  constructor () {
    super('Oops. Something went wrong. Please try again later.')
    this.name = 'UnexpectedError'
  }
}
