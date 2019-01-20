import { FETCH_MENUS } from '../actionTypes';

const initialState = {
  menuList: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MENUS:
      return {
        ...state,
        menuList: action.payload
      };
    default:
      return state;
  }
};
