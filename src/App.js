import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './reducers';
import Router from './Router';
import { manyToOneJoin } from './helpers/Join';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyBj6Yx6xfgAlEVrfiFCwtE-RCSQsgYxF24',
      authDomain: 'mobilemove-a85f0.firebaseapp.com',
      databaseURL: 'https://mobilemove-a85f0.firebaseio.com',
      storageBucket: 'mobilemove-a85f0.appspot.com',
      messagingSenderId: '120451714302'
    };
    firebase.initializeApp(config);
  }

  render() {
    const joined = manyToOneJoin({
      a1: { name: 'Chris', location: 'b1' },
      a2: { name: 'Samantha', location: 'b1' },
      a3: { name: 'Westin', location: 'b2' }
    }, 'location', {
      b1: { name: 'Michigan' },
      b2: { name: 'California' }
    }, 'loc');

    console.log('joined arrays:');
    console.log(joined);
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
