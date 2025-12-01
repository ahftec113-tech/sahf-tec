import React, { memo } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const LeadDetailScreen = ({ navigation, route }) => {
  const lead = {
    name: 'Shahzaib Khan',
    phone: '+923178325986',
    email: 'shahzaibkhan00311@gmail.com',
    status: 'Meeting Confirmed',
    source: 'FaceBook',
    createdDate: '11/15/2025',
    latestStatus: 'Meeting Confirmed',
    latestCommunication:
      'said not looking was looking for someone (Modified By: M Saquib Ur Rehman)',
    admin: {
      name: 'Sammar Abbas',
      email: 'sammar2@sahfgroup.com',
      phone: '03268066194',
    },
    owner: {
      name: 'Qamar Farid',
      email: 'qamar.farid@sahfgroup.com',
      phone: '',
    },
    notes:
      'you_are_interested_in_2-apartments | when_you_can_come_for_the_meeting_tomorrow | how_much_down_payment_you_can_pay_40_lac_plus | how_much_monthly_installment_you_can_pay_600,000+_plus_you_are_looking_for_future_living',
    communications: [
      {
        user: 'M Saquib Ur Rehman',
        status: 'Meeting Confirmed',
        details:
          'said not looking was looking for someone (Modified By: M Saquib Ur Rehman)',
        date: '11/16/2025',
        selectedDate: 'December 5, 2025 01:00:00 PM',
      },
      {
        user: 'Qamar Farid',
        status: 'Meeting Confirmed',
        details:
          'He is likely to visit Grand by tomorrow, he lives in lyari. UserSelectedDate: Nov 16, 2025 01:00:00 PM',
        date: '11/15/2025',
        selectedDate: '',
      },
    ],
  };

  const statusColors = {
    'Meeting Confirmed': '#10B981',
    'Meeting Done': '#3B82F6',
    'Sale Done': '#8B5CF6',
    'Pre-Qualified': '#F59E0B',
  };

  const makeCall = phone => {
    if (phone) Linking.openURL(`tel:${phone}`);
  };

  const sendEmail = email => {
    if (email) Linking.openURL(`mailto:${email}`);
  };

  const sendWhatsApp = () => {
    Linking.openURL(
      `whatsapp://send?phone=${lead.phone.replace('+', '')}&text=Hello ${
        lead.name
      }`,
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E40AF" />

      {/* Header */}
      <LinearGradient colors={['#1E40AF', '#1D4ED8']} style={styles.header}>
        <Text style={styles.headerTitle}>{lead.name}</Text>
        <View style={styles.statusBadge}>
          <Icon name="check-circle" size={18} color="#fff" />
          <Text style={styles.statusText}>{lead.status}</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView}>
        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.actionBtnPrimary}
            onPress={sendWhatsApp}
          >
            <Icon name="whatsapp" size={22} color="#fff" />
            <Text style={styles.actionBtnText}>Send Detail (WhatsApp)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionBtnTextSecondary}>Add Note</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionBtnTextSecondary}>Follow Up</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Contact Cards */}
        <View style={styles.infoRow}>
          <TouchableOpacity
            style={styles.infoCard}
            onPress={() => makeCall(lead.phone)}
          >
            <Icon name="phone" size={28} color="#10B981" />
            <Text style={styles.infoText}>{lead.phone}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.infoCard}
            onPress={() => sendEmail(lead.email)}
          >
            <Icon name="email" size={28} color="#3B82F6" />
            <Text style={styles.infoText} numberOfLines={1}>
              {lead.email}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Lead Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lead Information</Text>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Source</Text>
            <Text style={styles.value}>{lead.source}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Created Date</Text>
            <Text style={styles.value}>{lead.createdDate}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Latest Status</Text>
            <Text
              style={[
                styles.value,
                { color: statusColors[lead.status] || '#666' },
              ]}
            >
              {lead.latestStatus}
            </Text>
          </View>
        </View>

        {/* Team Assignment */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Team Assignment</Text>
          <View style={styles.teamRow}>
            <View style={styles.teamCard}>
              <Text style={styles.teamRole}>Administrator</Text>
              <Text style={styles.teamName}>{lead.admin.name}</Text>
              <Text style={styles.teamEmail}>{lead.admin.email}</Text>
              {lead.admin.phone ? (
                <TouchableOpacity onPress={() => makeCall(lead.admin.phone)}>
                  <Text style={styles.teamPhone}>
                    <Icon name="phone" size={16} color="#10B981" />{' '}
                    {lead.admin.phone}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
            <View style={styles.teamCard}>
              <Text style={styles.teamRole}>Lead Owner</Text>
              <Text style={styles.teamName}>{lead.owner.name}</Text>
              <Text style={styles.teamEmail}>{lead.owner.email}</Text>
            </View>
          </View>
        </View>

        {/* Customer Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Notes</Text>
          <View style={styles.notesBox}>
            <Text style={styles.notesText}>
              • Interested in 2 apartments{'\n'}• Can come for meeting tomorrow
              {'\n'}• Down payment: 40 Lac+{'\n'}• Monthly installment: 600,000+
              {'\n'}• Looking for future living
            </Text>
          </View>
        </View>

        {/* Communication History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Communication History</Text>
          {lead.communications.map((comm, index) => (
            <View key={index} style={styles.commCard}>
              <View style={styles.commHeader}>
                <Icon name="account-circle" size={20} color="#6366F1" />
                <Text style={styles.commUser}>{comm.user}</Text>
                <Text style={styles.commDate}>{comm.date}</Text>
              </View>
              <Text style={styles.commDetails}>{comm.details}</Text>
              {comm.selectedDate ? (
                <View style={styles.selectedDate}>
                  <Icon name="calendar-clock" size={18} color="#8B5CF6" />
                  <Text style={styles.selectedDateText}>
                    {comm.selectedDate}
                  </Text>
                </View>
              ) : null}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default memo(LeadDetailScreen);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { padding: 20, paddingTop: 10 },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusText: { color: '#fff', marginLeft: 8, fontWeight: '600', fontSize: 15 },
  scrollView: { flex: 1 },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  actionBtnPrimary: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    elevation: 5,
  },
  actionBtn: {
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 12,
  },
  actionBtnText: { color: '#fff', fontWeight: '600', fontSize: 15 },
  actionBtnTextSecondary: { color: '#4F46E5', fontWeight: '600', fontSize: 15 },
  infoRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 20,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
  },
  infoText: {
    marginTop: 10,
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
  },
  section: { marginHorizontal: 16, marginBottom: 24 },
  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 14,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    elevation: 3,
  },
  label: { color: '#6B7280', fontSize: 15 },
  value: { color: '#111827', fontWeight: '600', fontSize: 15 },
  teamRow: { flexDirection: 'row', gap: 12 },
  teamCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 4,
  },
  teamRole: { color: '#6B7280', fontSize: 13, fontWeight: '500' },
  teamName: {
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 6,
    color: '#1F2937',
  },
  teamEmail: { color: '#4B5563', marginTop: 4, fontSize: 14 },
  teamPhone: {
    color: '#10B981',
    marginTop: 10,
    fontWeight: '600',
    fontSize: 15,
  },
  notesBox: {
    backgroundColor: '#F0FDF4',
    padding: 18,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#86EFAC',
  },
  notesText: {
    color: '#166534',
    lineHeight: 24,
    fontSize: 15.5,
    fontWeight: '500',
  },
  commCard: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 14,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 4,
  },
  commHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  commUser: { fontWeight: 'bold', marginLeft: 10, flex: 1, fontSize: 16 },
  commDate: { color: '#6B7280', fontSize: 13 },
  commDetails: { color: '#4B5563', lineHeight: 22, fontSize: 15 },
  selectedDate: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    backgroundColor: '#F3E8FF',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  selectedDateText: {
    marginLeft: 8,
    color: '#6B21A8',
    fontWeight: '600',
    fontSize: 14,
  },
});
