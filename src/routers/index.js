import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import { NativeBaseProvider } from 'native-base';
import ForgotPassword from '../screens/ForgotPassword';
import Dashboard from '../screens/Dashboard';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </SafeAreaView>
  )
}

export default App