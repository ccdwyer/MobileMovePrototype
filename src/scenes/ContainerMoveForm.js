import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  Container,
  Content,
  List,
  ListItem,
  InputGroup,
  Input,
  Icon,
  Footer,
  FooterTab,
  Button,
  Text
} from 'native-base';
import {
  locationTextChanged,
  containerTextChanged,
  locationsFetch,
  containersFetch,
  moveContainer
} from '../actions';
import { Card, CardSection, Spinner } from '../components/common';


class ContainerMoveForm extends Component {
  componentWillMount() {
    this.props.locationsFetch();
    this.props.containersFetch();
  }

  onLocationChange(locationText) {
    this.props.locationTextChanged({
      locations: this.props.locations,
      locationText
    });
  }

  onContainerChange(containerText) {
    this.props.containerTextChanged({
      containers: this.props.containers,
      containerText
    });
  }

  onMoveContainerPress() {
    const { containerText, containerUid, locationUid } = this.props;

    this.props.moveContainer({
      containerText,
      containerUid,
      locationUid
    });
  }

  onContainerListPress() {
    Actions.containerList({ type: 'reset' });
  }

  renderMoveContainerButton() {
    const { containerUid, locationUid } = this.props;

    if (containerUid !== null && locationUid !== null) {
      return (
        <ListItem>
          <Button onPress={this.onMoveContainerPress.bind(this)} block>Move Container</Button>
        </ListItem>
      );
    }

    return (
      <ListItem>
        <Text style={styles.incompleteFormText}>
          Please enter a valid location and container.
        </Text>
      </ListItem>
    );
  }

  renderLastMovedSection() {
    if (this.props.lastMovedContainer === '') {
      return (
        <View>
          <Text>No Container Moved Yet</Text>
        </View>
      );
    } else if (this.props.loading) {
      return (
        <View>
          <Spinner />
          <Text>{this.props.lastMovedContainer}</Text>
        </View>
      );
    } else if (this.props.success) {
      return (
        <View style={{ flexDirection: 'row' }}>
          <Icon name="ios-checkmark-circle-outline" />
          <Text style={{ fontSize: 18, paddingLeft: 15, paddingTop: 5 }}>
            {this.props.lastMovedContainer}
          </Text>
        </View>
      );
    }

    return (
      <View style={{ flexDirection: 'row' }}>
        <Icon name="ios-close-circle-outline" />
        <Text style={{ fontSize: 18, paddingLeft: 15, paddingTop: 5 }}>
          {this.props.lastMovedContainer}
        </Text>
      </View>
    );
  }

  render() {
    const containerStyle = (this.props.containerUid !== null) ?
      { color: 'green' } : { color: 'red' };
    const locationStyle = (this.props.locationUid !== null) ?
      { color: 'green' } : { color: 'red' };
    return (
      <Container>
        <Content style={{ backgroundColor: '#EEE' }}>
          <List>
            <ListItem>
              <InputGroup>
                <Icon name='ios-home' style={locationStyle} />
                <Input
                  value={this.props.locationText}
                  placeholder='LOCATION'
                  onChangeText={this.onLocationChange.bind(this)}
                />
                <Icon name="md-barcode" />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Icon name='ios-archive' style={containerStyle} />
                <Input
                  value={this.props.containerText}
                  placeholder='CONTAINER'
                  onChangeText={this.onContainerChange.bind(this)}
                />
                <Icon name="md-barcode" />
              </InputGroup>
            </ListItem>
            {this.renderMoveContainerButton()}
          </List>
          <Card>
            <CardSection style={{ justifyContent: 'center' }}>
              <Text style={{ fontSize: 20 }}>Last Moved Container</Text>
            </CardSection>
            <CardSection style={{ justifyContent: 'center' }}>
              {this.renderLastMovedSection()}
            </CardSection>
          </Card>

        </Content>
        <Footer>
          <FooterTab>
            <Button transparent onPress={this.onContainerListPress.bind(this)}>
              Containers
              <Icon name='ios-archive' />
            </Button>
            <Button active>
              Move
              <Icon name='ios-move' />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = {
  incompleteFormText: {
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = (state) => {
  console.log(state);
  const {
    loading,
    lastMovedContainer,
    success,
    locationText,
    locationUid,
    containerText,
    containerUid
  } = state.containerMoveForm;

  const { locations, containers } = state;

  return {
    loading,
    lastMovedContainer,
    success,
    locationText,
    locationUid,
    containerText,
    containerUid,
    locations,
    containers
  };
};

export default connect(mapStateToProps, {
  containerTextChanged,
  locationTextChanged,
  locationsFetch,
  containersFetch,
  moveContainer
})(ContainerMoveForm);
