import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LoginScreen from './screens/Login';
import MainScreen from './screens/MainScreen';

export default function App() {
  const [token, setToken] = useState(null);

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  return (
    <View style={styles.container}>
      {token ? (
        <MainScreen token={token} />
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}
    </View>
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
