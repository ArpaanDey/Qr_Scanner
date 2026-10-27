
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigation from './src/Navigator/AppNavigation';

function App() {
  const [initialRoute, setInitialRoute] = useState<
    'Login' | 'Home' | 'SignUp' | null
  >(null);

  useEffect(() => {
    async function checkLogin() {
      try {
        const token = await AsyncStorage.getItem('token');
        setInitialRoute(token ? 'Home' : 'Login');
      } catch {
        setInitialRoute('Login');
      }
    }

    checkLogin();
  }, []); 

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigation initialRouteName={initialRoute} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
