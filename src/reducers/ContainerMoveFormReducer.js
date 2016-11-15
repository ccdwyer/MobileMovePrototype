import _ from 'lodash';

import {
  CONTAINER_MOVE,
  CONTAINER_MOVE_SUCCESS,
  CONTAINER_MOVE_FAIL,
  CM_CONTAINER_TEXT_CHANGED,
  CM_LOCATION_TEXT_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  lastMovedContainer: '',
  success: null,
  locationText: '',
  locationUid: null,
  containerText: '',
  containerUid: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONTAINER_MOVE:
      return {
        ...state,
        loading: true,
        lastMovedContainer: action.payload.containerText,
        success: null
      };
    case CONTAINER_MOVE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        containerText: '',
        containerUid: null
      };
    case CONTAINER_MOVE_FAIL:
      return {
        ...state,
        loading: false,
        success: false
      };
    case CM_LOCATION_TEXT_CHANGED:
      return {
        ...state,
        locationText: action.payload.locationText,
        locationUid: findObjectWithName(action.payload.locations, action.payload.locationText)
      };
    case CM_CONTAINER_TEXT_CHANGED:
      return {
        ...state,
        containerText: action.payload.containerText,
        containerUid: findObjectWithName(action.payload.containers, action.payload.containerText)
      };
    default:
      return state;
  }
};

const findObjectWithName = (objects, name) => {
  const objectArray = _.map(objects, (val, uid) => {
    return { ...val, uid };
  });

  for (let i = 0; i < objectArray.length; i++) {
    if (objectArray[i].name === name
      || objectArray[i].uid.toString() === name) {
      return objectArray[i].uid;
    }
  }

  return null;
};
