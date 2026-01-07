import { Platform } from 'react-native';
import { StyleSheet } from 'react-native';
import { hp } from '../../Hooks/useResponsive';

export const styles = StyleSheet.create({
  half: { width: '48%' },
  third: { width: '31%' },
  full: { width: '100%' },
  label: { marginBottom: 6, fontSize: 14, color: '#333' },
  required: { color: 'red' },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 6,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    ...Platform.select({
      android: { backgroundColor: 'transparent', color: 'black' },
      ios: { height: 160 },
    }),
  },
  noteInput: {
    width: '100%',
    borderRadius: 10,
    padding: 14,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    fontSize: 15,
    color: 'black',
    borderWidth: 1,
    borderColor: '#999',
    marginTop: hp('2'),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
});
