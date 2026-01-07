import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  Alert,
  StyleSheet,
} from 'react-native';
import { Linking } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const WhatappMsgScreen = () => {
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const templates = [
    'Hello! This is a test message from the app.',
    'Hi there, hope you are doing well. This is a sample template.',
    // Add more templates as needed
  ];

  const fetchNumbers = () => {
    // Dummy array for phone numbers (simulating API response)
    const dummyNumbers = [
      '+1234567890',
      '+0987654321',
      '+1122334455',
      // Add more dummy numbers as needed
    ];

    const validNumbers = dummyNumbers.filter(num => /^\+\d+$/.test(num));

    if (validNumbers.length === 0) {
      Alert.alert('Error', 'No valid phone numbers found in the dummy data.');
      return;
    }

    setPhoneNumbers(validNumbers);
    Alert.alert(
      'Success',
      `${validNumbers.length} numbers loaded from dummy API data.`,
    );
  };

  const handleTemplateChange = value => {
    setSelectedTemplate(value);
    setMessage(value);
  };

  const sendMessages = async () => {
    if (phoneNumbers.length === 0 || !message.trim()) {
      Alert.alert('Missing Info', 'Fetch numbers and enter/select a message.');
      return;
    }

    const isWhatsAppInstalled = await Linking.canOpenURL('whatsapp://');
    if (!isWhatsAppInstalled) {
      Alert.alert('Error', 'WhatsApp is not installed.');
      return;
    }

    setIsSending(true);
    for (let i = 0; i < phoneNumbers.length; i++) {
      const phone = phoneNumbers[i];
      const url = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(
        message,
      )}`;
      try {
        await Linking.openURL(url);
        // Pause briefly for user to send (manual step)
        await new Promise(resolve => setTimeout(resolve, 2000)); // Adjust delay as needed
        Alert.alert(
          'Progress',
          `Sent to ${i + 1}/${
            phoneNumbers.length
          } numbers. Confirm in WhatsApp.`,
        );
      } catch (err) {
        Alert.alert('Error', `Failed to open WhatsApp for ${phone}.`);
      }
    }
    setIsSending(false);
    Alert.alert('Done', 'All messages processed (manual sends required).');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bulk WhatsApp Messenger</Text>

      <Button title="Fetch Phone Numbers" onPress={fetchNumbers} />
      {phoneNumbers.length > 0 ? (
        <Text style={styles.fileName}>
          ({phoneNumbers.length} numbers loaded)
        </Text>
      ) : null}

      <Text style={styles.previewTitle}>Select Message Template:</Text>
      <Picker
        selectedValue={selectedTemplate}
        onValueChange={handleTemplateChange}
        style={styles.picker}
        dropdownIconColor="#666"
      >
        <Picker.Item label="Select a template" value="" />
        {templates.map((template, index) => (
          <Picker.Item
            key={index}
            label={`Template ${index + 1}`}
            value={template}
          />
        ))}
      </Picker>

      <TextInput
        style={styles.messageInput}
        placeholder="Type your message here or edit the template..."
        multiline
        value={message}
        onChangeText={setMessage}
      />

      <Text style={styles.previewTitle}>Preview Phone Numbers:</Text>
      <FlatList
        data={phoneNumbers.slice(0, 10)} // Show first 10 for preview
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.phoneItem}>{item}</Text>}
        ListFooterComponent={
          phoneNumbers.length > 10 ? (
            <Text>...and {phoneNumbers.length - 10} more</Text>
          ) : null
        }
      />

      <Button
        title={isSending ? 'Sending...' : 'Send to All'}
        onPress={sendMessages}
        disabled={isSending}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  fileName: { marginVertical: 10, fontStyle: 'italic', color: 'black' },
  messageInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    height: 100,
    textAlignVertical: 'top',
    color: 'black',
  },
  previewTitle: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
    color: 'black',
  },
  phoneItem: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    color: 'black',
  },
  picker: { height: 50, width: '100%', marginBottom: 10, color: 'black' },
});

export default WhatappMsgScreen;
