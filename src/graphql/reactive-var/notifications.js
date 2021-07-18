import { makeReactiveVar } from './make-reactive-var';

export const notificationsVar = makeReactiveVar(
  { isActive: true },
  '__notification_var__',
);
