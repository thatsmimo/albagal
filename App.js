/**
 * React Native App
 * @author
 * Kazi Hasan Ali
 * Mainak Shil
 */

import React from 'react';
import 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import AppContainer from './src/navigation/MainNav';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#00768B" barStyle="light-content" />
      <AppContainer />
    </>
  );
};

export default App;
