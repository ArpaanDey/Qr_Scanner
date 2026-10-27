import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../config/api';

type User = {
  id?: string;
  username?: string;
  mobile?: string;
};

export default function Profile() {
  const navigation = useNavigation<any>();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch logged-in user's information
  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError('');

      const token = await AsyncStorage.getItem('token');

      if (!token) {
        setError('Login token not found. Please log in again.');
        return;
      }

      const response = await fetch(`${API_URL}/api/auth/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      console.log('Profile API response:', data);

      if (!response.ok) {
        setError(data.message || 'Failed to load profile.');
        return;
      }

      const userData = data.user ?? data;

      if (!userData.username && !userData.mobile) {
        setError('User information was not returned by the API.');
        return;
      }

      setUser(userData);
    } catch (err) {
      console.error('Profile error:', err);
      setError('Could not connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Logout the current user
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('token');

              // Reset the root stack to Login
              let rootNavigation: any = navigation;

              while (rootNavigation.getParent?.()) {
                rootNavigation = rootNavigation.getParent();
              }

              rootNavigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            } catch (err) {
              console.error('Logout error:', err);
              Alert.alert('Error', 'Unable to logout. Please try again.');
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  // Loading screen
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  // Error screen
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>

        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </View>
    );
  }

  // Profile screen
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Profile</Text>

      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {user?.username?.charAt(0)?.toUpperCase() || 'U'}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Username</Text>
        <Text style={styles.value}>
          {user?.username || 'Not provided'}
        </Text>

        <View style={styles.divider} />

        <Text style={styles.label}>Mobile Number</Text>
        <Text style={styles.value}>
          {user?.mobile || 'Not provided'}
        </Text>

        <View style={styles.divider} />

        <Text style={styles.label}>User ID</Text>
        <Text style={styles.value}>
          {user?.mobile || 'Not provided'}
        </Text>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.logoutButton,
          pressed && styles.buttonPressed,
        ]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    padding: 24,
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#2563eb',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  avatarText: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 20,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    color: '#777',
    marginTop: 8,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginTop: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 14,
  },
  loadingText: {
    marginTop: 12,
    color: '#555',
    fontSize: 16,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  logoutButton: {
    backgroundColor: '#dc2626',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonPressed: {
    opacity: 0.75,
  },
});
