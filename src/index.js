import configureStore from './store';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import AppNavigator from './navigator';
import {Provider} from 'react-redux';
import {CustomSplashScreen} from './screens';
const App = () => {
  // set store state
  const [storeState, setStore] = useState(null);

  // when store is configured
  const onStoreConfigure = store => {
    setTimeout(() => {
      setStore(store);
    }, 3000);
  };

  useEffect(() => {
    // configure store
    configureStore(onStoreConfigure);
  }, []);

  if (storeState === null) {
    return <CustomSplashScreen />;
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Provider store={storeState}>
        <AppNavigator />
      </Provider>
    </View>
  );
};

export default App;
