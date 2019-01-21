import Expresso from '../utils/Expresso';
import { sortItemNames } from '../utils/sort';
import { fetchMenuItems } from './menuItems';
import {
  CANCEL_MENU_EDIT,
  CLEAR_MENU,
  DELETE_MENU,
  SAVE_MENU,
  SET_MENU,
  SET_MENU_LIST,
  UPDATE_MENU_TITLE
} from '../actionTypes';

export const cancelMenuEdit = () => ({
  type: CANCEL_MENU_EDIT
});

export const deleteMenu = (id, navigate) => async dispatch => {
  if (id) {
    const response = await Expresso.deleteMenu(id);
    if (response.ok) {
      dispatch({ type: DELETE_MENU, payload: id });
    }
  }
  dispatch({ type: CLEAR_MENU });
  navigate('/');
};

export const fetchMenu = id => async dispatch => {
  const menu = await Expresso.getMenu(id);

  if (menu) {
    dispatch({ type: SET_MENU, payload: menu });
  } else {
    dispatch({ type: CLEAR_MENU });
  }
};

export const fetchMenuList = () => async dispatch => {
  const menus = await Expresso.getMenuList();

  if (menus.length) {
    const sortedMenus = sortItemNames(menus, 'title');
    dispatch({ type: SET_MENU_LIST, payload: sortedMenus });
  } else {
    dispatch({ type: SET_MENU_LIST, payload: [] });
  }
};

export const clearMenu = () => ({
  type: CLEAR_MENU
});

export const saveMenu = (menu, navigate) => async dispatch => {
  if (menu.id) {
    const updatedMenu = await Expresso.updateMenu(menu);
    dispatch({ type: SET_MENU, payload: updatedMenu });
  } else {
    const newMenu = await Expresso.createMenu(menu);
    dispatch({ type: SET_MENU, payload: newMenu });
    dispatch({ type: SAVE_MENU, payload: newMenu });
    navigate(`/menus/${newMenu.id}`);
    fetchMenuItems(newMenu.id)(dispatch);
  }
};

export const updateMenuTitle = e => ({
  type: UPDATE_MENU_TITLE,
  payload: e.target.value
});
