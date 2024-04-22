import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Correct import
import { ToastProvider } from 'react-native-toast-notifications'
import LoginScreen from './screens/Login';
import MainScreen from './screens/MainScreen';

export default function App() {
  const [token, setToken] = useState(null);

  const checkToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken !== null) {
        setToken(storedToken);
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const handleLogin = async (newToken) => {
    try {
      await AsyncStorage.setItem('token', newToken);
      setToken(newToken);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setToken(null);
    } catch (error) {
      console.error('Error removing token:', error);
    }
  };

  return (
    
    <ToastProvider>
    <View style={styles.container}>
      {token ? (
        <MainScreen token={token} onLogout={handleLogout} />
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}
    </View>
  </ToastProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
