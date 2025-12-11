import { types } from '../types';

const initial_state = {
  attendanceTime: null,
};

const actionMap = {
  [types.makeAtt]: (state, act) => {
    const currentDate = new Date();
    return {
      attendanceTime: currentDate,
    };
  },
  [types.removeAtt]: () => initial_state,
};

export default function (state = initial_state, action) {
  const handler = actionMap[action.type];
  return handler ? handler(state, action) : state;
}
