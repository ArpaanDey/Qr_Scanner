// // import { createStackNavigator } from "@react-navigation/stack";
// // import Home from "../component/Home";
// // import Login from "../component/Login";
// // import SignUp from "../component/SignUp";
// // import Scanner from "../component/Scanner";
// // import Generator from "../component/Generator";

// // const Stack = createStackNavigator()
// // const AppNavigation = () => {
// //     return(
// //         <Stack.Navigator screenOptions={{ headerShown:false }}>
// //             {/*<Stack.Screen component={ Home } name ='Home' />*/}
// //              {/* <Stack.Screen component={ Login } name='Login'/> */}
// //             <Stack.Screen component={ SignUp } name="SignUp" />
// //             <Stack.Screen component={Scanner} name="Scanner" />
// //             <Stack.Screen component={Generator} name="Generator"/>
// //         </Stack.Navigator>
// //     )
// // }
// // export default AppNavigation;

// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import SignUp from '../component/SignUp';
// import Login from '../component/Login';

// export type RootStackParamList = {
//   SignUp: undefined;
//   Login: undefined;
// };

// const Stack = createNativeStackNavigator<RootStackParamList>();

// function AppNavigation() {
//   return (
//     <Stack.Navigator initialRouteName="Login">
//       <Stack.Screen
//         name="Login"
//         component={Login}
//         options={{ headerShown: false }}
//       />

//       <Stack.Screen
//         name="SignUp"
//         component={SignUp}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// }

// export default AppNavigation;




// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import Login from '../component/Login';
// import SignUp from '../component/SignUp';
// import Home from '../component/Home';
// import Scanner from '../component/Scanner';
// import Generator from '../component/Generator';

// export type RootStackParamList = {
//   Login: undefined;
//   SignUp: undefined;
//   Home: undefined;
//   Scanner: undefined;
//   Generator: undefined;
// };

// type AppNavigationProps = {
//   initialRouteName: 'Login' | 'SignUp' | 'Home';
// };

// const Stack = createNativeStackNavigator<RootStackParamList>();

// function AppNavigation({ initialRouteName }: AppNavigationProps) {
//   return (
//     <Stack.Navigator initialRouteName={initialRouteName}>
//       <Stack.Screen
//         name="Login"
//         component={Login}
//         options={{ headerShown: false }}
//       />

//       <Stack.Screen
//         name="SignUp"
//         component={SignUp}
//         options={{ headerShown: false }}
//       />

//       <Stack.Screen
//         name="Home"
//         component={Home}
//         options={{ headerShown: false }}
//       />

//       <Stack.Screen
//         name="Scanner"
//         component={Scanner}
//         options={{ headerShown: false }}
//       />

//       <Stack.Screen
//         name="Generator"
//         component={Generator}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// }

// export default AppNavigation;



import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../component/Login';
import SignUp from '../component/SignUp';
import BottomNavigation from './BottomNavigation';

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigation({
  initialRouteName,
}: {
  initialRouteName: 'Login' | 'SignUp' | 'Home';
}) {
  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={BottomNavigation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigation;