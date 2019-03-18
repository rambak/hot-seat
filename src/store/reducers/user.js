const initialState = { isBoard: true };

//ACTION TYPES
const SET_USER = 'SET_USER';
const SET_BOARD = 'SET_BOARD';

//ACTION CREATORS
export const setUser = name => ({
  type: SET_USER,
  name,
});

export const setBoard = () => ({
  type: SET_BOARD,
});

//REDUCER
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...action.name, isBoard: false };
    case SET_BOARD:
      return { isBoard: true };
    default:
      return state;
  }
};

export default userReducer;
