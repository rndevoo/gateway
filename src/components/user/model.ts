/**
 * @overview
 * The user model. It acts as a kind of serializer for the user object.
 */

export interface UserInterface {
  id: string,
  firstName: string,
  lastName: string,
}

/**
 * The User class.
 * @class
 */
export class User {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;

  constructor ({ id, firstName, lastName = '' }: UserInterface) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
