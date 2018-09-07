import login from './login';
import app from './app';
import github from './github';
import user from './user';

export default {
  ...login,
  ...app,
  ...github,
  ...user,
};
