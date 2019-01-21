import {
  ADD_MENU_ITEM,
  CANCEL_MENU_ITEM_EDIT,
  CLEAR_MENU_ITEMS,
  DELETE_MENU_ITEM,
  SET_MENU_ITEMS
} from '../actionTypes';

const initialState = {
  currentMenuItems: [],
  cachedMenuItems: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_MENU_ITEM:
      return {
        ...state,
        currentMenuItems: [...state.currentMenuItems, action.payload],
        cachedMenuItems: [...state.cachedMenuItems, action.payload]
      };
    case CANCEL_MENU_ITEM_EDIT:
      return {
        ...state,
        currentMenuItems: state.currentMenuItems.map((menuItem, i) => {
          return i === action.payload ? state.cachedMenuItems[i] : menuItem;
        })
      };
    case CLEAR_MENU_ITEMS:
      return {
        ...state,
        currentMenuItems: [],
        cachedMenuItems: []
      };
    case DELETE_MENU_ITEM:
      return {
        ...state,
        currentMenuItems: state.currentMenuItems.filter(
          (_, i) => i !== action.payload
        ),
        cachedMenuItems: state.cachedMenuItems.filter(
          (_, i) => i !== action.payload
        )
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
