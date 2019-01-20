import { FETCH_MENU_LIST } from '../actionTypes';

const initialState = {
  menuList: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MENU_LIST:
      return {
        ...state,
        menuList: action.payload
      };
    default:
      return state;
  }
};
