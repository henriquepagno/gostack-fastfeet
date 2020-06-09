import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';

import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

import Detail from './pages/Detail';
import NewProblem from './pages/NewProblem';
import Problem from './pages/Problem';

import Colors from '~/styles/Constants';

const defaultNavigationOptions = {
  headerTransparent: true,
  headerTintColor: Colors.white,
  headerTitleAlign: 'center',
  headerLeftContainerStyle: {
    marginLeft: 20,
  },
};

const bottomTabConfig = {
  resetOnBlur: true,
  tabBarOptions: {
    keyboardHidesTabBar: true,
    activeTintColor: Colors.purple,
    inactiveTintColor: 'rgba(0, 0, 0, 0.6)',
    labelStyle: {
      fontSize: 14,
    },
    style: {
      backgroundColor: Colors.white,
      height: 60,
      paddingTop: 5,
      paddingBottom: 5,
    },
  },
};

const stackNavigationOptions = {
  tabBarLabel: 'Entregas',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <Icon name="toc" size={30} color={tintColor} />
  ),
};

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: SignIn,
        App: createBottomTabNavigator(
          {
            Dashboard: {
              screen: createStackNavigator(
                {
                  Dashboard,
                  Detail,
                  NewProblem,
                  Problem,
                },
                {
                  defaultNavigationOptions,
                }
              ),
              navigationOptions: stackNavigationOptions,
            },
            Profile,
          },
          bottomTabConfig
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
