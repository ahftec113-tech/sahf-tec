// src/screens/CallSyncScreen/index.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
  PermissionsAndroid,
  StyleSheet,
} from 'react-native';
import CallLogs from 'react-native-call-log';
import useReduxStore from '../../Hooks/UseReduxStore';
import { HeaderComponent } from '../../Components/HeaderComp';

const CallSyncScreen = () => {
  const { getState } = useReduxStore();
  const { userData, token } = getState('Auth');

  const [isSyncing, setIsSyncing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [hasSynced, setHasSynced] = useState(false);

  const requestCallLogPermission = async () => {
    if (Platform.OS !== 'android') {
      Alert.alert(
        'Not Supported',
        'Call log access is only supported on Android.',
      );
      return false;
    }

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        {
          title: 'Call Log Permission',
          message:
            'This app needs access to your call history to sync with the server.',
          buttonNeutral: 'Ask Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const sendToServer = async logs => {
    console.log('logslogslogslogslogslogslogslogslogs', logs);

    const serverUrl = 'https:www.sahfgroup.com/mb_user_secondary_lead_pl.htm'; // ← CHANGE THIS TO YOUR ACTUAL ENDPOINT

    try {
      const response = await fetch(serverUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer your-token-here', // Add if needed
        },
        body: JSON.stringify({
          userLoginIDC: userData?.id,
          userLoginToken: token,
          rqst_ke_fntn_vl: 'usr_lg_attempt',
          LgClientID: userData?.crm_software_clients_id,
          CallSync: 'CallSync',
          callStateDataLogSv: logs.map(res => ({
            name: res?.name,
            phoneNumber: res?.phoneNumber,
            dateTime: res?.dateTime,
            type: res?.type,
            duration: res?.duration,
          })),
        }),
      });
      console.log('responseresponseresponseresponseresponseresponse', response);
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
    } catch (error) {
      throw new Error('Failed to send data to server: ' + error.message);
    }
  };

  const startSync = async () => {
    setIsSyncing(true);
    setStatusMessage('Requesting permission...');

    const hasPermission = await requestCallLogPermission();
    if (!hasPermission) {
      setStatusMessage('Permission denied. Cannot read call logs.');
      setIsSyncing(false);
      return;
    }

    try {
      setStatusMessage('Fetching call logs from device...');
      const logs = await CallLogs.loadAll(); // or load(100) to limit number

      if (!logs || logs.length === 0) {
        setStatusMessage('No call logs found on this device.');
        setIsSyncing(false);
        return;
      }

      setStatusMessage(`Found ${logs.length} call logs. Uploading...`);
      await sendToServer(logs);

      setStatusMessage('Call logs synced successfully! ✅');
      setHasSynced(true);
    } catch (error) {
      console.error(error);
      setStatusMessage('Error: ' + error.message);
      Alert.alert('Sync Failed', error.message);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <>
      <HeaderComponent isBack headerTitle={'Call Logs'} />
      <View style={styles.container}>
        <Text style={styles.title}>Sync Call Logs</Text>
        <Text style={styles.description}>
          Tap the button below to sync your device's call history with the
          server.
        </Text>

        <TouchableOpacity
          style={[styles.syncButton, isSyncing && styles.syncButtonDisabled]}
          onPress={startSync}
          disabled={isSyncing}
        >
          {isSyncing ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.syncButtonText}>
              {hasSynced ? 'Sync Again' : 'Start Sync'}
            </Text>
          )}
        </TouchableOpacity>

        {statusMessage ? (
          <Text style={[styles.status, hasSynced && styles.successText]}>
            {statusMessage}
          </Text>
        ) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  syncButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
  },
  syncButtonDisabled: {
    backgroundColor: '#90caf9',
  },
  syncButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  status: {
    marginTop: 30,
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    paddingHorizontal: 20,
  },
  successText: {
    color: '#4caf50',
    fontWeight: '600',
  },
});

export default CallSyncScreen;
