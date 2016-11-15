import firebase from 'firebase';
import {
  CONTAINERS_FETCH_SUCCESS
} from '../actions/types';

export const containersFetch = () => {
  return (dispatch) => {
    firebase.database().ref('/containers')
      .on('value', snapshot => {
        dispatch({ type: CONTAINERS_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};
