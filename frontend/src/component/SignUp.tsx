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
import { API_URL } from '../config/api';
import { useNavigation } from '@react-navigation/native';

function SignUp() {

    const [userName, setUserName] = useState('');
  const [phNumber, setPhNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();

  async function handleButton() {
    if (!userName.trim() || !phNumber.trim() || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (!/^\d{10}$/.test(phNumber)) {
      Alert.alert('Error', 'Enter a valid 10-digit mobile number.');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Error', 'Password must contain at least 8 characters.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userName.trim(),
          mobile: phNumber,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Registration Failed', data.message || 'Please try again.');
        return;
      }

      Alert.alert(
        'Success',
        'Registration successful!',
        [
          {
            text: 'Continue to Login',
            onPress: () => navigation.navigate('Login')
          },
        ],
    );
       
      setUserName('');
      setPhNumber('');
      setPassword('');
    } catch (error) {
      Alert.alert(
        'Connection Error',
        'Cannot connect to the backend. Check your API URL and server.',
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
              <Text style={styles.welcome}>Create Account</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.title}>Sign Up</Text>
              <Text style={styles.subtitle}>
                Enter your details to create an account.
              </Text>

              <Text style={styles.label}>Username</Text>
              <TextInput
                value={userName}
                placeholder="Enter your username"
                placeholderTextColor="#9CA3AF"
                onChangeText={setUserName}
                autoCapitalize="none"
                style={styles.input}
              />

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
                placeholder="Create a password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                onChangeText={setPassword}
                style={styles.input}
              />

              <Pressable
                onPress={handleButton}
                disabled={loading}
                style={({ pressed }) => [
                  styles.registerButton,
                  pressed && styles.buttonPressed,
                  loading && { opacity: 0.6 },
                ]}
              >
                <Text style={styles.registerText}>
                  {loading ? 'Registering...' : 'Create Account'}
                </Text>
              </Pressable>

              <View style={styles.divider} />

              <View style={styles.signInContainer}>
                <Text style={styles.signInLabel}>Already have an account?</Text>

                <Pressable
                  onPress={() =>
                    Alert.alert('Sign In', 'Connect your login screen here.')
                  }
                >
                 
                  <Pressable onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.signInText}>Sign Up</Text>
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

export default SignUp;

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
  logo: {
    width: 66,
    height: 66,
    borderRadius: 22,
    backgroundColor: '#E0E7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  logoText: {
    fontSize: 38,
    color: '#4F46E5',
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
  registerButton: {
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
  registerText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  arrow: {
    color: '#FFFFFF',
    fontSize: 23,
    marginLeft: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#EEF2F7',
    marginVertical: 22,
  },
  signInContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInLabel: {
    color: '#64748B',
    fontSize: 13,
  },
  signInText: {
    color: '#4F46E5',
    fontSize: 13,
    fontWeight: '800',
  },
  footer: {
    textAlign: 'center',
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 24,
  },
});
