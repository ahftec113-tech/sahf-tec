import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput as ReactTextInput,
} from 'react-native';
import { TextInput, RadioButton, Button } from 'react-native-paper';
import { hp, wp } from '../Hooks/useResponsive';

const AddRemarksModalComp = ({ visible, onClose, onSave, data }) => {
  const [user, setUser] = useState(data?.user_name);
  const [date, setDate] = useState(data?.date);
  const [reason, setReason] = useState('Weekly Off');
  const [OtherReason, setOtherReason] = useState(null);

  const handleSave = () => {
    onSave(reason == 'Others' ? OtherReason : reason);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Add Reason</Text>

          {/* User */}
          <Text style={styles.label}>User:</Text>
          <TextInput
            mode="outlined"
            value={user}
            onChangeText={setUser}
            style={styles.input}
            editable={false}
          />

          {/* Date */}
          <Text style={styles.label}>Date:</Text>
          <TextInput
            mode="outlined"
            value={date}
            onChangeText={setDate}
            style={styles.input}
            keyboardType="numbers-and-punctuation"
            placeholder="YYYY-MM-DD"
            editable={false}
          />

          {/* Reason Type */}
          <Text style={styles.label}>Reason Type:</Text>
          <RadioButton.Group onValueChange={v => setReason(v)} value={reason}>
            <View style={styles.radioRow}>
              <RadioButton value="Weekly Off" color="#007AFF" />
              <TouchableOpacity onPress={() => setReason('Weekly Off')}>
                <Text style={styles.radioLabel}>Weekly Off</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.radioRow}>
              <RadioButton value="Others" color="#007AFF" />
              <TouchableOpacity onPress={() => setReason('Others')}>
                <Text style={styles.radioLabel}>Others</Text>
              </TouchableOpacity>
            </View>
          </RadioButton.Group>
          {reason == 'Others' && (
            <>
              <Text style={styles.label}>Specify Reason:</Text>
              <View
                style={{
                  width: wp('80'),
                  minHeight: hp('6.5'),
                  maxHeight: hp('12'),
                  borderRadius: 10,
                  borderWidth: 0.5,
                  paddingVertical: hp('0.5'),
                  paddingHorizontal: wp('1'),
                }}
              >
                <ReactTextInput
                  placeholder="Enter reason..."
                  placeholderTextColor={'gray'}
                  style={{ color: 'black' }}
                  multiline
                  onChangeText={e => setOtherReason(e)}
                  value={OtherReason}
                />
              </View>
            </>
          )}

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleSave}
              style={styles.saveButton}
            >
              Save
            </Button>
            <Button
              mode="outlined"
              onPress={onClose}
              style={styles.closeButton}
            >
              Close
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  label: {
    marginTop: 16,
    marginBottom: 6,
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  input: {
    backgroundColor: '#f5f5f5',
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginVertical: hp('0.5'),
  },
  radioLabel: {
    fontSize: hp('2'),
    marginLeft: hp('1'),
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  saveButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#4CAF50',
  },
  closeButton: {
    flex: 1,
    marginLeft: 10,
  },
});

export default AddRemarksModalComp;
