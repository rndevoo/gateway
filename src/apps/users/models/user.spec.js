/**
 * @overview The User model unit tests.
 */
'use strict';

import chai from 'chai';
import mongoose from 'mongoose';

import { UserSchema } from './user.js';

const expect = chai.expect;

const User = mongoose.model('User', UserSchema);
mongoose.Promise = Promise;

const testUserData = {
  username: 'test',
  firstName: 'test',
  lastName: 'test',
  email: 'test@test.com',
  password: 'Test%1234567890',
};

const TEST_DB_URL = 'mongodb://localhost/test';

describe('User model', function () {
  before(async function () {
    await mongoose.connect(TEST_DB_URL);
  });

  beforeEach(async function () {
    await mongoose.connection.db.dropDatabase();
    await User.create(testUserData);
  });

  after(async function () {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  describe('password hash pre save hook', function () {
    it('should save a different password', async function () {
      const user = await User.findOne({
        username: testUserData.username,
      }).select({password: 1});

      expect(user.password).to.not.be.undefined;
      expect(user.password).to.not.equal(testUserData.password);
    });
  });

  describe('#comparePassword(pass) instance method', function () {
    it('should return true if password matches', async function () {
      const user = await User.findOne({
        username: testUserData.username,
      }).select({password: 1});

      const matches = await user.comparePassword(testUserData.password);
      expect(matches).to.be.true;
    });

    it('should return false if password doesn\'t match', async function () {
      const user = await User.findOne({
        username: testUserData.username,
      }).select({password: 1});

      const badPassword = 'asdf';
      const matches = await user.comparePassword(badPassword);
      expect(matches).to.be.false;
    });
  });
});
