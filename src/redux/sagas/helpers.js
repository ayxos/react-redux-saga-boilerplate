import { all, put, takeLatest } from 'redux-saga/effects';
import { getConstants } from 'redux/actions';

export function* resourcesSwitcher(action) {
  const { section } = action.payload;
  if (!section) return;
  // Action includes location, so, based on the section, we can dynamically load resources.
  switch (section) {
    case '/dashboard':
      yield all([put(getConstants())]);
      break;
    default:
  }
}

/**
 * Date Sagas
 */
export default function* root() {
  yield all([takeLatest('FETCH', resourcesSwitcher)]);
}
