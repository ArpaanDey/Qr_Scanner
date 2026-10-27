
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import Scanner from '../component/Scanner';
import Generator from '../component/Generator';
import Profile from '../component/Profile';

const Tab = createBottomTabNavigator();

function BottomNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Scanner"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarStyle: {
          height: 68,
          paddingTop: 8,
          paddingBottom: 8,
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E7EB',
          elevation: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Scanner"
        component={Scanner}
        options={{
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>▣</Text>,
        }}
      />

      <Tab.Screen
        name="Generator"
        component={Generator}
        options={{
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>▦</Text>,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>👤</Text>,
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomNavigation;
