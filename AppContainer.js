import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import PlaysScreen from './screens/PlaysScreen';

const Stack = createNativeStackNavigator();


function AppContainer() {


  return(
    
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>

      <Stack.Screen name='Login' component={LoginScreen}/>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Games' component={PlaysScreen} />
      <Stack.Screen name='Details' component={DetailsScreen} screenOptions={{title: 'Details'}}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppContainer;