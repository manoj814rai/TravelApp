// In App.js in a new project

import * as React from 'react';
import {store} from "./src/redux/Store.js";
import { Provider } from "react-redux";
import AppRoute from './src/navigation/AppNavigator'

const App = () => {
  return (
      <Provider store={store}>
          <AppRoute />
      </Provider>
  )
};

export default App;