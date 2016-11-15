import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import ContainerList from './scenes/ContainerList';
import ContainerMoveForm from './scenes/ContainerMoveForm';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key="containers">
        <Scene
          initial
          key="containerList"
          component={ContainerList}
          title="Container List"
        />
        <Scene
          key="containerMoveForm"
          component={ContainerMoveForm}
          title="Container Move"
        />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
