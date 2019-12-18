import produce from "immer";

//TYPES DAS ACTIONS

export const Types = {
  REQUEST_AUTH: "auth/REQUEST",
  SUCCESS_AUTH: "auth/SUCCESS",
  FAILURE_AUTH: "auth/FAILURE",
  LEAVE_AUTH: "auth/LEAVE",
  REQUEST_LISTSTUDENTS: "list_students/REQUEST",
  SUCCESS_LISTSTUDENTS: "list_students/SUCCESS",
  FAILURE_LISTSTUDENTS: "list_students/FAILURE",
  REMOVE_STUDENT: "student/REMOVE"
};

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
  profile: {},
  students: []
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
    case Types.LEAVE_AUTH:
      return produce(state, draft => {
        draft.token = null;
        draft.signed = false;
        draft.profile = null;
      });
    case Types.SUCCESS_LISTSTUDENTS:
      return produce(state, draft => {
        draft.students = action.students;
      });
    case Types.REMOVE_STUDENT:
      return produce(state, draft => {
        const productIndex = draft.students.findIndex(p => p.id === action.id);

        if (productIndex >= 0) {
          draft.students.splice(productIndex, 1);
        }
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

  signLeave: () => ({
    type: Types.LEAVE_AUTH
  }),

  listStudentsRequest: () => ({
    type: Types.REQUEST_LISTSTUDENTS
  }),

  listStudentsSuccess: students => ({
    type: Types.SUCCESS_LISTSTUDENTS,
    students
  }),

  listStudentsFailure: () => ({
    type: Types.FAILURE_LISTSTUDENTS
  })
};
