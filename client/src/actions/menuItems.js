import uuid from 'uuid/v4';
import Expresso from '../utils/Expresso';
import { sortMenuItems } from '../utils/sort';
import {
  ADD_MENU_ITEM,
  CANCEL_MENU_ITEM_EDIT,
  CLEAR_MENU_ITEMS,
  DELETE_MENU_ITEM,
  SAVE_MENU_ITEM,
  SET_MENU_ITEMS,
  UPDATE_MENU_ITEM
} from '../actionTypes';

export const addMenuItem = id => {
  if (id === 'new') return;
  const newMenuItem = {
    name: '',
    description: '',
    inventory: 0,
    price: 0,
    tempId: uuid()
  };

  return {
    type: ADD_MENU_ITEM,
    payload: newMenuItem
  };
};

export const cancelMenuItemEdit = (currentMenuItems, menuItemIndex) => {
  const menuItem = currentMenuItems[menuItemIndex];
  if (!menuItem.id) {
    return {
      type: DELETE_MENU_ITEM,
      payload: menuItemIndex
    };
  } else {
    return {
      type: CANCEL_MENU_ITEM_EDIT,
      payload: menuItemIndex
    };
  }
};

export const clearMenuItems = () => ({
  type: CLEAR_MENU_ITEMS
});

export const deleteMenuItem = (
  currentMenuItems,
  menuId,
  menuItemIndex
) => async dispatch => {
  const { id } = currentMenuItems[menuItemIndex];

  if (!id) return dispatch({ type: DELETE_MENU_ITEM, payload: menuItemIndex });

  const response = await Expresso.deleteMenuItem(id, menuId);
  if (response.ok) dispatch({ type: DELETE_MENU_ITEM, payload: menuItemIndex });
};

export const fetchMenuItems = id => async dispatch => {
  const menuItems = await Expresso.getMenuItems(id);
  const sortedMenuItems = sortMenuItems(menuItems);
  dispatch({ type: SET_MENU_ITEMS, payload: sortedMenuItems });
};

export const saveMenuItem = () => {};

export const updateMenuItem = () => {};
