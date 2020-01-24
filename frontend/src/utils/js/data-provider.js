import React  from 'react';


export default class DataProvider {
  constructor(dispatch, options = {}) {
    const {
      action,
      suffix
    } = options;

    this._dispatch = dispatch;
    this._actionSuffix = suffix ? '_' + suffix.toUpperCase() : '';
    this._action = action !== undefined ? !! action : true;
  }

  dispatch(action, data) {
    const _action = Object.assign({type: action + this._actionSuffix,}, data);
    this._action && this._dispatch(_action);
  }
}
