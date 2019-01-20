import Expresso from '../utils/Expresso';
import { FETCH_MENUS } from '../actionTypes';

export const fetchMenus = () => async dispatch => {
  const menus = await Expresso.getMenus();

  if (menus.length) {
    const sortedMenus = Expresso.sortItemNames(menus, 'title');
    dispatch({ type: FETCH_MENUS, payload: sortedMenus });
  } else {
    dispatch({ type: FETCH_MENUS, payload: [] });
  }
};
