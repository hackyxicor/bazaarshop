import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { enableScreens } from 'react-native-screens';

//Services
import { navigationRef, isReadyRef } from '../services/navigation.service';

//Screens 
import SplashScreen from '../scenes/splashScene/splash.scene';
import LoginScene from '../scenes/loginScene/login.scene';
import HomeScene from '../scenes/homeScene/home.scene';

import Tabbar from '../components/Tabbar/tabbar.component';

//Components
// import TabBar from '../components/tabBar';
enableScreens();

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

function TabsNavigator() {
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      tabBar={(props) => <Tabbar {...props} />}
    >
      <Tabs.Screen
        name="Home"
        component={HomeScene}
      />
      <Tabs.Screen
        name="Categories"
        component={LoginScene}
      />
      <Tabs.Screen
        name="Bag"
        component={LoginScene}
      />
      <Tabs.Screen
        name="Orders"
        component={LoginScene}
      />
    </Tabs.Navigator>
  )
}

function RootNavigator() {
  React.useEffect(() => {
    return () => (isReadyRef.current = false);
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
    >
      <Stack.Navigator
        initialRouteName="TabsNavigator"
      >
        <Stack.Screen
          options={{ headerShown: false }}
          name="Tabs"
          component={TabsNavigator}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScene}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;