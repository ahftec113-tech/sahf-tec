// src/screens/LeadListScreen/styles.js
import { StyleSheet, Platform, StatusBar } from 'react-native';
import { wp } from '../../Hooks/useResponsive';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  /* ---------- Header ---------- */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    width: wp('100'),
  },
  headerBtn: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerBtnText: { color: '#fff', marginLeft: 4, fontSize: 13 },

  /* ---------- Filters Row ---------- */
  filterRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  filterPicker: {
    flex: 1,
    height: 36,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    marginHorizontal: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  pickerText: { fontSize: 13, color: '#555' },

  /* ---------- Table Header ---------- */
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#fdf2f8',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  colCheckbox: { width: 40, justifyContent: 'center', alignItems: 'center' },
  colName: { flex: 2 },
  colMobile: { flex: 1.5 },
  colMobile2: { flex: 1.5 },
  colStatus: { flex: 1.5 },
  colReturn: { width: 30, alignItems: 'center' },
  headerText: { fontWeight: '600', fontSize: 13, color: '#555' },

  /* ---------- List Item ---------- */
  row: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
  },
  cellText: { fontSize: 13, color: '#333' },
  statusText: { fontSize: 12, color: '#006400' },

  /* ---------- Pagination Footer ---------- */
  footer: {
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  pageBtn: {
    marginHorizontal: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#e3f2fd',
    borderRadius: 4,
  },
  pageBtnActive: { backgroundColor: '#2196F3' },
  pageText: { fontSize: 13, color: '#555' },
  pageTextActive: { color: '#fff' },

  /* ---------- Loading / Empty ---------- */
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
