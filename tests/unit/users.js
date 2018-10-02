const assert = require('chai').assert;
const User = require('../../lib/models/Users');

describe('User model', () => {

  it('validates with required fields', () => {
    const user = new User({
      _id: '123',
      displayName: 'Christy La Guardia',
      email: 'christy@laguardia.io',
      experience: 'beginner',
    });

    return user.validate();
  });

  it('validation fails without required fields', () => {
    const user = new User();

    return user.validate()
      .then(
        () => { throw new Error('Expected validation error'); },
        ({ errors }) => {
          assert.ok(errors._id);
          assert.ok(errors.displayName);
          assert.ok(errors.email);
        }
      );
  });

});