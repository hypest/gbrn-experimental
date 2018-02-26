/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { Component } from 'react';
import {
  Platform,
  StyleSheet,
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

    var data = {}
    for (i = 0; i < 2; i++){
      data["id" + i] = this.newStateObject("this is some source code " + i);
    }

    this.state = data;

    registerCoreBlocks();
  }

  newStateObject(content) {
    return { sourceCode: content };
  }

  render() {
    const blockType = getBlockType('core/code');
    const Code = blockType.edit;
    return (
      <View style={styles.container}>
        <Code
          attributes={{content: this.state.id0.sourceCode}}
          setAttributes={ ( attributes ) => {
            const data = update(this.state, {id0: {$set:this.newStateObject(attributes.content)}});
            this.setState(data);
          } }
        />
        <Code
          attributes={{content: this.state.id1.sourceCode}}
          setAttributes={ ( attributes ) => {
            const data = update(this.state, {id1: {$set:this.newStateObject(attributes.content)}});
            this.setState(data);
          } }
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
