// src/screens/LeadFilterScreen/index.js
import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  Dimensions,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useLeadFilterScreen } from './useLeadFilterScreen';
import styles from './styles';
import { hp } from '../../Hooks/useResponsive';
import DatePicker from 'react-native-date-picker';
import { formatDateToMDY } from '../../Services/GlobalFunctions';
import { Touchable } from '../../Components/Touchable';
import { HeaderComponent } from '../../Components/HeaderComp';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const CustomCheckbox = ({ checked, onPress, label }) => (
  <TouchableOpacity style={styles.checkboxRow} onPress={onPress}>
    <Icon
      name={checked ? 'check-box' : 'check-box-outline-blank'}
      size={20}
      color={checked ? '#2196F3' : '#999'}
    />
    <Text style={styles.checkboxLabel}>{label}</Text>
  </TouchableOpacity>
);

const CustomRadio = ({ selected, onPress, label }) => (
  <TouchableOpacity style={styles.radioRow} onPress={onPress}>
    <Icon
      name={selected ? 'radio-button-checked' : 'radio-button-unchecked'}
      size={20}
      color={selected ? '#2196F3' : '#999'}
    />
    <Text style={styles.checkboxLabel}>{label}</Text>
  </TouchableOpacity>
);

const MultiSelectModal = ({
  visible,
  onClose,
  title,
  items,
  selectedValues,
  onToggle,
  searchPlaceholder = 'Search...',
  isMulti,
}) => {
  const [search, setSearch] = useState('');

  const filteredItems = items.filter(item =>
    item.label.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.modalSearch}
            placeholder={searchPlaceholder}
            value={search}
            onChangeText={setSearch}
            autoCapitalize="none"
            placeholderTextColor={'gray'}
          />

          <FlatList
            data={filteredItems}
            keyExtractor={item => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => onToggle(item)}
              >
                <Icon
                  name={
                    isMulti
                      ? selectedValues.find(res => res?.value == item.value)
                        ? 'check-circle'
                        : 'circle'
                      : selectedValues?.value == item?.value
                      ? 'check-circle'
                      : 'circle'
                  }
                  size={24}
                  color={
                    isMulti
                      ? selectedValues.find(res => res?.value == item.value)
                        ? '#2196F3'
                        : '#999'
                      : selectedValues?.value == item?.value
                      ? '#2196F3'
                      : '#999'
                  }
                />
                <Text style={styles.modalItemText}>{item.label}</Text>
              </TouchableOpacity>
            )}
            style={{ flex: 1 }}
          />
        </View>
      </View>
    </Modal>
  );
};

