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
  REMOVE_STUDENT: "student/REMOVE",
  REQUEST_LISTPLANOS: "list_planos/REQUEST",
  SUCCESS_LISTPLANOS: "list_planos/SUCCESS",
  FAILURE_LISTPLANOS: "list_planos/FAILURE",
  REMOVE_PLANO: "plano/REMOVE",
  REQUEST_LISTMATRICULAS: "list_matriculas/REQUEST",
  SUCCESS_LISTMATRICULAS: "list_matriculas/SUCCESS",
  FAILURE_LISTMATRICULAS: "list_matriculas/FAILURE",
  REMOVE_MATRICULA: "matricula/REMOVE",
  REQUEST_LISTPLANOSDEAUXILIO: "list_planosdeauxilio/REQUEST",
  SUCCESS_LISTPLANOSDEAUXILIO: "list_planosdeauxilio/SUCCESS",
  FAILURE_LISTPLANOSDEAUXILIO: "list_planosdeauxilio/FAILURE",
  REMOVE_PLANOSDEAUXILIO: "planosdeauxilio/REMOVE"
};

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
  profile: {},
  students: [],
  planos: [],
  matriculas: [],
  planosDeAuxilio: []
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
        draft.students = [];
        draft.planos = [];
        draft.matriculas = [];
        draft.planosDeAuxilio = [];
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

    case Types.SUCCESS_LISTPLANOS:
      return produce(state, draft => {
        draft.planos = action.planos;
      });
    case Types.REMOVE_PLANO:
      return produce(state, draft => {
        const productIndex = draft.planos.findIndex(p => p.id === action.id);

        if (productIndex >= 0) {
          draft.planos.splice(productIndex, 1);
        }
      });

    case Types.SUCCESS_LISTMATRICULAS:
      return produce(state, draft => {
        draft.matriculas = action.matriculas;
      });
    case Types.REMOVE_MATRICULA:
      return produce(state, draft => {
        const productIndex = draft.matriculas.findIndex(
          p => p.id === action.id
        );

        if (productIndex >= 0) {
          draft.matriculas.splice(productIndex, 1);
        }
      });

    case Types.SUCCESS_LISTPLANOSDEAUXILIO:
      return produce(state, draft => {
        draft.planosDeAuxilio = action.helpOrders;
      });
    case Types.REMOVE_PLANOSDEAUXILIO:
      return produce(state, draft => {
        const productIndex = draft.planosDeAuxilio.findIndex(
          p => p.id === action.id
        );

        if (productIndex >= 0) {
          draft.planosDeAuxilio.splice(productIndex, 1);
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
  }),

  listPlanosRequest: () => ({
    type: Types.REQUEST_LISTPLANOS
  }),

  listPlanosSuccess: planos => ({
    type: Types.SUCCESS_LISTPLANOS,
    planos
  }),

  listPlanosFailure: () => ({
    type: Types.FAILURE_LISTPLANOS
  }),

  listMatriculasRequest: () => ({
    type: Types.REQUEST_LISTMATRICULAS
  }),

  listMatriculasSuccess: matriculas => ({
    type: Types.SUCCESS_LISTMATRICULAS,
    matriculas
  }),

  listMatriculasFailure: () => ({
    type: Types.FAILURE_LISTMATRICULAS
  }),

  listPlanosDeAuxilioRequest: () => ({
    type: Types.REQUEST_LISTPLANOSDEAUXILIO
  }),

  listPlanosDeAuxilioSuccess: helpOrders => ({
    type: Types.SUCCESS_LISTPLANOSDEAUXILIO,
    helpOrders
  }),

  listPlanosDeAuxilioFailure: () => ({
    type: Types.FAILURE_LISTPLANOSDEAUXILIO
  })
};
