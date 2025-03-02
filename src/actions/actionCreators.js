import * as TYPE from './types';

export const updateInput = (inputValue) => ({
  type: TYPE.UPDATE_INPUT,
  payload: inputValue,
});

export const switchTab = (tab) => ({
  type: TYPE.SWITCH_TAB,
  payload: tab,
});