import { expectSaga } from 'redux-saga-test-plan';
import app from 'redux/sagas/app';

describe('app', () => {
  it('should have the expected watchers', done =>
    expectSaga(app)
      .run({ silenceTimeout: true })
      .then(saga => {
        expect(saga).toMatchSnapshot();
        done();
      }));
});
