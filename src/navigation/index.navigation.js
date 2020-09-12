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

//Components
// import TabBar from '../components/tabBar';

const Stack = createStackNavigator();

enableScreens();


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
        initialRouteName="Splash"
      >
        <Stack.Screen
          options={{ headerShown: false }}
          name="Splash"
          component={SplashScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;