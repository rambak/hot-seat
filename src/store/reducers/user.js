import { db } from '../../config/fbConfig';

const initialState = { isBoard: true };

//ACTION TYPES
const SET_USER = 'SET_USER';
const SET_BOARD = 'SET_BOARD';

//ACTION CREATORS
const setUser = user => ({
  type: SET_USER,
  user,
});

export const setBoard = () => ({
  type: SET_BOARD,
});

//THUNK CREATOR
export const getUser = (name, gamePin) => async dispatch => {
  try {
    db.collection('games')
      .doc(gamePin)
      .collection('players')
      .where('name', '==', name)
      .onSnapshot(function(querySnapshot) {
        dispatch(setUser(querySnapshot[0]));
      });
  } catch (err) {
    console.error(err);
  }
};

//REDUCER
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...action.user, isBoard: false };
    case SET_BOARD:
      return { isBoard: true };
    default:
      return state;
  }
};

export default userReducer;
