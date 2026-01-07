// src/screens/LeadListScreen/index.js
import React, { memo, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons'; // install: npm i react-native-vector-icons
import styles from './styles';
import useLeadListScreen from './useLeadListScreen';
import { Checkbox } from 'react-native-paper';
import NavigationService from '../../Services/NavigationService';
import { hp } from '../../Hooks/useResponsive';
import PaginatedNumComp from '../../Components/PaginatedNumComp';
import { HeaderComponent } from '../../Components/HeaderComp';
import { getIdsFromArry } from '../../Services/GlobalFunctions';

const LeadListScreen = ({ navigation, route }) => {
  const {
    leads,
    loading,
    total,
    onRefresh,
    onEndReached,
    page,
    totalPages,
    mutate,
  } = useLeadListScreen(route);

  // ---------- Simple filter UI (mirrors screenshot) ----------
  const [selectAll, setSelectAll] = useState(false);
  const [nameFilter, setNameFilter] = useState('All');
  const [mobileFilter, setMobileFilter] = useState('All');
  const [mobile2Filter, setMobile2Filter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const renderHeader = () => {
    return (
      <>
        {/* Top action buttons */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() =>
              NavigationService.navigate('LeadFilterScreen', {
                leadType: route?.params?.leadType,
                url: route?.params?.url,
                afterFilterSelect: e => {
                  console.log('eeeeeeeeeeeeeeeeeeeeeeeeee', e);
                  mutate({
                    LDFltr_leadDetailShowByFilter: 'leadDetailShowByFilter',
                    leadDetailShowByFilter: '',
                    LDFltr_radioFilter: e?.systemDefined,
                    LDFltr_radioFilterSorting: '',
                    // LDFltr_radioFilterSorting: e?.sorting?.field,
                    LDFltr_LeadStatusFilter: getIdsFromArry(
                      e?.statusWise,
                      'value',
                    ),
                    LDFltr_sourceFilter: getIdsFromArry(e?.source, 'value'),

                    LDFltr_radioFilterSortingOrdering: e?.sorting?.order,
                    LDFltr_userWiseFilter: getIdsFromArry(e?.userWise, 'value'),
                    LDFltr_userWiseFilterAgent: getIdsFromArry(
                      e?.agentWise,
                      'value',
                    ),
                    LDFltr_perPage: 10,
                    LDFltr_FollowUpDateFilter: '',
                    // LDFltr_FollowUpDateFilter: e?.followUpdate,

                    LDFltr_selectedCagerory:
                      route?.params?.selectedLeadsCategory,
                    LDFltr_LeadCtdMDFDateOpt: '',
                    // LDFltr_LeadCtdMDFDateOpt: e?.leadCreatedAtFromDate,
                    LDFltr_fltrNeRcmndMinVal: 0,
                    LDFltr_fltrNeRcmndMaxVal: 0,
                    LDFltr_LeadStatusFilterDate: '',
                    LDFltr_LeadStatusFilterDateSlab: '',
                    LDFltr_LeadStatusFilterDateSlabStartDate: '',
                    LDFltr_LeadStatusFilterDateSlabEndDate: '',
                    LDFltr_ActionFilter: '',
                    LDFltr_ActionFilterDateVal: '',
                    LDFltr_ActionFilterDateValEnd: '',
                    LDFltr_LeadCreatedAt: '',
                    LDFltr_LeadCreatedAtSTDate: '',
                    LDFltr_LeadCreatedAtENDate: '',
                    LDFltr_viewChangeOnLead: '',
                    // goingToAddNewLeadChatDetail: 'goingToAddNewLeadChatDetail',
                  });
                },
              })
            }
          >
            <Icon name="refresh" size={16} color="#fff" />
            <Text style={styles.headerBtnText}>Filter</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() =>
              NavigationService.navigate('AddLeadsScreen', {
                url: route?.params?.url,
              })
            }
          >
            <Icon name="person-add" size={16} color="#fff" />
            <Text style={styles.headerBtnText}>Lead +</Text>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.filterRow}>
          <View style={styles.filterPicker}>
            <Picker
              selectedValue={selectAll}
              onValueChange={setSelectAll}
              style={{ height: 36 }}
              itemStyle={{ fontSize: 13 }}
              dropdownIconColor={'black'}
            >
              <Picker.Item label="Select All" value={false} />
              <Picker.Item label="Select All" value={true} />
            </Picker>
          </View>

          <View style={styles.filterPicker}>
            <Picker
              selectedValue={nameFilter}
              onValueChange={setNameFilter}
              dropdownIconColor={'black'}
            >
              <Picker.Item label="All" value="All" />
            </Picker>
          </View>

          <View style={styles.filterPicker}>
            <Picker
              selectedValue={mobileFilter}
              onValueChange={setMobileFilter}
              dropdownIconColor={'black'}
            >
              <Picker.Item label="All" value="All" />
            </Picker>
          </View>

          <View style={styles.filterPicker}>
            <Picker
              selectedValue={mobile2Filter}
              onValueChange={setMobile2Filter}
              dropdownIconColor={'black'}
            >
              <Picker.Item label="All" value="All" />
            </Picker>
          </View>

          <View style={styles.filterPicker}>
            <Picker
              selectedValue={statusFilter}
              onValueChange={setStatusFilter}
              dropdownIconColor={'black'}
            >
              <Picker.Item label="All" value="All" />
            </Picker>
          </View>

          <TouchableOpacity
            style={{ justifyContent: 'center', paddingHorizontal: 6 }}
          >
            <Icon name="keyboard-return" size={20} color="#555" />
          </TouchableOpacity>
        </View> */}

        {/* Table header */}
        <View style={styles.tableHeader}>
          {/* <View style={styles.colCheckbox}>
            <Checkbox value={false} onValueChange={() => {}} />
          </View> */}
          <View style={styles.colName}>
            <Text style={styles.headerText}>Name</Text>
          </View>
          <View style={styles.colMobile}>
            <Text style={styles.headerText}>Mobile</Text>
          </View>
          <View style={styles.colMobile2}>
            <Text style={styles.headerText}>Mobile 2</Text>
          </View>
          <View style={styles.colStatus}>
            <Text style={styles.headerText}>Status</Text>
          </View>
          <View style={styles.colReturn} />
        </View>
      </>
    );
  };

  const renderItem = ({ item }) => {
    if (!item) return null; // safety

    return (
      <View style={styles.row}>
        {/* <View style={styles.colCheckbox}>
          <Checkbox value={false} onValueChange={() => {}} />
        </View> */}
        <View style={styles.colName}>
          <Text
            style={{ ...styles.cellText, color: 'blue' }}
            onPress={() =>
              navigation.navigate('LeadDetailScreen', {
                id: item?.id,
                url: route?.params?.url,
                leadDetailType: route?.params?.leadDetailType,
              })
            }
          >
            {item.leads_full_name || '—'}
          </Text>
        </View>
        <View style={styles.colMobile}>
          <Text style={styles.cellText}>{item.mobile || '—'}</Text>
        </View>
        <View style={styles.colMobile2}>
          <Text style={styles.cellText}>-</Text>
        </View>
        <View style={styles.colStatus}>
          <Text style={styles.statusText}>{item.lead_status_name || '—'}</Text>
        </View>
        <View style={styles.colReturn} />
      </View>
    );
  };

  const renderFooter = () => (
    <View style={styles.footer}>
      <Text style={styles.pageText}>
        Showing {leads.length} of {total} entries
      </Text>
      <PaginatedNumComp
        currentPage={page}
        totalPages={totalPages}
        onPageChange={page =>
          mutate({
            LDFltr_leadDetailShowByFilter: 'leadDetailShowByFilter',
            page,
            leadDetailShowByFilter: 'leadDetailShowByFilter',
            LDFltr_fltrNeRcmndMinVal: 0,
            LDFltr_fltrNeRcmndMaxVal: 0,
            LDFltr_perPage: 10,
            LDFltr_radioFilterSortingOrdering: 'ASC',
            LDFltr_selectedCagerory: route?.params?.selectedLeadsCategory,
          })
        }
      />

      {/* <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: hp('2'),
        }}
      >
        <TouchableOpacity style={[styles.pageBtn, styles.pageBtnActive]}>
          <Text style={styles.pageTextActive}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pageBtn}>
          <Text style={styles.pageText}>2</Text>
        </TouchableOpacity>
      </View> */}
      {/* … */}
    </View>
  );

  return (
    <View style={styles.safeArea}>
      <HeaderComponent
        isBack
        headerTitle={route?.params?.headerTitle ?? 'Secondary Leads'}
      />
      <FlatList
        data={leads}
        keyExtractor={i => i.id.toString()}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          loading ? null : (
            <View style={styles.loadingContainer}>
              <Text style={{ color: 'black' }}>No leads found</Text>
            </View>
          )
        }
        ListFooterComponentStyle={{ marginBottom: 20 }}
      />
      {loading && leads.length > 0 && (
        <ActivityIndicator
          style={{ marginVertical: 12 }}
          size="small"
          color="#2196F3"
        />
      )}
    </View>
  );
};

export default memo(LeadListScreen);
