// src/screens/LeadFilterScreen/styles.js
import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: { flex: 1, paddingHorizontal: 12 },

  section: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },

  dropdown: {
    borderColor: '#ddd',
    borderRadius: 6,
    backgroundColor: '#f9f9f9',
    height: 44,
    paddingHorizontal: 12,
  },
  dropdownList: {
    borderColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 6,
    zIndex: -1,
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#333',
  },

  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 13,
    color: '#444',
  },

  radioGroup: {
    marginBottom: 8,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },

  sortingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },

  dateInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 13,
    backgroundColor: '#f9f9f9',
    marginBottom: 8,
    color: 'black',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 12,
  },
  applyBtn: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 6,
    flex: 0.48,
  },
  resetBtn: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 6,
    flex: 0.48,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  resetText: { color: '#333' },
  // Add these to StyleSheet.create({ ... })
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: SCREEN_HEIGHT * 0.7,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  modalSearch: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
    color: 'black',
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalItemText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: {
    color: '#fff',
    fontSize: 13,
    marginRight: 8,
  },
  selectButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    backgroundColor: '#f9f9f9',
  },
  selectButtonText: {
    fontSize: 14,
    color: '#333',
  },
});
