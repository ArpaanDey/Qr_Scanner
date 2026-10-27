
// import { useNavigation } from '@react-navigation/native';
// import {
//   Pressable,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';

// function Home() {
//   const navigation = useNavigation<any>();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Home</Text>

//       <Pressable
//         onPress={() => navigation.navigate('Scanner')}
//         style={styles.button}
//       >
//         <Text style={styles.buttonText}>Scan QR Code</Text>
//       </Pressable>

//       <Pressable
//         onPress={() => navigation.navigate('Generator')}
//         style={styles.button}
//       >
//         <Text style={styles.buttonText}>Generate QR Code</Text>
//       </Pressable>
//     </View>
//   );
// }

// export default Home;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#FFFFFF',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 30,
//     color: '#222222',
//   },
//   button: {
//     width: '80%',
//     paddingVertical: 15,
//     marginVertical: 10,
//     borderRadius: 10,
//     backgroundColor: '#2563EB',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontSize: 18,
//     fontWeight: '600',
//   },
// });




import { StyleSheet, Text, View } from 'react-native';

function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Welcome Back!</Text>
      <Text style={styles.title}>QR Code Manager</Text>
      <Text style={styles.subtitle}>
        Scan, create, and manage your QR codes in one place.
      </Text>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FF',
    justifyContent: 'center',
    padding: 28,
  },
  greeting: {
    color: '#2563EB',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  title: {
    color: '#172554',
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 12,
  },
  subtitle: {
    color: '#64748B',
    fontSize: 16,
    lineHeight: 24,
  },
});
