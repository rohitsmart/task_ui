import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from './component/CustomButton';
import axios from 'axios';

const LOGIN_API_URL = "http://179.61.188.36:9000/api/employee/login";
const ATTENDANCE_API_URL = "http://179.61.188.36:9000/api/attendence/web-online";
const EMAIL = "rohit.kumar@perfectkode.com";
const PASSWORD = "Rohit@1011";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [token, setToken] = useState(null);

  const loginAndGetToken = async () => {
    try {
      setLoading(true);
      const response = await axios.post(LOGIN_API_URL, {
        email: EMAIL,
        password: PASSWORD
      });
      const { token } = response.data.auth;
      setToken(token);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAttendance = async () => {
    try {
      setLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(ATTENDANCE_API_URL, null, { headers });
      setResponseData(response.data);
    } catch (error) {
      console.error('Mark attendance error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loginAndGetToken();
  }, []);

  return (
    <View style={styles.container}>
      <CustomButton
        title={loading ? 'Loading...' : 'Mark Attendance'}
        onPress={markAttendance}
        disabled={loading || !token}
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
