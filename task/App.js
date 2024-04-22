import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from './component/CustomButton';

export default function App() {
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [responseData, setResponseData] = useState(null); // State to store API response data
  const apiUrl = 'YOUR_API_ENDPOINT'; // Your API endpoint

  const callApi = async () => {
    try {
      setLoading(true); // Set loading to true when API call starts
      const response = await fetch(apiUrl);
      const data = await response.json();
      setResponseData(data); // Set response data in state
    } catch (error) {
      console.error('API call error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <CustomButton
        title={loading ? 'Loading...' : 'Call API'}
        onPress={callApi}
        disabled={loading}
      />

      {/* Display API response */}
      {responseData && (
        <View style={styles.responseContainer}>
          <Text style={styles.responseText}>
            API Response:
          </Text>
          <Text style={styles.responseData}>
            {JSON.stringify(responseData, null, 2)}
          </Text>
        </View>
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
  responseContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  responseText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  responseData: {
    fontSize: 14,
    color: '#333',
  },
});
