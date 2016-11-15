import React, { Component } from 'react';
import { ListView, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
  Container,
  Content,
  ListItem,
  Text,
  Footer,
  FooterTab,
  Button,
  Icon
} from 'native-base';
import { containersFetch, locationsFetch } from '../actions';

class ContainerList extends Component {
  componentWillMount() {
    this.props.locationsFetch();
    this.props.containersFetch();
    console.log(this.props);
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.createDataSource(nextProps);
  }

  moveButtonPress() {
    console.log('move button pressed');
    Actions.containerMoveForm({ type: 'reset' });
  }

  createDataSource({ containers, locations }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    if (Object.keys(containers).length > 0
      && Object.keys(locations).length > 0) {
      const containerWithLocation = containers.map(
        (container) => {
          const containerLocation = locations[`${container.location}`].name;
          console.log(containerLocation);
          return {
            ...container,
            locationName: containerLocation
          };
        });
      this.dataSource = ds.cloneWithRows(containerWithLocation);
    } else {
      this.dataSource = ds.cloneWithRows(containers);
    }
  }

  renderRow(container) {
    if (container.locationName) {
      return (
        <ListItem>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 20, flex: 1 }}>
              {container.name}
            </Text>
            <Text style={{ color: '#666' }}>
              Location: {container.locationName}
            </Text>
          </View>
        </ListItem>
      );
    }
    return (
      <ListItem>
        <Text>
          {container.name}
        </Text>
      </ListItem>
    );
  }

  render() {
    return (
      <Container>
        <Content style={{ backgroundColor: '#EEE' }}>
          <ListView
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow}
          />
        </Content>
        <Footer>
          <FooterTab>
            <Button active>
              Containers
              <Icon name='ios-archive' />
            </Button>
            <Button transparent onPress={this.moveButtonPress.bind(this)}>
              Move
              <Icon name='ios-move' />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  const { locations, containers } = state;

  return {
    locations,
    containers
  };
};

export default connect(mapStateToProps, { containersFetch, locationsFetch })(ContainerList);
