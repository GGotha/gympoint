import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { createBottomTabNavigator } from 'react-navigation-tabs';

import SignIn from './pages/Signin';

import Checkins from './pages/Checkins';
import PedirAjuda from './pages/PedirAjuda';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            Checkins,
            PedirAjuda,
          },
          {
            tabBarOptions: {
              activeTintColor: '#ee4e62',
            },
          },
        ),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign',
      },
    ),
  );
