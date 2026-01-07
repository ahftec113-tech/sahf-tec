import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import React, { memo } from 'react';
import { HeaderComponent } from '../../Components/HeaderComp';
import { Picker } from '@react-native-picker/picker';
import { styles } from './styles';
import { hp, wp } from '../../Hooks/useResponsive';
import { TextComponent } from '../../Components/TextComponent';
import DatePicker from 'react-native-date-picker';
import {
  TextInput as PaperTextInput,
  Button,
  Checkbox,
} from 'react-native-paper';
import ThemeButton from '../../Components/ThemeButton';
import useAddComScreen from './useAddComScreen';
import {
  formatDateToMDY,
  getCustom12HourTime,
  getFormattedTime,
} from '../../Services/GlobalFunctions';

const AddComScreen = ({ navigation, route }) => {
  const {
    leadStatusOp,
    propertyType,
    projectName,
    propertyTypeDetail,
    stageStatusList,
    areaList,
    city,
    area,
    salesType,
  } = route?.params;
  const {
    updateValue,
    selectedLeadStatus,
    selectedProjectName,
    selectedPropertyType,
    selectedImg,
    isPersonal,
    selectedCategory,
    selectedCityList,
    selectedAreaList,
    selectedSalesType,
    selectedTransferOpt,
    setComKeys,
    noteText,
    setNoteText,
    modalValue,
    setModalValue,
    comKeys,
    selectDate,
    selectedTime,
    currentDate,
    budget,
    setBudget,
    uniteNo,
    setUniteNo,
    price,
    setPrice,
    saleRev,
    setSaleRev,
    onPress,
  } = useAddComScreen(route, navigation);
  return (
    <View>
      <HeaderComponent isBack headerTitle={'Add Communication'} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: wp('3'),
          paddingBottom: hp('10'),
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: hp('1'),
          }}
        >
          <View style={styles.half}>
            <Text style={styles.label}>
              <Text style={styles.required}>* </Text>Lead Status
            </Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedLeadStatus}
                onValueChange={itemValue =>
                  setComKeys({
                    selectedLeadStatus: itemValue,
                    selectedProjectName: null,
                    selectedPropertyType: null,
                    selectedImg: null,
                    isPersonal: false,
                    selectedCategory: null,
                    selectedAreaList: null,
                    selectedCityList: null,
                    selectedSalesType: null,
                  })
                }
                style={styles.picker}
                dropdownIconColor="#666"
              >
                <Picker.Item label="Select" value="" />
                {leadStatusOp.map(res => {
                  return <Picker.Item label={res?.label} value={res?.value} />;
                })}
              </Picker>
            </View>
          </View>
          {Boolean([10].includes(selectedLeadStatus)) && (
            <View style={styles.half}>
              <Text style={styles.label}>
                {/* <Text style={styles.required}>* </Text>Lead Status */}
              </Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedPropertyType}
                  onValueChange={itemValue =>
                    updateValue('selectedPropertyType', itemValue)
                  }
                  style={styles.picker}
                  dropdownIconColor="#666"
                >
                  <Picker.Item label="Select" value="" />
                  {propertyType.map(res => {
                    return (
                      <Picker.Item
                        label={res?.label ?? res?.project}
                        value={res?.value ?? res?.id}
                      />
                    );
                  })}
                </Picker>
              </View>
            </View>
          )}
          {Boolean([27].includes(selectedLeadStatus)) && (
            <View style={styles.half}>
              <Text style={styles.label}>
                {/* <Text style={styles.required}>* </Text>Lead Status */}
              </Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedProjectName}
                  onValueChange={itemValue =>
                    updateValue('selectedProjectName', itemValue)
                  }
                  style={styles.picker}
                  dropdownIconColor="#666"
                >
                  <Picker.Item label="Select" value="" />
                  {projectName.map(res => {
                    return (
                      <Picker.Item
                        label={res?.label ?? res?.project}
                        value={res?.value ?? res?.id}
                      />
                    );
                  })}
                </Picker>
              </View>
            </View>
          )}
        </View>
        {Boolean(['Secondary property'].includes(selectedPropertyType)) && (
          <>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: hp('1'),
              }}
            >
              <View style={styles.half}>
                <Text style={styles.label}>
                  <Text style={styles.required}>* </Text>City
                </Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedCityList}
                    onValueChange={itemValue =>
                      updateValue('selectedCityList', itemValue)
                    }
                    style={styles.picker}
                    dropdownIconColor="#666"
                  >
                    <Picker.Item label="Select" value="" />
                    {city.map(res => {
                      return (
                        <Picker.Item label={res?.label} value={res?.value} />
                      );
                    })}
                  </Picker>
                </View>
              </View>
              <View style={styles.half}>
                <Text style={styles.label}>
                  <Text style={styles.required}>* </Text>Area
                </Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedAreaList}
                    onValueChange={itemValue =>
                      updateValue('selectedAreaList', itemValue)
                    }
                    style={styles.picker}
                    dropdownIconColor="#666"
                  >
                    <Picker.Item label="Select" value="" />
                    {area.map(res => {
                      return (
                        selectedCityList == res?.city_name && (
                          <Picker.Item label={res?.label} value={res?.value} />
                        )
                      );
                    })}
                  </Picker>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: hp('1'),
              }}
            >
              <View style={styles.half}>
                <Text style={styles.label}>
                  <Text style={styles.required}>* </Text>Type
                </Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedSalesType}
                    onValueChange={itemValue =>
                      updateValue('selectedSalesType', itemValue)
                    }
                    style={styles.picker}
                    dropdownIconColor="#666"
                  >
                    {salesType.map(res => {
                      return (
                        <Picker.Item label={res?.label} value={res?.value} />
                      );
                    })}
                  </Picker>
                </View>
              </View>
              <View style={styles.half}>
                <Text style={styles.label}>
                  <Text style={styles.required}>* </Text>Category
                </Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedCategory}
                    onValueChange={itemValue =>
                      updateValue('selectedCategory', itemValue)
                    }
                    style={styles.picker}
                    dropdownIconColor="#666"
                  >
                    <Picker.Item label="Select" value="" />
                    {propertyTypeDetail.map(res => {
                      return (
                        <Picker.Item
                          label={`${res?.type} > ${res?.name}`}
                          value={res?.id}
                        />
                      );
                    })}
                  </Picker>
                </View>
              </View>
            </View>
            <View style={styles.half}>
              <Text style={styles.label}>Budget</Text>
              <PaperTextInput
                mode="outlined"
                value={budget}
                onChangeText={setBudget}
                keyboardType="numeric"
                dense
              />
            </View>
          </>
        )}
        {Boolean([1, 5, 3, 10, 9, 30].includes(selectedLeadStatus)) && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: hp('1'),
            }}
          >
            <View style={styles.half}>
              <Text style={styles.label}>Select Date</Text>
              <TextComponent
                // text={selectDate ?? '2313513115'}
                text={formatDateToMDY(selectDate ?? currentDate)}
                onPress={() => setModalValue('selectDate')}
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
            <View style={styles.half}>
              <Text style={styles.label}>Select Time</Text>
              <TextComponent
                // text={'2313513115'}
                text={getCustom12HourTime(selectedTime ?? currentDate)}
                onPress={() => setModalValue('selectedTime')}
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
          </View>
        )}
        {Boolean([27].includes(selectedLeadStatus)) && (
          <>
            <Pressable
              style={{
                width: wp('94'),
                height: hp('18'),
                borderRadius: 10,
                borderWidth: 0.5,
                backgroundColor: 'white',
                marginTop: hp('1'),
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              {selectedImg ? (
                <Image
                  source={{
                    uri: selectedImg?.uri,
                  }}
                  resizeMode="cover"
                  style={{ flex: 1, overflow: 'hidden' }}
                />
              ) : (
                <TextComponent
                  text={'Choose file'}
                  styles={{ textAlign: 'center', textAlignVertical: 'center' }}
                  family={'400'}
                />
              )}
            </Pressable>
            <View style={{ ...styles.row, marginTop: hp('1') }}>
              <View style={styles.half}>
                <Text style={styles.label}> Project Price</Text>
                <PaperTextInput
                  mode="outlined"
                  value={price}
                  onChangeText={setPrice}
                  dense
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.half}>
                <Text style={styles.label}>Sale Revenue</Text>
                <PaperTextInput
                  mode="outlined"
                  value={saleRev}
                  onChangeText={setSaleRev}
                  keyboardType="numeric"
                  dense
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.half}>
                <Text style={styles.label}>Unite No</Text>
                <PaperTextInput
                  mode="outlined"
                  value={uniteNo}
                  onChangeText={setUniteNo}
                  dense
                />
              </View>
              <View style={styles.half}>
                <Text style={styles.label}>Tower</Text>
                <PaperTextInput
                  mode="outlined"
                  // value={email}
                  // onChangeText={setEmail}
                  keyboardType="email-address"
                  dense
                />
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Checkbox
                status={isPersonal ? 'checked' : 'unchecked'}
                onPress={() => updateValue('isPersonal', !isPersonal)}
              />
              <TextComponent text={'Is Personal'} family={'400'} />
            </View>
            {/* Add check Box here */}
          </>
        )}

        {Boolean([4].includes(selectedLeadStatus)) && (
          <View style={{ ...styles.half, marginTop: hp('1') }}>
            <Text style={styles.label}>
              <Text style={styles.required}>* </Text>Transfer Options
            </Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedTransferOpt}
                onValueChange={itemValue =>
                  updateValue('selectedTransferOpt', itemValue)
                }
                style={styles.picker}
                dropdownIconColor="#666"
              >
                <Picker.Item label="Select" value="" />
                {[
                  {
                    id: 1,
                    value: 'Lahore client',
                  },
                  {
                    id: 2,
                    value: 'Punjab client',
                  },
                  {
                    id: 3,
                    value: 'Islamabad client',
                  },
                  {
                    id: 4,
                    value: 'Kpk client',
                  },
                ].map(res => {
                  return <Picker.Item label={res?.value} value={res?.id} />;
                })}
              </Picker>
            </View>
          </View>
        )}

        <TextInput
          style={styles.noteInput}
          placeholder="Write your detail here..."
          placeholderTextColor="#999"
          multiline
          numberOfLines={6}
          value={noteText}
          onChangeText={setNoteText}
        />
        <ThemeButton
          title={'Save'}
          style={{
            marginTop: hp('3'),
            width: wp('80'),
            alignSelf: 'center',
            height: hp('7'),
          }}
          onPress={onPress}
        />
      </ScrollView>
      {modalValue != null && (
        <DatePicker
          // mode={'datetime'}
          mode={
            (modalValue == 'selectDate' && 'date') ||
            (modalValue == 'selectedTime' && 'time')
          }
          open={true}
          date={comKeys[modalValue] ?? currentDate}
          is24hourSource="locale"
          locale="en"
          onCancel={() => setModalValue(null)}
          modal
          onConfirm={e => {
            console.log(
              'lksdbvlksbdlkvbsdlkbvlsdblvkbsdlvbsdkvsd',
              e,
              new Date(e.getTime() + 24 * 60 * 60 * 1000),
              e.toDateString(),
            );
            updateValue(modalValue, e);
            setModalValue(null);
          }}
        />
      )}
    </View>
  );
};

export default memo(AddComScreen);
