import { STATUS } from 'constants/index';
import { ActionTypes } from 'redux/actions/index';

describe('constants', () => {
  it('should match the snapshot', () => {
    expect(ActionTypes).toMatchSnapshot();
    expect(STATUS).toMatchSnapshot();
  });
});
