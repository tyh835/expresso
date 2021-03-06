import {
  ADD_MENU,
  CANCEL_MENU_EDIT,
  CLEAR_MENU,
  DELETE_MENU,
  SET_MENU,
  SET_MENU_LIST,
  UPDATE_MENU_TITLE
} from '../actionTypes';

const initialState = {
  menuList: [],
  currentMenu: {
    title: ''
  },
  cachedMenu: {
    title: ''
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_MENU:
      return {
        ...state,
        menuList: [...state.menuList, action.payload]
      };
    case CANCEL_MENU_EDIT:
      return {
        ...state,
        currentMenu: {
          ...state.cachedMenu
        }
      };
    case CLEAR_MENU:
      return {
        ...state,
        currentMenu: {
          title: ''
        },
        cachedMenu: {
          title: ''
        }
      };
    case DELETE_MENU:
      return {
        ...state,
        menuList: state.menuList.filter(menu => menu.id !== action.payload)
      };
    case SET_MENU:
      return {
        ...state,
        currentMenu: action.payload,
        cachedMenu: {
          ...action.payload
        }
      };
    case SET_MENU_LIST:
      return {
        ...state,
        menuList: action.payload
      };
    case UPDATE_MENU_TITLE:
      return {
        ...state,
        currentMenu: {
          ...state.currentMenu,
          title: action.payload
        }
      };
    default:
      return state;
  }
};
