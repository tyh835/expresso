import Expresso from '../utils/Expresso';
import { FETCH_MENU_LIST } from '../actionTypes';

export const fetchMenuList = () => async dispatch => {
  const menus = await Expresso.getMenuList();

  if (menus.length) {
    const sortedMenus = Expresso.sortItemNames(menus, 'title');
    dispatch({ type: FETCH_MENU_LIST, payload: sortedMenus });
  } else {
    dispatch({ type: FETCH_MENU_LIST, payload: [] });
  }
};
