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

    this.state = this.newStateObject("this is some source code");

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
          attributes={{content: this.state.sourceCode}}
          setAttributes={ ( attributes ) => { this.setState(this.newStateObject(attributes.content)); } }
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
