import reducer from 'redux/reducers/app';
import { ActionTypes, hideAlert, showAlert } from 'redux/actions/index';

describe('App', () => {
  let app = reducer.app(undefined, {});

  it('should return the initial state', () => {
    expect(reducer.app(app, {})).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.SHOW_ALERT}`, () => {
    app = reducer.app(app, showAlert('HELLO', { id: 'test', type: 'success' }));
    expect(app).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.HIDE_ALERT}`, () => {
    app = reducer.app(app, hideAlert('test'));
    expect(app).toMatchSnapshot();
  });
});
