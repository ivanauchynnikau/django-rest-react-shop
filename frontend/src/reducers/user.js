import {
  SET_USER,
  CLEAR_USER
} from "../actions/user";


const initialState = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  isAuthenticated: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      const newState = Object.assign({}, {user: action.data});
      return newState;

    case CLEAR_USER:
      const emptyUser = Object.assign({}, {user: initialState});
      return emptyUser;

    default:
      return state;
  }
}
