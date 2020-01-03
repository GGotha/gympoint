import produce from 'immer';

//TYPES DAS ACTIONS

export const Types = {
  REQUEST_AUTH: 'auth/REQUEST',
  SUCCESS_AUTH: 'auth/SUCCESS',
  FAILURE_AUTH: 'auth/FAILURE',
  LEAVE_AUTH: 'auth/LEAVE',
};

const INITIAL_STATE = {
  signed: false,
  loading: false,
  profile: {},
};

//REDUCERS

export default function reducers(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.REQUEST_AUTH:
      return produce(state, draft => {
        draft.loading = true;
      });
    case Types.SUCCESS_AUTH:
      return produce(state, draft => {
        draft.signed = true;
        draft.profile = action.payload.student;
        draft.loading = false;
      });
    case Types.FAILURE_AUTH:
      return produce(state, draft => {
        draft.loading = false;
      });
    case Types.LEAVE_AUTH:
      return produce(state, draft => {
        draft.token = null;
        draft.signed = false;
        draft.profile = null;
      });

    default:
      return state;
  }
}

//ACTIONS

export const Creators = {
  signInRequest: id => ({
    type: Types.REQUEST_AUTH,
    payload: { id },
  }),

  signInSuccess: student => ({
    type: Types.SUCCESS_AUTH,
    payload: { student },
  }),

  signFailure: () => ({
    type: Types.FAILURE_AUTH,
  }),

  signLeave: () => ({
    type: Types.LEAVE_AUTH,
  }),
};
