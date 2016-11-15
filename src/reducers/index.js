import { combineReducers } from 'redux';
import ContainerMoveFormReducer from './ContainerMoveFormReducer';
import ContainerReducer from './ContainerReducer';
import LocationsReducer from './LocationReducer';

export default combineReducers({
  containerMoveForm: ContainerMoveFormReducer,
  containers: ContainerReducer,
  locations: LocationsReducer
});