const LeadFilterScreen = ({ navigation, route }) => {
  const {
    filters,
    updateFilter,
    toggleSystemDefined,
    setSorting,
    applyFilters,
    resetFilters,
    actionApi,
    agentWiseApi,
    dateStatusWiseApi,
    sortingApi,
    sourceApi,
    statusWiseApi,
    userWiseApi,
    modalState,
    setModalState,
    currentDate,
    createdAtDateRangeOptions,
    dateWiseChild,
  } = useLeadFilterScreen(navigation, route);

  // Modal states
  const [modalVisible, setModalVisible] = useState({
    source: false,
    agentWise: false,
    userWise: false,
    statusWise: false,
    dateStatusWise: false,
    action: false,
    dateWiseChild: false,
    createdAtDateOptions: false,
  });

  const openModal = key => {
    setModalVisible(prev => ({ ...prev, [key]: true }));
  };

  const closeModal = key => {
    setModalVisible(prev => ({ ...prev, [key]: false }));
  };

  const toggleFilter = (key, value) => {
    updateFilter(
      key,
      filters[key].find(res => res?.value == value?.value)
        ? filters[key].filter(v => v?.value != value?.value)
        : [...filters[key], value],
    );
  };

  const renderChips = (values, apiData, key) => {
    return (
      <View style={styles.chipContainer}>
        {values.map((value, index) => {
          const item = apiData.find(i => i.value == value?.value);
          if (!item) return null;
          return (
            <View key={index} style={styles.chip}>
              <Text style={styles.chipText}>{item?.label}</Text>
              <TouchableOpacity onPress={() => toggleFilter(key, value)}>
                <Icon name="close" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderComponent isBack headerTitle={'Filters'} />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Source */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Source</Text>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => openModal('source')}
          >
            <Text style={styles.selectButtonText}>
              {filters.source.length > 0
                ? `${filters.source.length} selected`
                : 'Select Source'}
            </Text>
            <Icon name="arrow-drop-down" size={24} color="#666" />
          </TouchableOpacity>
          {filters.source.length > 0 &&
            renderChips(filters.source, sourceApi, 'source')}
        </View>

        {/* System Defined Filter */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System Defined Filter</Text>
          <CustomCheckbox
            checked={filters.systemDefined == 'NewLeads'}
            onPress={() => updateFilter('systemDefined', 'NewLeads')}
            label="New Leads"
          />
          <CustomCheckbox
            checked={filters.systemDefined == 'TouchedLeads'}
            onPress={() => updateFilter('systemDefined', 'TouchedLeads')}
            label="Touched Leads"
          />
          <CustomCheckbox
            checked={filters.systemDefined == 'UntouchedLeads'}
            onPress={() => updateFilter('systemDefined', 'UntouchedLeads')}
            label="Untouched Leads"
          />
        </View>

        {/* Agent Wise */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Agent Wise Filter</Text>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => openModal('agentWise')}
          >
            <Text style={styles.selectButtonText}>
              {filters.agentWise.length > 0
                ? `${filters.agentWise.length} selected`
                : 'Select Agents'}
            </Text>
            <Icon name="arrow-drop-down" size={24} color="#666" />
          </TouchableOpacity>
          {filters.agentWise.length > 0 &&
            renderChips(filters.agentWise, agentWiseApi, 'agentWise')}
        </View>

        {/* User Wise */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>User Wise Filter</Text>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => openModal('userWise')}
          >
            <Text style={styles.selectButtonText}>
              {filters.userWise.length > 0
                ? `${filters.userWise.length} selected`
                : 'Select Users'}
            </Text>
            <Icon name="arrow-drop-down" size={24} color="#666" />
          </TouchableOpacity>
          {filters.userWise.length > 0 &&
            renderChips(filters.userWise, userWiseApi, 'userWise')}
        </View>

        {/* Status Wise */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Status Wise Filter</Text>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => openModal('statusWise')}
          >
            <Text style={styles.selectButtonText}>
              {filters.statusWise.length > 0
                ? `${filters.statusWise.length} selected`
                : 'Select Status'}
            </Text>
            <Icon name="arrow-drop-down" size={24} color="#666" />
          </TouchableOpacity>
          {filters.statusWise.length > 0 &&
            renderChips(filters.statusWise, statusWiseApi, 'statusWise')}
        </View>

        {/* Date + Status Wise */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Date + Status Wise Filter</Text>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => openModal('dateStatusWise')}
          >
            <Text style={styles.selectButtonText}>
              {filters.dateStatusWise
                ? `${filters?.dateStatusWise?.label}`
                : 'Select Date + Status'}
            </Text>
            <Icon name="arrow-drop-down" size={24} color="#666" />
          </TouchableOpacity>
          {filters?.dateStatusWise?.label && (
            <>
              <TouchableOpacity
                style={{ ...styles.selectButton, marginTop: hp('2') }}
                onPress={() => openModal('dateWiseChild')}
              >
                <Text style={styles.selectButtonText}>
                  {filters.dateWiseChild
                    ? `${filters?.dateWiseChild?.label}`
                    : 'Select Action'}
                </Text>
                <Icon name="arrow-drop-down" size={24} color="#666" />
              </TouchableOpacity>

              {(filters?.dateWiseChild?.value == 'ExactDate' ||
                filters?.dateWiseChild?.value == 'DateRange') && (
                <>
                  <Text
                    style={{ ...styles.dateInput, marginTop: hp('2') }}
                    onPress={() => setModalState('dateStatusWiseFromDate')}
                  >
                    {formatDateToMDY(
                      filters.dateStatusWiseFromDate ?? currentDate,
                    )}
                  </Text>
                  {filters?.dateWiseChild?.value == 'DateRange' && (
                    <Text
                      style={{ ...styles.dateInput }}
                      onPress={() => setModalState('dateStatusWiseToDate')}
                    >
                      {formatDateToMDY(
                        filters.dateStatusWiseToDate ?? currentDate,
                      )}
                    </Text>
                  )}
                </>
              )}
            </>
          )}
        </View>

        {/* Action */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Action Filter</Text>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => openModal('action')}
          >
            <Text style={styles.selectButtonText}>
              {filters.action ? `${filters?.action?.label}` : 'Select Action'}
            </Text>
            <Icon name="arrow-drop-down" size={24} color="#666" />
          </TouchableOpacity>
          {filters?.action?.label == 'Date Range' && (
            <>
              <Text
                style={{ ...styles.dateInput, marginTop: hp('2') }}
                onPress={() => setModalState('actionFromDate')}
              >
                {formatDateToMDY(filters.actionFromDate ?? currentDate)}
              </Text>
              <Text
                style={{ ...styles.dateInput }}
                onPress={() => setModalState('actionToDate')}
              >
                {formatDateToMDY(filters.actionToDate ?? currentDate)}
              </Text>
            </>
          )}
        </View>

        {/* Lead Created/Modified At */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lead Created/Modified At</Text>
          <View style={styles.radioGroup}>
            <CustomRadio
              selected={filters.createdModified === 'Created Date'}
              onPress={() => updateFilter('createdModified', 'Created Date')}
              label="Created Date"
            />
            <CustomRadio
              selected={filters.createdModified === 'Modified Date'}
              onPress={() => updateFilter('createdModified', 'Modified Date')}
              label="Modified Date"
            />
          </View>

          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => openModal('createdAtDateOptions')}
          >
            <Text style={styles.selectButtonText}>
              {filters.createdAtDateOptions
                ? `${filters?.createdAtDateOptions?.label}`
                : 'Select'}
            </Text>
            <Icon name="arrow-drop-down" size={24} color="#666" />
          </TouchableOpacity>
          {(filters?.createdAtDateOptions?.value == 'ExactDate' ||
            filters?.createdAtDateOptions?.value == 'DataRange') && (
            <>
              <Text
                style={{ ...styles.dateInput, marginTop: hp('2') }}
                onPress={() => setModalState('leadCreatedAtFromDate')}
              >
                {formatDateToMDY(filters.leadCreatedAtFromDate ?? currentDate)}
              </Text>
              {filters?.createdAtDateOptions?.value == 'DataRange' && (
                <Text
                  style={{ ...styles.dateInput }}
                  onPress={() => setModalState('leadCreatedAtToDate')}
                >
                  {formatDateToMDY(filters.leadCreatedAtToDate ?? currentDate)}
                </Text>
              )}
            </>
          )}
        </View>

        {/* Follow Up Date */}
        <View
          style={styles.section}
          onPress={() => setModalState('followUpdate')}
        >
          <Text style={styles.sectionTitle}>Follow Up Date</Text>
          <Text
            style={styles.dateInput}
            onPress={() => setModalState('followUpdate')}
          >
            {formatDateToMDY(filters.followUpdate ?? currentDate)}
          </Text>
        </View>

        {/* Sorting */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sorting</Text>
          {sortingApi?.fields?.map(field => (
            <View key={field.value} style={styles.sortingRow}>
              <CustomCheckbox
                checked={filters.sorting.field === field.value}
                onPress={() => setSorting(field.value, filters.sorting.order)}
                label={field.label}
              />
              {filters.sorting.field === field.value && (
                <View style={{ flexDirection: 'row', marginLeft: 16 }}>
                  <CustomRadio
                    selected={filters.sorting.order === 'ASC'}
                    onPress={() => setSorting(field.value, 'ASC')}
                    label="ASC"
                  />
                  <CustomRadio
                    selected={filters.sorting.order === 'DESC'}
                    onPress={() => setSorting(field.value, 'DESC')}
                    label="DESC"
                  />
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.applyBtn} onPress={applyFilters}>
            <Text style={styles.btnText}>Apply Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resetBtn} onPress={resetFilters}>
            <Text style={[styles.btnText, styles.resetText]}>Reset</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modals */}
      <MultiSelectModal
        visible={modalVisible.source}
        onClose={() => closeModal('source')}
        title="Select Source"
        items={sourceApi}
        selectedValues={filters.source}
        // onToggle={value => console.log('source', value)}
        onToggle={value => toggleFilter('source', value)}
        isMulti
      />

      <MultiSelectModal
        visible={modalVisible.agentWise}
        onClose={() => closeModal('agentWise')}
        title="Select Agents"
        items={agentWiseApi}
        selectedValues={filters.agentWise}
        onToggle={value => toggleFilter('agentWise', value)}
        isMulti
      />

      <MultiSelectModal
        visible={modalVisible.userWise}
        onClose={() => closeModal('userWise')}
        title="Select Users"
        items={userWiseApi}
        selectedValues={filters.userWise}
        onToggle={value => toggleFilter('userWise', value)}
        isMulti
      />

      <MultiSelectModal
        visible={modalVisible.statusWise}
        onClose={() => closeModal('statusWise')}
        title="Select Status"
        items={statusWiseApi}
        selectedValues={filters.statusWise}
        onToggle={value => toggleFilter('statusWise', value)}
        isMulti
      />

      <MultiSelectModal
        visible={modalVisible.dateStatusWise}
        onClose={() => closeModal('dateStatusWise')}
        title="Select Date + Status"
        items={dateStatusWiseApi}
        selectedValues={filters.dateStatusWise}
        onToggle={value => {
          updateFilter('dateStatusWise', value);
          updateFilter('action', null);
          updateFilter('dateWiseChild', null);
          closeModal('dateStatusWise');
        }}
      />

      <MultiSelectModal
        visible={modalVisible.dateWiseChild}
        onClose={() => closeModal('dateWiseChild')}
        title="Select Action"
        items={dateWiseChild}
        selectedValues={filters.dateWiseChild}
        onToggle={value => {
          updateFilter('dateWiseChild', value);
          closeModal('dateWiseChild');
        }}
      />
      <MultiSelectModal
        visible={modalVisible.createdAtDateOptions}
        onClose={() => closeModal('createdAtDateOptions')}
        title="Select"
        items={createdAtDateRangeOptions}
        selectedValues={filters.createdAtDateOptions}
        onToggle={value => {
          updateFilter('createdAtDateOptions', value);
          closeModal('createdAtDateOptions');
        }}
      />
      <MultiSelectModal
        visible={modalVisible.action}
        onClose={() => closeModal('action')}
        title="Select Action"
        items={actionApi}
        selectedValues={filters.action}
        onToggle={value => {
          updateFilter('dateStatusWise', null);
          updateFilter('action', value);
          updateFilter('dateWiseChild', null);
          closeModal('action');
        }}
      />
      {modalState != null && (
        <DatePicker
          // mode={'datetime'}
          mode={'date'}
          open={true}
          date={filters[modalState] ?? currentDate}
          is24hourSource="locale"
          locale="en"
          onCancel={() => setModalState(null)}
          modal
          onConfirm={e => {
            console.log(
              'lksdbvlksbdlkvbsdlkbvlsdblvkbsdlvbsdkvsd',
              e,
              new Date(e.getTime() + 24 * 60 * 60 * 1000),
              e.toDateString(),
            );
            updateFilter(modalState, e);
            setModalState(null);
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default LeadFilterScreen;
