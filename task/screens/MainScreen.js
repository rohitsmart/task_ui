import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../component/CustomButton';
import { markAttendance } from '../utils/api';

const MainScreen = ({ token }) => {
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const handleMarkAttendance = async () => {
    try {
      setLoading(true);
      const response = await markAttendance(token);
      setResponseData(response.data);
    } catch (error) {
      console.error('Mark attendance error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <CustomButton
        title={loading ? 'Loading...' : 'Mark Attendance'}
        onPress={handleMarkAttendance}
        disabled={loading}
      />

      {responseData && (
        <View style={styles.responseContainer}>
          <Text style={styles.responseText}>
            API Response:
          </Text>
          <Text style={styles.responseData}>
            {JSON.stringify(responseData.message, null, 2)}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
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

export default MainScreen;
