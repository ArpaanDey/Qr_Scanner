import { useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config/api';
import { useNavigation } from '@react-navigation/native';

function Login() {
  const [phNumber, setPhNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();

  async function handleButton() {
    if (!phNumber.trim() || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (!/^\d{10}$/.test(phNumber)) {
      Alert.alert('Invalid Number', 'Enter a valid 10-digit mobile number.');
      return;
    }

    try {
      setLoading(true);
    
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile: phNumber.trim(),
          password,
        }),
      });
    
      const data = await response.json();
    
      if (!response.ok) {
        console.error('Login API error:', data);
        Alert.alert(
          'Login Failed',
          data.message || 'Invalid mobile number or password.',
        );
        return;
      }
    
      if (!data.token) {
        console.error('Token missing in response:', data);
        Alert.alert('Login Error', 'The server did not return a login token.');
        return;
      }
    
      await AsyncStorage.setItem('token', data.token);
    
      console.log('Login successful:', data.user);
    
      setPhNumber('');
      setPassword('');
    
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    
    } catch (error) {
      console.error('Login catch error:', error);
    
      Alert.alert(
        'Login Error',
        error instanceof Error
          ? error.message
          : 'Cannot connect to the backend. Check your API URL and server.',
      );
    } finally {
      setLoading(false);
    }
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.mainContainer}>
            <View style={styles.header}>
              <Text style={styles.welcome}>Welcome Back!</Text>
              <Text style={styles.headerSubtitle}>Sign in to continue</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.title}>Login</Text>

              <Text style={styles.label}>Mobile Number</Text>
              <TextInput
                value={phNumber}
                placeholder="Enter mobile number"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
                onChangeText={setPhNumber}
                maxLength={10}
                style={styles.input}
              />

              <Text style={styles.label}>Password</Text>
              <TextInput
                value={password}
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                onChangeText={setPassword}
                style={styles.input}
              />

              <Pressable
                onPress={() => Alert.alert('Forgot Password', 'Coming soon!')}
                style={styles.forgotButton}
              >
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </Pressable>

              <Pressable
                onPress={handleButton}
                disabled={loading}
                style={({ pressed }) => [
                  styles.loginButton,
                  pressed && styles.buttonPressed,
                  loading && { opacity: 0.6 },
                ]}
              >
                <Text style={styles.loginText}>
                  {loading ? 'Logging in...' : 'Sign In'}
                </Text>
              </Pressable>

              <View style={styles.divider} />

              <View style={styles.signUpContainer}>
                <Text style={styles.signUpLabel}>Don't have an account?</Text>

                <Pressable
                  onPress={() =>
                    Alert.alert('Sign Up', 'Connect your signup screen here.')
                  }
                >
                  <Pressable onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.signUpText}>Sign Up</Text>
                  </Pressable>
                </Pressable> 
              </View>
            </View>
          </View> 
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default Login;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F6FF',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 22,
    paddingVertical: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  welcome: {
    fontSize: 29,
    fontWeight: '800',
    color: '#172554',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 8,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 440,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    elevation: 6,
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 15,
  },
  title: {
    fontSize: 25,
    fontWeight: '800',
    color: '#172554',
    marginBottom: 25,
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 8,
    marginBottom: 24,
    lineHeight: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 9,
  },
  input: {
    height: 53,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 13,
    paddingHorizontal: 15,
    fontSize: 15,
    color: '#0F172A',
    backgroundColor: '#F8FAFC',
    marginBottom: 20,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: -8,
    marginBottom: 22,
  },
  forgotText: {
    fontSize: 13,
    color: '#4F46E5',
    fontWeight: '600',
  },
  loginButton: {
    height: 56,
    borderRadius: 14,
    backgroundColor: '#4F46E5',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    elevation: 3,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  loginText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  divider: {
    height: 1,
    backgroundColor: '#EEF2F7',
    marginVertical: 22,
  },
  signUpContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpLabel: {
    color: '#64748B',
    fontSize: 13,
  },
  signUpText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#4F46E5',
  },
  footer: {
    textAlign: 'center',
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 24,
  },
});
