import {
  START_LOADING,
  END_LOADING,
} from "../actions/loading";

import React from "react";

const initialState = {
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case START_LOADING:
      return Object.assign({}, {isLoading: true});

    case END_LOADING:
      return Object.assign({}, {isLoading: false});

    default:
      return state;
  }
}
