import Expresso from '../utils/Expresso';
import { sortItemNames } from '../utils/sort';
import { FETCH_MENU_LIST } from '../actionTypes';

export const fetchMenuList = () => async dispatch => {
  const menus = await Expresso.getMenuList();

  if (menus.length) {
    const sortedMenus = sortItemNames(menus, 'title');
    dispatch({ type: FETCH_MENU_LIST, payload: sortedMenus });
  } else {
    dispatch({ type: FETCH_MENU_LIST, payload: [] });
  }
};
