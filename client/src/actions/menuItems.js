import uuid from 'uuid/v4';
import Expresso from '../utils/Expresso';
import { sortMenuItems } from '../utils/sort';
import {
  ADD_MENU_ITEM,
  CANCEL_MENU_ITEM_EDIT,
  CLEAR_MENU_ITEMS,
  DELETE_MENU_ITEM,
  NULL_ACTION,
  SAVE_MENU_ITEMS,
  SET_MENU_ITEMS,
  UPDATE_MENU_ITEM
} from '../actionTypes';

export const addMenuItem = id => {
  if (id === 'new') return { type: NULL_ACTION };
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

export const cancelMenuItemEdit = (id, menuItemIndex) => {
  if (!id) {
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

export const deleteMenuItem = (id, menuId, menuItemIndex) => async dispatch => {
  if (!id) return dispatch({ type: DELETE_MENU_ITEM, payload: menuItemIndex });

  const response = await Expresso.deleteMenuItem(id, menuId);
  if (response.ok) dispatch({ type: DELETE_MENU_ITEM, payload: menuItemIndex });
};

export const fetchMenuItems = menuId => async dispatch => {
  const menuItems = await Expresso.getMenuItems(menuId);
  const sortedMenuItems = sortMenuItems(menuItems);
  dispatch({ type: SET_MENU_ITEMS, payload: sortedMenuItems });
};

export const saveMenuItem = (
  currentMenuItems,
  cachedMenuItems,
  menuItemIndex,
  menuId
) => async dispatch => {
  const savedMenuItem = currentMenuItems[menuItemIndex];
  let newMenuItem;

  if (savedMenuItem.id) {
    newMenuItem = await Expresso.updateMenuItem(savedMenuItem, menuId);
  } else {
    newMenuItem = await Expresso.createMenuItem(savedMenuItem, menuId);
  }

  let newMenuItems = currentMenuItems.map((menuItem, i) =>
    i === menuItemIndex ? newMenuItem : menuItem
  );
  let newCachedMenuItems = cachedMenuItems.map((menuItem, i) =>
    i === menuItemIndex ? newMenuItem : menuItem
  );
  newMenuItems = sortMenuItems(newMenuItems);
  newCachedMenuItems = sortMenuItems(newCachedMenuItems);

  dispatch({
    type: SAVE_MENU_ITEMS,
    payload: {
      newMenuItems,
      newCachedMenuItems
    }
  });
};

export const updateMenuItem = (e, menuItemIndex) => {
  const type = e.target.id;
  const value = e.target.value;
  return {
    type: UPDATE_MENU_ITEM,
    payload: {
      type,
      value,
      menuItemIndex
    }
  };
};
