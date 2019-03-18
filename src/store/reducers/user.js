const initialState = {};

//ACTION TYPES
const SET_USER = 'SET_USER';

//ACTION CREATORS
export const setUser = name => ({
  type: SET_USER,
  name,
});

//REDUCER
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { name: action.name };
    default:
      return state;
  }
};

export default userReducer;
