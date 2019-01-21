import {
  ADD_MENU_ITEM,
  CANCEL_MENU_ITEM_EDIT,
  CLEAR_MENU_ITEMS,
  DELETE_MENU_ITEM,
  SAVE_MENU_ITEMS,
  SET_MENU_ITEMS,
  UPDATE_MENU_ITEM
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
    case SAVE_MENU_ITEMS:
      return {
        ...state,
        currentMenuItems: action.payload.newMenuItems,
        cachedMenuItems: action.payload.newCachedMenuItems
      };
    case SET_MENU_ITEMS:
      return {
        ...state,
        currentMenuItems: action.payload,
        cachedMenuItems: [...action.payload]
      };
    case UPDATE_MENU_ITEM:
      const { type, value, menuItemIndex } = action.payload;
      return {
        ...state,
        currentMenuItems: state.currentMenuItems.map((menuItem, i) => {
          return i !== menuItemIndex
            ? menuItem
            : {
                ...menuItem,
                [type]: value
              };
        })
      };
    default:
      return state;
  }
};
