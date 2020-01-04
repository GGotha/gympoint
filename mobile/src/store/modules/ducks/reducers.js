import produce from 'immer';

//TYPES DAS ACTIONS

export const Types = {
  REQUEST_AUTH: 'auth/REQUEST',
  SUCCESS_AUTH: 'auth/SUCCESS',
  FAILURE_AUTH: 'auth/FAILURE',
  LEAVE_AUTH: 'auth/LEAVE',
  REQUEST_CHECKIN: 'checkin/REQUEST',
  SUCCESS_CHECKIN: 'checkin/SUCCESS',
  FAILURE_CHECKIN: 'checkin/FAILURE',
  REQUEST_HELPORDER: 'help_order/REQUEST',
  SUCCESS_HELPORDER: 'help_order/SUCCESS',
  FAILURE_HELPORDER: 'help_order/FAILURE',
};

const INITIAL_STATE = {
  signed: false,
  loading: false,
  profile: {},
  checkins: [],
  helpOrders: [],
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
        draft.signed = false;
        draft.profile = null;
        draft.checkins = [];
        draft.helpOrders = [];
      });

    case Types.SUCCESS_CHECKIN:
      return produce(state, draft => {
        draft.checkins = action.checkins;
      });

    case Types.SUCCESS_HELPORDER:
      return produce(state, draft => {
        draft.helpOrders = action.helpOrders;
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

  listCheckinsRequest: id => ({
    type: Types.REQUEST_CHECKIN,
    payload: { id },
  }),

  listCheckinsSuccess: checkins => ({
    type: Types.SUCCESS_CHECKIN,
    checkins,
  }),

  listCheckinsFailure: () => ({
    type: Types.FAILURE_CHECKIN,
  }),

  listHelpOrdersRequest: id => ({
    type: Types.REQUEST_HELPORDER,
    payload: { id },
  }),

  listHelpOrdersSuccess: helpOrders => ({
    type: Types.SUCCESS_HELPORDER,
    helpOrders,
  }),

  listHelpOrdersFailure: () => ({
    type: Types.FAILURE_HELPORDER,
  }),
};
