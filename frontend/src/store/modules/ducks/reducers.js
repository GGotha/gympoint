import produce from "immer";

//TYPES DAS ACTIONS

export const Types = {
  REQUEST_AUTH: "auth/REQUEST",
  SUCCESS_AUTH: "auth/SUCCESS",
  FAILURE_AUTH: "auth/FAILURE",
  OUT_AUTH: "auth/OUT"
};

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
  profile: {}
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
        draft.token = action.payload.token;
        draft.signed = true;
        draft.profile = action.payload.user;
        draft.loading = false;
      });
    case Types.FAILURE_AUTH:
      return produce(state, draft => {
        draft.loading = false;
      });
    case Types.OUT_AUTH:
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
  signInRequest: (email, password) => ({
    type: Types.REQUEST_AUTH,
    payload: { email, password }
  }),

  signInSuccess: (token, user) => ({
    type: Types.SUCCESS_AUTH,
    payload: { token, user }
  }),

  signFailure: () => ({
    type: Types.FAILURE_AUTH
  }),

  signOut: () => ({
    type: Types.OUT_AUTH
  })
};
