/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { Component } from 'react';
import {
  Platform,
  StyleSheet,
  FlatList,
  Text,
  View
} from 'react-native';

import update from 'immutability-helper';

import {
  getBlockType,
} from './gutenberg/blocks/api';

import { registerCoreBlocks } from './gutenberg/blocks/library'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);

    var data = {items: []}
    for (i = 0; i < 2; i++){
      data.items.push(new this.newStateObject(i, "this is some source code " + i));
    }

    this.state = data;

    registerCoreBlocks();
  
    const blockType = getBlockType('core/code');
    Code = blockType.edit;
  }

  newStateObject(key, content) {
    return { key: key, sourceCode: content };
  }

  _keyExtractor = (item) => "id" + item.key;

  _renderItem = ({item}) => (
    <Code
      attributes={{content: item.sourceCode}}
      setAttributes={ ( attributes ) => {
        const index = this.state.items.findIndex(k => k.key == item.key);
        const items = update(this.state.items, {[index]: {$set: this.newStateObject(item.key, attributes.content)}});
        this.setState({items});
      } }
    />
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.items}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
