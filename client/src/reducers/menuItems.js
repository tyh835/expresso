import { CLEAR_MENU_ITEMS, SET_MENU_ITEMS } from '../actionTypes';

const initialState = {
  currentMenuItems: [],
  cachedMenuItems: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_MENU_ITEMS:
      return {
        ...state,
        currentMenuItems: [],
        cachedMenuItems: []
      };
    case SET_MENU_ITEMS:
      return {
        ...state,
        currentMenuItems: action.payload,
        cachedMenuItems: [...action.payload]
      };
    default:
      return state;
  }
};
