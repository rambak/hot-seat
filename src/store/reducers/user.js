const initialState = { name: '', isLoggedIn: false, currentGame: '' };

//ACTION TYPES
const SET_USER = 'SET_USER';
const LOG_OUT_USER = 'LOG_OUT_USER';

//ACTION CREATORS
export const setUser = (name, gamePin) => ({
  type: SET_USER,
  name,
  gamePin,
});

export const logOutUser = () => ({
  type: LOG_OUT_USER,
});

//REDUCER
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        name: action.name,
        isLoggedIn: true,
        currentGame: action.gamePin,
      };
    case LOG_OUT_USER:
      return { ...state, isLoggedIn: false, currentGame: '' };
    default:
      return state;
  }
};

export default userReducer;
