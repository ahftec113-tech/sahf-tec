import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
import React, { memo, useCallback, useState } from 'react';
import { HeaderComponent } from '../../Components/HeaderComp';
import AddRemarksModalComp from '../../Components/AddRemarksModalComp';
import { Picker } from '@react-native-picker/picker';
import { ChevronDown } from 'lucide-react-native'; // Optional: for beautiful icons
import { hp, wp } from '../../Hooks/useResponsive';
import useLeadReportScreen from './useLeadReportScreen';
import DatePicker from 'react-native-date-picker';
import { formatDateToMDY } from '../../Services/GlobalFunctions';
import { TextComponent } from '../../Components/TextComponent';
import ThemeButton from '../../Components/ThemeButton';
import { Card, Title, DataTable, Button, Divider } from 'react-native-paper';

const { width } = Dimensions.get('window');

const LeadReportScreen = () => {
  const {
    userData,
    leads_category,
    report_types,
    leadsCat,
    onChangeVal,
    reportType,
    currentDate,
    dateType,
    dayType,
    endDate,
    startDate,
    apiPostData,
    modalType,
    mutate,
    lead_user_data,
    setApiPostData,
    setLead_user_data,
    add_remarks_user_data,
    modalVisible,
    setModalVisible,
    addReason,
  } = useLeadReportScreen();

  const renderItem = useCallback(({ item, index }) => {
    return (
      <Card style={styles.card}>
        <Card.Content>
          <DataTable>
            {Object.entries(item).map(([key, value]) => (
              <DataTable.Row key={`${index}-${key}`}>
                <DataTable.Cell>{key}</DataTable.Cell>
                <DataTable.Cell
                  numeric={typeof value == 'number'}
                  style={{ justifyContent: 'flex-end' }}
                >
                  {typeof value == 'number'
                    ? value.toLocaleString()
                    : String(value || '-')}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card.Content>
      </Card>
    );
  });

  return (
    <View style={{ flex: 1 }}>
      <HeaderComponent headerTitle={'Lead Report'} isBack />
      {/* Row 1: Category & Source */}
      <View style={styles.row}>
        <View style={styles.half}>
          <Text style={styles.label}>
            <Text style={styles.required}></Text>Report Type
          </Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={leadsCat}
              onValueChange={itemValue => {
                setLead_user_data([]);
                setApiPostData({
                  leadsCat: itemValue,
                  reportType: null,
                  dayType: null,
                  dateType: null,
                  startDate: null,
                  endDate: null,
                  modalType: null,
                });
              }}
              style={styles.picker}
              dropdownIconColor="#666"
            >
              {report_types.map(res => {
                return <Picker.Item label={res?.label} value={res?.value} />;
              })}
            </Picker>
          </View>
        </View>

        <View style={styles.half}>
          <Text style={styles.label}>
            <Text style={styles.required}></Text>Leads Category
          </Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={reportType}
              onValueChange={itemValue => onChangeVal('reportType', itemValue)}
              style={styles.picker}
            >
              <Picker.Item label={'Select'} value={null} />

              {[
                {
                  id: 'All',
                  leads_category: 'All Categoies',
                },
                ...leads_category,
              ]?.map(res => {
                return (
                  <Picker.Item label={res?.leads_category} value={res?.id} />
                );
              })}
            </Picker>
          </View>
        </View>
      </View>
      {/* Row 2: Category & Source */}
      {Boolean(
        leadsCat == 'LeadPerformanceSummary' ||
          leadsCat == 'LeadPerformanceSummaryBroker' ||
          leadsCat == 'LeadPerformanceSummaryCorporate' ||
          leadsCat == 'LeadPerformanceSummarySecondary',
      ) && (
        <>
          <View style={styles.row}>
            <View style={styles.half}>
              <Text style={styles.label}>
                <Text style={styles.required}></Text>Report Type
              </Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={dayType}
                  onValueChange={itemValue => onChangeVal('dayType', itemValue)}
                  style={styles.picker}
                  dropdownIconColor="#666"
                >
                  <Picker.Item label={'Select'} value={null} />
                  {[
                    {
                      id: 'Yesterday',
                      value: 'Yesterday',
                    },
                    {
                      id: 'Today',
                      value: 'Today',
                    },
                    {
                      id: 'ExactDate',
                      value: 'Exact Date',
                    },
                    {
                      id: 'DateRange',
                      value: 'Date Range',
                    },
                  ].map(res => {
                    return <Picker.Item label={res?.value} value={res?.id} />;
                  })}
                </Picker>
              </View>
            </View>

            <View style={styles.half}>
              <Text style={styles.label}>
                <Text style={styles.required}></Text>Date Type
              </Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={dateType}
                  onValueChange={itemValue =>
                    onChangeVal('dateType', itemValue)
                  }
                  style={styles.picker}
                >
                  <Picker.Item label={'Select'} value={null} />
                  {[
                    {
                      id: 'ByLeadsModifiedDate',
                      value: 'By Leads Modified Date',
                    },
                    {
                      id: 'ByLeadsCreatedDate',
                      value: 'By Leads Created Date',
                    },
                  ]?.map(res => {
                    return <Picker.Item label={res?.value} value={res?.id} />;
                  })}
                </Picker>
              </View>
            </View>
          </View>
          {Boolean(dayType == 'DateRange' || dayType == 'ExactDate') && (
            <View style={styles.row}>
              <View style={styles.half}>
                <Text style={styles.label}>Select Date</Text>
                <TextComponent
                  text={formatDateToMDY(startDate ?? currentDate)}
                  onPress={() => onChangeVal('modalType', 'startDate')}
                  styles={{
                    backgroundColor: 'white',
                    width: wp('45'),
                    height: hp('7'),
                    borderRadius: 5,
                    borderWidth: 0.7,
                    borderColor: 'black',
                    paddingTop: hp('2'),
                    paddingLeft: wp('2'),
                  }}
                  family={'400'}
                />
              </View>
              {Boolean(dayType == 'DateRange') && (
                <View style={styles.half}>
                  <Text style={styles.label}>Select Date</Text>
                  <TextComponent
                    text={formatDateToMDY(endDate ?? currentDate)}
                    onPress={() => onChangeVal('modalType', 'endDate')}
                    styles={{
                      backgroundColor: 'white',
                      width: wp('45'),
                      height: hp('7'),
                      borderRadius: 5,
                      borderWidth: 0.7,
                      borderColor: 'black',
                      paddingTop: hp('2'),
                      paddingLeft: wp('2'),
                    }}
                    family={'400'}
                  />
                </View>
              )}
            </View>
          )}
        </>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <ThemeButton
          title={'View'}
          style={{
            width: wp('45'),
            marginLeft: wp('2'),
          }}
          onPress={() => mutate()}
        />
        {add_remarks_user_data?.showModalButton == true && (
          <ThemeButton
            title={'Add Remakrs'}
            style={{
              width: wp('45'),
              marginLeft: wp('2'),
            }}
            onPress={() => setModalVisible(true)}
          />
        )}
      </View>
      {lead_user_data && (
        <FlatList
          data={lead_user_data}
          renderItem={renderItem}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      )}

      {modalType != null && (
        <DatePicker
          // mode={'datetime'}
          mode={'date'}
          open={Boolean(modalType != null)}
          date={apiPostData[modalType] ?? currentDate}
          is24hourSource="locale"
          locale="en"
          onCancel={() => onChangeVal('modalType', null)}
          modal
          onConfirm={e => {
            console.log(
              'lksdbvlksbdlkvbsdlkbvlsdblvkbsdlvbsdkvsd',
              e,
              new Date(e.getTime() + 24 * 60 * 60 * 1000),
              e.toDateString(),
            );
            onChangeVal('modalType', null);
            onChangeVal([modalType], e);
            // setSelectedDate(e);
            // setModalState(false);
          }}
        />
      )}
      {modalVisible && (
        <AddRemarksModalComp
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSave={async type => {
            await addReason.mutateAsync({
              reason: type,
            });
            mutate();
          }}
          data={add_remarks_user_data}
        />
      )}

      {/* Lead Details 1-3 */}
      {/* <View style={styles.row}>
        <View style={styles.third}>
   
        </View>
        <View style={styles.third}>
    
        </View>
        <View style={styles.third}>
       
        </View>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 20,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: wp('2'),
  },
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
  card: {
    width: width > 600 ? '48%' : '100%',
    marginBottom: 12,
    elevation: 2,
  },
  cardTitle: { fontSize: 14, fontWeight: '600', marginBottom: 8 },
  divider: { height: 1, backgroundColor: '#ddd', marginVertical: 12 },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
});
export default memo(LeadReportScreen);
