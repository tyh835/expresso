import Expresso from '../utils/Expresso';
import { sortMenuItems } from '../utils/sort';
import { CLEAR_MENU_ITEMS, SET_MENU_ITEMS } from '../actionTypes';

export const clearMenuItems = () => ({
  type: CLEAR_MENU_ITEMS
});

export const fetchMenuItems = id => async dispatch => {
  const menuItems = await Expresso.getMenuItems(id);
  const sortedMenuItems = sortMenuItems(menuItems);

  if (menuItems.length) {
    dispatch({ type: SET_MENU_ITEMS, payload: sortedMenuItems });
  } else {
    dispatch({ type: SET_MENU_ITEMS, payload: [] });
  }
};
