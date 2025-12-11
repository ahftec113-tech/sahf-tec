import React, { memo, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import useAddLeadScreen from './useAddLeadsScreen';
import { errorMessage } from '../../Config/NotificationMessage';
import DatePicker from 'react-native-date-picker';
import { formatDateToMDY } from '../../Services/GlobalFunctions';
import { TextComponent } from '../../Components/TextComponent';
import { hp, wp } from '../../Hooks/useResponsive';

const AddLeadsScreen = ({ navigation }) => {
  const {
    userData,
    token,
    category,
    setCategory,
    source,
    setSource,
    campaignName,
    setCampaignName,
    leadDetail1,
    setLeadDetail1,
    leadDetail2,
    setLeadDetail2,
    leadDetail3,
    setLeadDetail3,
    leadDetail4,
    setLeadDetail4,
    fullName,
    setFullName,
    email,
    setEmail,
    mobile,
    setMobile,
    website,
    setWebsite,
    remarks,
    setRemarks,
    assignTo,
    setAssignTo,
    rating,
    setRating,
    status,
    setStatus,
    mutateAsync,
    assignToUserArry,
    souceArry,
    statusArry,
    categoryArry,
    checkNum,
    otherText,
    setOtherText,
    modalState,
    setModalState,
    selectedDate,
    setSelectedDate,
    currentDate,
  } = useAddLeadScreen(navigation);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Leads</Text>

      {/* Row 1: Category & Source */}
      <View style={styles.row}>
        <View style={styles.half}>
          <Text style={styles.label}>
            <Text style={styles.required}>* </Text>Category
          </Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={category}
              onValueChange={itemValue => setCategory(itemValue)}
              style={styles.picker}
              dropdownIconColor="#666"
            >
              <Picker.Item label="Select" value="" />
              {categoryArry.map(res => {
                return (
                  <Picker.Item label={res?.leads_category} value={res?.id} />
                );
              })}
            </Picker>
          </View>
        </View>

        <View style={styles.half}>
          <Text style={styles.label}>
            <Text style={styles.required}>* </Text>Source
          </Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={source}
              onValueChange={(itemValue, index) => {
                setSource(itemValue);
                setCampaignName(souceArry[index - 1]?.source_name);
              }}
              style={styles.picker}
            >
              <Picker.Item label="Select" value="" />
              {[
                ...souceArry,
                {
                  source_name: 'Other',
                  id: 'Other',
                },
              ]?.map(res => {
                return <Picker.Item label={res?.source_name} value={res?.id} />;
              })}
            </Picker>
          </View>
        </View>
      </View>
      {source == 'Other' && (
        <View style={styles.row}>
          <View style={styles.full}>
            <TextInput
              mode="outlined"
              value={otherText}
              onChangeText={setOtherText}
              multiline
            />
          </View>
        </View>
      )}

      {/* Lead Details 1-3 */}
      <View style={styles.row}>
        <View style={styles.third}>
          <Text style={styles.label}>Lead Detail 1</Text>
          <TextInput
            mode="outlined"
            value={leadDetail1}
            onChangeText={setLeadDetail1}
            dense
          />
        </View>
        <View style={styles.third}>
          <Text style={styles.label}>Lead Detail 2</Text>
          <TextInput
            mode="outlined"
            value={leadDetail2}
            onChangeText={setLeadDetail2}
            dense
          />
        </View>
        <View style={styles.third}>
          <Text style={styles.label}>Lead Detail 3</Text>
          <TextInput
            mode="outlined"
            value={leadDetail3}
            onChangeText={setLeadDetail3}
            dense
          />
        </View>
      </View>

      {/* Lead Detail 4 & Full Name */}
      <View style={styles.row}>
        <View style={styles.half}>
          <Text style={styles.label}>Lead Detail 4</Text>
          <TextInput
            mode="outlined"
            value={leadDetail4}
            onChangeText={setLeadDetail4}
            dense
          />
        </View>
        <View style={styles.half}>
          <Text style={styles.label}>
            <Text style={styles.required}>* </Text>Leads Full Name
          </Text>
          <TextInput
            mode="outlined"
            value={fullName}
            onChangeText={setFullName}
            dense
          />
        </View>
      </View>

      {/* Campaign Name & Email */}
      <View style={styles.row}>
        <View style={styles.half}>
          <Text style={styles.label}>Campaign Name</Text>
          <TextInput
            mode="outlined"
            value={campaignName}
            onChangeText={setCampaignName}
            dense
          />
        </View>
        <View style={styles.half}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            mode="outlined"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            dense
          />
        </View>
      </View>

      {/* Mobile & Website */}
      <View style={styles.row}>
        <View style={styles.half}>
          <Text style={styles.label}>
            <Text style={styles.required}>* </Text>Mobile
          </Text>
          <TextInput
            mode="outlined"
            value={mobile}
            onChangeText={setMobile}
            keyboardType="phone-pad"
            dense
          />
          <TouchableOpacity
            style={styles.checkButton}
            onPress={() => checkNum.mutate()}
          >
            <Text style={styles.checkText}>check</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.half}>
          <Text style={styles.label}>Website</Text>
          <TextInput
            mode="outlined"
            value={website}
            onChangeText={setWebsite}
            dense
          />
        </View>
      </View>

      {/* Remarks */}
      <View style={styles.row}>
        <View style={styles.full}>
          <Text style={styles.label}>Remarks</Text>
          <TextInput
            mode="outlined"
            value={remarks}
            onChangeText={setRemarks}
            multiline
          />
        </View>
      </View>

      {/* Assign To & Rating */}
      <View style={styles.row}>
        <View style={styles.half}>
          <Text style={styles.label}>
            <Text style={styles.required}>* </Text>Assign To
          </Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={assignTo}
              onValueChange={itemValue => setAssignTo(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select" value="" />
              {assignToUserArry?.map(res => {
                return <Picker.Item label={res?.fullName} value={res?.id} />;
              })}
            </Picker>
          </View>
        </View>

        <View style={styles.half}>
          <Text style={styles.label}>Select Rating: Star</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={rating}
              onValueChange={itemValue => setRating(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Hot" value="Hot" />
              <Picker.Item label="Medium" value="Medium" />
              <Picker.Item label="Cold" value="Cold" />
            </Picker>
          </View>
        </View>
      </View>

      {/* Status */}
      <View style={styles.row}>
        <View style={styles.half}>
          <Text style={styles.label}>
            <Text style={styles.required}>* </Text>Select Status
          </Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={status}
              onValueChange={itemValue => setStatus(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select" value="" />
              {statusArry?.map(res => {
                return <Picker.Item label={res?.name} value={res?.id} />;
              })}
            </Picker>
          </View>
        </View>
        {Boolean(
          status == 1 ||
            status == 5 ||
            status == 3 ||
            status == 3 ||
            status == 10 ||
            status == 9,
        ) && (
          <View style={styles.half}>
            <Text style={styles.label}>Select Date</Text>
            <TextComponent
              text={formatDateToMDY(selectedDate ?? currentDate)}
              onPress={() => setModalState(true)}
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

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <Button
          mode="contained"
          onPress={() => {
            if (
              category != null &&
              source != null &&
              fullName != null &&
              mobile != null &&
              assignTo != null &&
              status != null
            ) {
              mutateAsync({
                addlead: 'add_lead',
                allowtoEntCrmSctino: userData?.id,
                LeadIndividual_Source: source,
                LeadIndividual_Category: category,
                LeadIndividual_CampaignName: campaignName,
                LeadIndividual_LeadDetail1: leadDetail1,
                LeadIndividual_LeadDetail2: leadDetail2,
                LeadIndividual_LeadDetail3: leadDetail3,
                LeadIndividual_LeadDetail4: leadDetail4,
                LeadIndividual_LeadsFullName: fullName,
                LeadIndividual_Email: email,
                LeadIndividual_Mobile: mobile,
                LeadIndividual_Website: website,
                LeadIndividual_JobType: status,
                LeadIndividual_AssignUserID: assignTo,
                LeadIndividual_showIndidivualSrcOther: otherText,
                LeadIndividual_LeadIndividual_Rating: rating,
                LeadIndividual_LeadIndividual_selectStatus: status,
                LeadIndividual_LeadIndividual_selectStatus_date: selectedDate,
                rqst_ke_fntn_vl: `usr_lg_attempt`,
                userLoginToken: token,
                userLoginIDC: userData?.id,
                crm_software_clients_id: userData?.crm_software_clients_id,
              });
            } else errorMessage('Please fill the required fields');
          }}
          style={styles.createBtn}
        >
          Create
        </Button>
        <Button mode="outlined" onPress={() => console.log('Close')}>
          Close
        </Button>
      </View>
      {modalState && (
        <DatePicker
          // mode={'datetime'}
          mode={'date'}
          open={true}
          date={selectedDate ?? currentDate}
          is24hourSource="locale"
          locale="en"
          onCancel={() => setModalState(false)}
          modal
          onConfirm={e => {
            console.log(
              'lksdbvlksbdlkvbsdlkbvlsdblvkbsdlvbsdkvsd',
              e,
              new Date(e.getTime() + 24 * 60 * 60 * 1000),
              e.toDateString(),
            );
            setSelectedDate(e);
            setModalState(false);
          }}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#f5f5f5' },
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
  checkButton: {
    marginTop: 8,
    backgroundColor: '#1976d2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  checkText: { color: '#fff', fontWeight: 'bold' },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  createBtn: { backgroundColor: '#1976d2', paddingHorizontal: 30 },
});

export default memo(AddLeadsScreen);
