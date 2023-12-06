import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import PlaysScreen from './screens/PlaysScreen';
import TicTacToeScreen from './screens/TicTacToeScreen';
import DotsAndBoxesScreen from './screens/DotsAndBoxes';
import HangManScreen from './screens/HangMan/HangMan';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createNativeStackNavigator();


function AppContainer() {


  return(
    
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>

      <Stack.Screen name='Login' component={LoginScreen}/>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Games' component={PlaysScreen} />
      <Stack.Screen name='TicTacToe' component={TicTacToeScreen} />
      <Stack.Screen name='DotsAndBoxes' component={DotsAndBoxesScreen} />
      <Stack.Screen name='HangMan' component={HangManScreen} />
      <Stack.Screen name='Settings' component={SettingsScreen} />
      <Stack.Screen name='Details' component={DetailsScreen} screenOptions={{title: 'Details'}}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppContainer;