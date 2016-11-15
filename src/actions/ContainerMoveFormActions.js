import firebase from 'firebase';
import {
  CONTAINER_MOVE,
  CONTAINER_MOVE_SUCCESS,
  CONTAINER_MOVE_FAIL,
  CM_CONTAINER_TEXT_CHANGED,
  CM_LOCATION_TEXT_CHANGED
} from '../actions/types';

export const moveContainer = ({ containerText, containerUid, locationUid }) => {
  return (dispatch) => {
    dispatch({ type: CONTAINER_MOVE, payload: { containerText } });
    firebase.database().ref(`/containers/${containerUid}/location`)
      .set(locationUid)
      .then(() => dispatch({ type: CONTAINER_MOVE_SUCCESS }))
      .catch(() => {
        dispatch({ type: CONTAINER_MOVE_FAIL });
      });
  };
};

export const locationTextChanged = ({ locations, locationText }) => {
  return {
    type: CM_LOCATION_TEXT_CHANGED,
    payload: { locations, locationText }
  };
};

export const containerTextChanged = ({ containers, containerText }) => {
  return {
    type: CM_CONTAINER_TEXT_CHANGED,
    payload: { containers, containerText }
  };
};
