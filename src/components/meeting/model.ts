/**
 * @overview
 * The meeting model. It acts as a kind of serializer for the meeting object.
 */

export interface MeetingInterface {
  id: string,
}

/**
 * The Meeting class.
 * @class
 */
export class Meeting {
  readonly id: string;

  constructor ({ id }: MeetingInterface) {
    this.id = id;
  }
}
