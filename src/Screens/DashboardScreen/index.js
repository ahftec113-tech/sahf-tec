// DashboardScreen.tsx
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Platform,
} from 'react-native';
import { Card, Title, DataTable, Button, Divider } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown'; // ← New import
import useDashboardScreen from './useDashboardScreen';
import { Touchable } from '../../Components/Touchable';
import { TextComponent } from '../../Components/TextComponent';
import { MultiSelectButton } from '../../Components/MultiSelectButton';
import { hp, wp } from '../../Hooks/useResponsive';
import { sumTotalLeads } from '../../Services/GlobalFunctions';
import { types } from '../../Redux/types';
import NavigationService from '../../Services/NavigationService';

const { width } = Dimensions.get('window');

const cityData = [
  { label: 'Karachi', value: 'karachi' },
  { label: 'Dutai', value: 'dutai' },
  { label: 'Crescent Bay', value: 'crescent_bay' },
  { label: 'Northern Bypass', value: 'northern_bypass' },
  { label: 'Lahore', value: 'lahore' },
  { label: 'Islamabad', value: 'islamabad' },
  { label: 'Balochistan', value: 'balochistan' },
  { label: 'Interior Sindh', value: 'interior_sindh' },
];

export default function DashboardScreen() {
  const {
    upperTabsArry,
    pageData,
    dispatch,
    selected,
    setSelected,
    items,
    onValueChange,
  } = useDashboardScreen();

  return (
    <ScrollView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: wp('2'),
          marginTop: hp('2'),
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
      >
        <MultiSelectButton
          items={upperTabsArry}
          onSelectVal={(_, item) => {
            if (item?.top_menus == 'Lead Reports') {
              NavigationService.navigate('LeadReportScreen');
            } else if (item?.top_menus == 'Leads') {
              NavigationService.navigate('AddLeadsScreen');
            } else if (item?.id == 'attendance') {
              NavigationService.navigate('MarkAttendanceScreen');
            } else () => {};
          }}
          // onSelectVal={() => NavigationService.navigate('AddLeadsScreen')}
        />
      </ScrollView>

      {/* Header */}
      <View style={styles.header}>
        {/* Beautiful Custom Dropdown */}
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          itemTextStyle={styles.itemTextStyle}
          data={items ?? []}
          maxHeight={300}
          labelField="label"
          valueField="value"
          value={selected?.value}
          onChange={item => {
            onValueChange({
              selectedLeadsCategory: item?.value,
            });
            setSelected(item);
          }}
          // renderRightIcon={() => (
          //   // <Text style={styles.arrowIcon}>Down Arrow</Text>
          // )}
        />

        <Button
          mode="contained"
          style={styles.addBtn}
          onPress={() => {
            dispatch({
              type: types.LogoutType,
            });
          }}
        >
          Add Targets
        </Button>
      </View>

      {/* Rest of your UI — 100% unchanged */}
      <View style={styles.row}>
        {/* TOP 10 Lead SOURCES */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>
              TOP 10 Lead SOURCES (
              {sumTotalLeads(pageData?.TopLeadSource ?? [])})
            </Title>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>#</DataTable.Title>
                <DataTable.Title>Source</DataTable.Title>
                <DataTable.Title numeric>Count</DataTable.Title>
              </DataTable.Header>

              {pageData?.TopLeadSource?.map((item, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{index + 1}</DataTable.Cell>
                  <DataTable.Cell>{item.source_name}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    {item.totalLeads.toLocaleString()}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </Card.Content>
        </Card>

        {/* TOP Lead Owners */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>
              TOP Lead Owners ({sumTotalLeads(pageData?.TopLeadsOwner ?? [])})
            </Title>
            <DataTable>
              {pageData?.TopLeadsOwner?.map((owner, idx) => (
                <DataTable.Row key={idx}>
                  <DataTable.Cell>{owner.ownerName}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    {owner.todayLeads.toLocaleString()}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </Card.Content>
        </Card>

        {/* TOP Lead Brokers */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>
              TOP Lead Brokers ({sumTotalLeads(pageData?.TopBroker ?? [])})
            </Title>
            <DataTable>
              {pageData?.TopBroker?.map((b, idx) => (
                <DataTable.Row key={idx}>
                  <DataTable.Cell>
                    {b.brokerName + ' ' + b?.parentUser}
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    {b.totalLead.toLocaleString()}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </Card.Content>
        </Card>
      </View>

      <Divider style={styles.divider} />

      {/* Bottom Row */}
      <View style={styles.row}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>
              Total Over Due ({sumTotalLeads(pageData?.DueTodayUserBased ?? [])}
              )
            </Title>
            <DataTable>
              {pageData?.DueTodayUserBased?.map((d, i) => (
                <DataTable.Row key={i}>
                  <DataTable.Cell>{d.ownerName}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    {d.totalOverDue.toLocaleString()}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>
              Total Lead ({sumTotalLeads(pageData?.TopLeadStatus ?? [])})
            </Title>
            {pageData?.TopLeadStatus?.map(res => (
              <View key={res.lead_status_name} style={styles.statRow}>
                <Text style={{ color: 'black' }}>{res?.lead_status_name}</Text>
                <Text style={styles.statValue}>
                  {res?.totalStatusCount?.toLocaleString()}
                </Text>
              </View>
            ))}
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>
              External Lead (
              {sumTotalLeads(pageData?.TopExternalLeadStatus ?? [])})
            </Title>
            {pageData?.TopExternalLeadStatus?.map(res => (
              <View key={res.lead_status_name} style={styles.statRow}>
                <Text style={{ color: 'black' }}>{res?.lead_status_name}</Text>
                <Text style={styles.statValue}>
                  {res?.totalStatusCount?.toLocaleString()}
                </Text>
              </View>
            ))}
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>
              Transfer Lead (
              {sumTotalLeads(pageData?.TopExternalLeadStatus ?? [])})
            </Title>
            {pageData?.TopExternalLeadStatus?.map(res => (
              <View key={res.lead_status_name} style={styles.statRow}>
                <Text style={{ color: 'black' }}>{res?.lead_status_name}</Text>
                <Text style={styles.statValue}>
                  {res?.totalStatusCount?.toLocaleString()}
                </Text>
              </View>
            ))}
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}

/* -------------------------------------------------
   Styles (Only dropdown styles added/updated)
   ------------------------------------------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  addBtn: { backgroundColor: '#007AFF' },

  // Beautiful Dropdown Styles
  dropdown: {
    width: wp('50'),
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#333',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  itemTextStyle: {
    fontSize: 16,
    color: '#333',
  },
  arrowIcon: {
    fontSize: 20,
    color: '#666',
  },

  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginTop: 8,
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
  statValue: { fontWeight: '600', color: 'black' },
});
