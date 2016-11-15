import firebase from 'firebase';
import {
  LOCATIONS_FETCH_SUCCESS
} from '../actions/types';

export const locationsFetch = () => {
  return (dispatch) => {
    firebase.database().ref('/locations')
      .on('value', snapshot => {
        dispatch({ type: LOCATIONS_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};
