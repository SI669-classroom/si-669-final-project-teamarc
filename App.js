import AppContainer from './AppContainer';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './Reducer';


const store = configureStore({
  reducer: rootReducer, 
});

export default function App() {
  return (
    <Provider store={store}>
     <AppContainer/>
    </Provider>
  );
}


