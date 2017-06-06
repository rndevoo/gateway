/**
 * @overview
 * Query field resolvers.
 */

import { Channel } from 'amqplib';

import { User } from '../user';

/**
 * @return
 */
export async function userResolver (
  obj: any,
  { id }: { id: string },
  { ch }: { ch: Channel },
): Promise<User> {
  ch.
  return new User();
}
