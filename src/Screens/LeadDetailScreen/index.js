import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  StatusBar,
  FlatList,
  TextInput,
  Alert,
  Modal,
  Pressable,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // You need to install this: npm install @react-native-community/datetimepicker
import {
  Phone,
  ChevronDown,
  ChevronUp,
  Edit2,
  Check,
  X,
} from 'lucide-react-native';
import { styles } from './styles';
import { useMutation } from '@tanstack/react-query';
import useReduxStore from '../../Hooks/UseReduxStore';
import { errorMessage, successMessage } from '../../Config/NotificationMessage';
import API from '../../Utils/helperFunc';
import { hp, wp } from '../../Hooks/useResponsive';
import { Picker } from '@react-native-picker/picker';
import { formatDateToMDY } from '../../Services/GlobalFunctions';
import { HeaderComponent } from '../../Components/HeaderComp';

const LeadDetailScreen = ({ navigation, route }) => {
  const [callingHistoryExpanded, setCallingHistoryExpanded] = useState(false);
  const [communicationExpanded, setCommunicationExpanded] = useState(false);
  const [notesExpanded, setNotesExpanded] = useState(false);

  // Editable Lead Contact Fields
  const [isEditing, setIsEditing] = useState(null);
  const [leadEmail, setLeadEmail] = useState('');
  const [leadCell, setLeadCell] = useState('03332132024');
  const [tempEmail, setTempEmail] = useState();
  const [tempCell, setTempCell] = useState();
  const [tempName, setTempName] = useState();
  const [detailData, setDetailsData] = useState(null);
  const [tempSecondaryCell, setTempSecondaryCell] = useState(''); // New Secondary Cell

  // Modal states
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [followUpModalVisible, setFollowUpModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false); // New: Status picker modal
  const [noteText, setNoteText] = useState('');
  const [followUpDate, setFollowUpDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Status editing
  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentStatus, setCurrentStatus] = useState(''); // To display current status

  // Sample status options - replace with your actual statuses from API if available
  const statusOptions = [
    { value: 10, label: 'Need Recommendations' },
    { value: 6, label: 'Lost Lead' },
    { value: 4, label: 'Junk Lead' },
  ];

  const { getState } = useReduxStore();
  const { userData, token } = getState('Auth');

  console.log('sdfghjklkjhgfdfghjkkjhgfdfghjklkjhgfdfghjklkjhg', {
    rqst_ke_fntn_vl: `usr_lg_attempt`,
    userLoginToken: token,
    userLoginIDC: userData?.id,
    crm_software_clients_id: userData?.crm_software_clients_id,
    userRoleIndicate: userData?.crm_user_role,
    allowtoEntCrmSctino: userData?.id,
    selectedLeadsCategory: userData?.leads_category_id,
    goingToLeadsDetail: route?.params?.id,
    ...route?.params?.leadDetailType,
  });

  const { mutate } = useMutation({
    mutationFn: () => {
      return API.post(route?.params?.url, {
        rqst_ke_fntn_vl: `usr_lg_attempt`,
        userLoginToken: token,
        userLoginIDC: userData?.id,
        crm_software_clients_id: userData?.crm_software_clients_id,
        userRoleIndicate: userData?.crm_user_role,
        allowtoEntCrmSctino: userData?.id,
        selectedLeadsCategory: userData?.leads_category_id,
        goingToLeadsDetail: route?.params?.id,
        ...route?.params?.leadDetailType,
      });
    },
    onSuccess: ({ ok, data }) => {
      console.log('wertyuioiuytrertyuioiuytrtyuiutryuytryuiyrtyuyr', data);
      if (ok) {
        setDetailsData(data);
        // Set initial status when data loads
        const initialStatus =
          data?.modal?.lead_info?.fields?.lead_latest_status?.value || 'New';
        setCurrentStatus(initialStatus);
        setSelectedStatus(initialStatus);
      }
    },
    onError: e => errorMessage(e),
  });

  useEffect(() => {
    mutate();
  }, []);

  const addNotes = useMutation({
    mutationFn: () =>
      API.post(route?.params?.url, {
        rqst_ke_fntn_vl: `usr_lg_attempt`,
        userLoginToken: token,
        userLoginIDC: userData?.id,
        crm_software_clients_id: userData?.crm_software_clients_id,
        userRoleIndicate: userData?.crm_user_role,
        goingToAddNewLeadNoteDes: 'goingToAddNewLeadNoteDes',

        allowtoEntCrmSctino: userData?.id,
        selectedLeadsCategory: userData?.leads_category_id,
        addNewLedNote_leadID: route?.params?.id,
        addNewLedChaNote: noteText,
      }),
    onSuccess: ({ ok, data }) => {
      console.log(
        'wertyuioiuytrertyuioisdfsdfdsuytrtyuiutryuytryuiyrtyuyr',
        data,
      );
      if (ok) {
        successMessage('Note added');
        mutate();
      }
    },
    onError: e => errorMessage(e),
  });

  const changeLeadStatus = useMutation({
    mutationFn: data =>
      API.post(route?.params?.url, {
        rqst_ke_fntn_vl: `usr_lg_attempt`,
        userLoginToken: token,
        userLoginIDC: userData?.id,
        crm_software_clients_id: userData?.crm_software_clients_id,
        userRoleIndicate: userData?.crm_user_role,
        allowtoEntCrmSctino: userData?.id,
        selectedLeadsCategory: userData?.leads_category_id,
        goingToAddNewLeadChatDetail: 'goingToAddNewLeadChatDetail',
        addNewLedChatAddNewComm_leadAssigneeID: userData?.id,
        addNewLedChatAddNewComm_leadUserID: detailData?.assigned_user?.id,
        addNewLedChatAddNewComm_leadID: route?.params?.id,
        addNewLedChatAddNewComm_LeadStatus: selectedStatus,
        ...data,
      }),
    onSuccess: ({ ok, data }) => {
      console.log(
        'wertyuioiuytrertyuioisdfsdfdsuytrtyuiutryuytryuiyrtyuyr',
        data,
      );
      if (ok) {
        successMessage('Status Changed');
        mutate();
      }
    },
    onError: e => errorMessage(e),
  });

  const addFollowUp = useMutation({
    mutationFn: () =>
      API.post(route?.params?.url, {
        rqst_ke_fntn_vl: `usr_lg_attempt`,
        userLoginToken: token,
        userLoginIDC: userData?.id,
        crm_software_clients_id: userData?.crm_software_clients_id,
        userRoleIndicate: userData?.crm_user_role,
        addfollowup: 'addfollowup',
        allowtoEntCrmSctino: userData?.id,
        selectedLeadsCategory: userData?.leads_category_id,
        addNewLedNote_leadID: route?.params?.id,
        attrFollowLeadIDToFollow: route?.params?.id,
        attrFollowLeadIDToFollowCalenDar: formatDateToMDY(followUpDate),
        attrFollowLeadIDToFollowType: detailData?.modal?.actions?.follow_up
          ?.current_date
          ? 'unfollow'
          : 'follow',
      }),
    onSuccess: ({ ok, data }) => {
      if (ok) {
        successMessage('FollowUp added');
        mutate();
      }
    },
    onError: e => errorMessage(e),
  });
  const contactEdit = useMutation({
    mutationFn: data => {
      const payload = {
        rqst_ke_fntn_vl: 'usr_lg_attempt',
        userLoginToken: token,
        userLoginIDC: userData?.id,
        crm_software_clients_id: userData?.crm_software_clients_id,
        userRoleIndicate: userData?.crm_user_role,
        allowtoEntCrmSctino: userData?.id,
        selectedLeadsCategory: userData?.leads_category_id,
        addNewLedNote_leadID: route?.params?.id,
        attrFollowLeadIDToFollow: route?.params?.id,
        goingToUpdateSpecificLeadField: 'goingToUpdateSpecificLeadField',
        goingToUpdateSpecificLeadField_leadID: route?.params?.id,
        goingToUpdateSpecificLeadField_LeadPhone: tempCell,
        goingToUpdateSpecificLeadField_LeadMorePhone: tempSecondaryCell,
        // goingToAddNewLeadChatDetail: 'goingToAddNewLeadChatDetail',
        goingToUpdateSpecificLeadField_Leademail: tempEmail,
        goingToUpdateSpecificLeadField_LeadName: tempName,
        allowtoEntCrmSctinoName: userData?.crm_user_name,

        ...data,
      };

      // 🔍 LOG REQUEST BODY
      console.log('CONTACT EDIT API BODY 👉', payload);

      return API.post(route?.params?.url, payload);
    },

    onSuccess: ({ ok, data }) => {
      console.log('API RESPONSE 👉', data);
      if (ok) {
        successMessage('Data Updated');
        mutate();
      }
    },

    onError: e => {
      console.log('API ERROR 👉', e);
      errorMessage(e);
    },
  });

  // Component for truncated text with Read More/Less
  const TruncatedText = ({ text, maxLength = 100 }) => {
    const [expanded, setExpanded] = useState(false);

    if (!text || text.length <= maxLength) {
      return <Text style={styles.commTextSmall}>{text || '-'}</Text>;
    }

    return (
      <View>
        <Text style={styles.commTextSmall}>
          {expanded ? text : `${text.substring(0, maxLength)}...`}
        </Text>
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Text style={styles.readMoreText}>
            {expanded ? 'Read Less' : 'Read More'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handlePhoneCall = phone => {
    const cleaned = phone.replace(/\s/g, '');
    Linking.openURL(`tel:${cleaned}`);
  };

  const handleWhatsApp = phone => {
    const cleaned = phone.replace(/\s/g, '');
    Linking.openURL(`whatsapp://send?phone=${phone}`);
  };

  const saveChanges = () => {
    const isEdit = isEditing;
    if (tempCell.trim().length < 1 && isEdit == 'phone') {
      Alert.alert(
        'Invalid Phone',
        'Please enter a valid primary phone number.',
      );
      return;
    }
    if (
      tempSecondaryCell.trim() &&
      tempSecondaryCell.trim().length < 10 &&
      isEdit == 'phone'
    ) {
      Alert.alert(
        'Invalid Secondary Phone',
        'Secondary number must be valid if provided.',
      );
      return;
    }
    if (tempEmail.trim() && !tempEmail.includes('@') && isEdit == 'email') {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    // setLeadEmail(tempEmail.trim());
    // setLeadCell(tempCell.trim());
    setIsEditing(null);
    contactEdit.mutate({
      goingToUpdateSpecificLeadField_Updatetype: isEdit,
    });
  };
  const cancelEditing = () => {
    // setTempEmail(leadEmail);
    // setTempCell(leadCell);
    setIsEditing(null);
  };

  const saveNote = async () => {
    if (!noteText.trim()) {
      Alert.alert('Empty Note', 'Please enter a note before saving.');
      return;
    }
    setNoteModalVisible(false);
    await addNotes.mutateAsync();
    setNoteText('');
  };

  const saveFollowUp = () => {
    const formatted = followUpDate.toLocaleDateString();
    // Alert.alert('Follow Up Set', `Follow-up scheduled for ${formatted}`);
    setFollowUpModalVisible(false);
    addFollowUp.mutate();
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || followUpDate;
    setShowDatePicker(Platform.OS === 'ios');
    setFollowUpDate(currentDate);
  };

  // Save status
  const saveStatus = () => {
    // setCurrentStatus(selectedStatus);
    setStatusModalVisible(false);
    changeLeadStatus.mutate();

    // TODO: Call API to update status
  };

  const renderCommunicationItem = ({ item }) => (
    <View style={styles.section}>
      <View style={styles.infoRow}>
        <Text style={styles.label}>User Name</Text>
        <Text style={styles.value}>{item?.leads_full_name || '-'}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Lead Status</Text>
        <Text style={styles.value}>{item?.lead_status_name || '-'}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Communication Details</Text>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <TruncatedText text={item?.detail} />
        </View>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Chat Date</Text>
        <Text style={styles.value}>{item?.leadsCreatedDate || '-'}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>User Selected Date</Text>
        <Text style={styles.value}>{item?.userSelectedDate || '-'}</Text>
      </View>
    </View>
  );
  const renderNotesItem = ({ item }) => (
    <View style={styles.section}>
      <View style={styles.infoRow}>
        <Text style={styles.label}>User Name</Text>
        <Text style={styles.value}>{item?.notifierName || '-'}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Note</Text>
        <Text style={styles.value}>{item?.description || '-'}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Role</Text>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <TruncatedText text={item?.user_role} />
        </View>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Note Date</Text>
        <Text style={styles.value}>{item?.noteDate || '-'}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <HeaderComponent isBack />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* ==================== ACTION BUTTONS ==================== */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.whatsappButton]}
            onPress={() =>
              handleWhatsApp(
                detailData?.modal?.lead_info?.fields?.lead_cell?.value,
              )
            }
          >
            <Text style={styles.actionButtonText}>Send Detail (WhatsApp)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={() => setNoteModalVisible(true)}
          >
            <Text style={styles.actionButtonText}>Add Note</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={() => {
              if (detailData?.modal?.actions?.follow_up?.current_date) {
                addFollowUp.mutate();
              } else setFollowUpModalVisible(true);
            }}
          >
            <Text style={styles.actionButtonText}>
              {detailData?.modal?.actions?.follow_up?.current_date
                ? 'UnFollow'
                : 'Follow Up'}
            </Text>
            {detailData?.modal?.actions?.follow_up?.current_date && (
              <Text style={styles.actionButtonText}>
                {formatDateToMDY(
                  detailData?.modal?.actions?.follow_up?.current_date,
                )}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={() =>
              navigation.navigate('AddComScreen', {
                leadStatusOp: detailData?.communication?.lead_status?.options,
                propertyType: detailData?.communication?.property_type?.options,
                projectName: detailData?.project_list,
                propertyTypeDetail: detailData?.property_type,
                stageStatusList: detailData?.stage_status_list,
                areaList: detailData?.area_list,
                city: detailData?.communication?.recommendation?.city?.options,
                area: detailData?.communication?.recommendation?.area?.options,
                salesType:
                  detailData?.communication?.recommendation?.sales_type
                    ?.options,
                id: route?.params?.id,
                url: route?.params?.url,
                leadAssignId:
                  detailData?.leads_more_detail[0]?.leads_assignee_id,
                leadUserId: detailData?.leads_more_detail[0]?.user_id,
              })
            }
          >
            <Text style={styles.actionButtonText}>Add New Communication</Text>
          </TouchableOpacity>
        </View>

        {/* ==================== LEAD ADMINISTRATOR INFORMATION ==================== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Lead Administrator Information:
          </Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Administrator</Text>
            <Text style={styles.value}>{detailData?.owner?.fullName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{detailData?.owner?.email}</Text>
          </View>
          <TouchableOpacity
            style={styles.infoRow}
            onPress={() => handlePhoneCall(detailData?.owner?.mobile)}
          >
            <Text style={styles.label}>Cell</Text>
            <View style={styles.phoneContainer}>
              <Phone size={16} color="#25D366" />
              <Text style={styles.phoneValue}>{detailData?.owner?.mobile}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Lead Status</Text>
            <Text style={[styles.statusBadge, styles.attemptedBadge]}>
              {detailData?.modal?.current_status}
            </Text>
          </View>
        </View>

        {/* ==================== LEAD OWNER INFORMATION ==================== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lead Owner Information:</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Owner</Text>
            <Text style={styles.value}>
              {detailData?.assigned_user?.fullName}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{detailData?.assigned_user?.email}</Text>
          </View>
          <TouchableOpacity
            style={styles.infoRow}
            onPress={() => handlePhoneCall(detailData?.assigned_user?.mobile)}
          >
            <Text style={styles.label}>Cell</Text>
            <View style={styles.phoneContainer}>
              <Phone size={16} color="#25D366" />
              <Text style={styles.phoneValue}>
                {detailData?.assigned_user?.mobile}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* ==================== LEAD INFORMATION ==================== */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Lead Information:</Text>
            {isEditing != null && (
              <View style={styles.editActions}>
                <TouchableOpacity
                  onPress={saveChanges}
                  style={styles.saveButton}
                >
                  <Check size={20} color="#fff" />
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={cancelEditing}
                  style={styles.cancelButton}
                >
                  <X size={20} color="#666" />
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Lead Name</Text>
            {isEditing == 'lead_name' ? (
              <TextInput
                style={styles.editInput}
                value={tempName}
                onChangeText={setTempName}
                placeholder="Enter Name"
                autoCapitalize="none"
                placeholderTextColor={'gray'}
              />
            ) : (
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <Text style={styles.value}>
                  {detailData?.modal?.lead_info?.fields?.lead_name?.value}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setTempName(
                      detailData?.modal?.lead_info?.fields?.lead_name?.value,
                    );
                    setIsEditing('lead_name');
                  }}
                >
                  <Edit2 size={18} color="#007bff" />
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Lead Email</Text>
            {isEditing == 'email' ? (
              <TextInput
                style={styles.editInput}
                value={tempEmail}
                onChangeText={setTempEmail}
                placeholder="Enter email"
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={'gray'}
              />
            ) : (
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <Text
                  style={[
                    styles.value,
                    !detailData?.modal?.lead_info?.fields?.lead_name?.value &&
                      styles.placeholderText,
                  ]}
                >
                  {detailData?.modal?.lead_info?.fields?.lead_email?.value ||
                    'Not provided'}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setTempEmail(
                      detailData?.modal?.lead_info?.fields?.lead_email?.value,
                    );
                    setIsEditing('email');
                  }}
                >
                  <Edit2 size={18} color="#007bff" />
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* MODIFIED: Lead Cell with Primary + Secondary */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>Lead Cell</Text>
            <View style={{ alignItems: 'flex-end' }}>
              {isEditing == 'phone' ? (
                <View style={{ width: '100%' }}>
                  {/* Primary Cell */}
                  <View style={{ marginBottom: 10 }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#666',
                        marginBottom: 4,
                      }}
                    >
                      Primary
                    </Text>
                    <TextInput
                      style={styles.editInput}
                      value={tempCell}
                      onChangeText={setTempCell}
                      placeholder="e.g. 03332132024"
                      keyboardType="phone-pad"
                      placeholderTextColor={'gray'}
                    />
                  </View>

                  {/* Secondary Cell */}
                  <View>
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#666',
                        marginBottom: 4,
                      }}
                    >
                      Secondary (Optional)
                    </Text>
                    <TextInput
                      style={styles.editInput}
                      value={tempSecondaryCell}
                      onChangeText={setTempSecondaryCell}
                      placeholder="Enter secondary number"
                      keyboardType="phone-pad"
                      placeholderTextColor={'gray'}
                    />
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    alignItems: 'flex-end',
                    flexDirection: 'row',
                    gap: 10,
                  }}
                >
                  {/* Primary Cell */}
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        handlePhoneCall(
                          detailData?.modal?.lead_info?.fields?.lead_cell
                            ?.value,
                        )
                      }
                      style={styles.phoneContainer}
                    >
                      <Phone size={16} color="#25D366" />
                      <Text style={styles.phoneValue}>
                        {detailData?.modal?.lead_info?.fields?.lead_cell?.value}
                      </Text>
                    </TouchableOpacity>

                    {/* Secondary Cell - Show only if exists (you can add logic later) */}
                    {tempSecondaryCell ? (
                      <TouchableOpacity
                        onPress={() => handlePhoneCall(tempSecondaryCell)}
                        style={[styles.phoneContainer, { marginTop: 8 }]}
                      >
                        <Phone size={16} color="#25D366" />
                        <Text
                          style={[
                            styles.phoneValue,
                            { fontSize: 13, opacity: 0.8 },
                          ]}
                        >
                          {
                            detailData?.modal?.lead_info?.fields?.lead_cell
                              ?.more
                          }
                        </Text>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setTempCell(
                        detailData?.modal?.lead_info?.fields?.lead_cell?.value,
                      );
                      setTempSecondaryCell(
                        detailData?.modal?.lead_info?.fields?.lead_cell?.more,
                      ); // You can populate from API if secondary exists
                      setIsEditing('phone');
                    }}
                  >
                    <Edit2 size={18} color="#007bff" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Lead Source</Text>
            <Text style={styles.value}>
              {detailData?.modal?.lead_info?.fields?.lead_source?.value}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Lead Created Date</Text>
            <Text style={styles.value}>
              {detailData?.modal?.lead_info?.fields?.lead_created_date?.value}
            </Text>
          </View>

          {/* UPDATED: Lead Latest Status with Edit Icon */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>Lead Latest Status</Text>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
            >
              <Text style={[styles.statusBadge, styles.attemptedBadge]}>
                {currentStatus ||
                  detailData?.modal?.lead_info?.fields?.lead_latest_status
                    ?.value ||
                  'New'}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setSelectedStatus(
                    currentStatus ||
                      detailData?.modal?.lead_info?.fields?.lead_latest_status
                        ?.value,
                  );
                  setStatusModalVisible(true);
                }}
              >
                <Edit2 size={18} color="#007bff" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Lead Latest Communication</Text>
            <Text style={styles.communicationText}>
              {
                detailData?.modal?.lead_info?.fields?.lead_latest_communication
                  ?.value
              }
            </Text>
          </View>
        </View>

        {/* ==================== CALLING HISTORY ==================== */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.collapsibleHeader}
            onPress={() => setCallingHistoryExpanded(!callingHistoryExpanded)}
          >
            <Text style={styles.sectionTitle}>Calling History:</Text>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}
            >
              <TouchableOpacity
                style={styles.clickToViewButton}
                onPress={() =>
                  setCallingHistoryExpanded(!callingHistoryExpanded)
                }
              >
                <Text style={styles.clickToViewText}>Click To View</Text>
              </TouchableOpacity>
              {callingHistoryExpanded ? (
                <ChevronUp size={20} color="#666" />
              ) : (
                <ChevronDown size={20} color="#666" />
              )}
            </View>
          </TouchableOpacity>

          {callingHistoryExpanded && (
            <View style={styles.historyContent}>
              <Text style={styles.historyLabel}>History</Text>
              {detailData?.lead_calling_detail?.length > 0 ? (
                detailData?.lead_calling_detail.map((call, index) => (
                  <View key={index} style={styles.callItem}>
                    <Text style={styles.callText}>{call?.calling_history}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.noDataText}>
                  No calling history available
                </Text>
              )}
            </View>
          )}
        </View>
        {/* ==================== LEAD COMMUNICATION HISTORY ==================== */}
        {detailData?.lead_note_detail?.length > 0 && (
          <View style={{ ...styles.section, paddingBottom: hp('0.5') }}>
            <TouchableOpacity
              style={styles.collapsibleHeader}
              onPress={() => setNotesExpanded(!notesExpanded)}
            >
              <Text style={styles.sectionTitle}>Lead Notes:</Text>
              {notesExpanded ? (
                <ChevronUp size={20} color="#666" />
              ) : (
                <ChevronDown size={20} color="#666" />
              )}
            </TouchableOpacity>
          </View>
        )}
        {notesExpanded > 0 && (
          <>
            <FlatList
              data={detailData?.lead_note_detail}
              renderItem={renderNotesItem}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          </>
        )}

        {/* ==================== LEAD COMMUNICATION HISTORY ==================== */}
        <View style={{ ...styles.section, paddingBottom: hp('0.5') }}>
          <TouchableOpacity
            style={styles.collapsibleHeader}
            onPress={() => setCommunicationExpanded(!communicationExpanded)}
          >
            <Text style={styles.sectionTitle}>Lead Communication History:</Text>
            {communicationExpanded ? (
              <ChevronUp size={20} color="#666" />
            ) : (
              <ChevronDown size={20} color="#666" />
            )}
          </TouchableOpacity>
        </View>
        {communicationExpanded && (
          <>
            <FlatList
              data={detailData?.leads_more_detail}
              renderItem={renderCommunicationItem}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          </>
        )}
      </ScrollView>

      {/* ==================== ADD NOTE MODAL ==================== */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={noteModalVisible}
        onRequestClose={() => setNoteModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Add Note</Text>
            <TextInput
              style={styles.noteInput}
              placeholder="Write your note here..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={6}
              value={noteText}
              onChangeText={setNoteText}
            />
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.button, styles.cancelBtn]}
                onPress={() => {
                  setNoteModalVisible(false);
                  setNoteText('');
                }}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.saveBtn]}
                onPress={saveNote}
              >
                <Text style={[styles.buttonText, { color: '#fff' }]}>
                  Save Note
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* ==================== FOLLOW UP MODAL ==================== */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={followUpModalVisible}
        onRequestClose={() => setFollowUpModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Set Follow Up Date</Text>
            <Text style={{ marginBottom: 10, color: '#333' }}>
              Selected: {followUpDate.toLocaleDateString()}
            </Text>

            {showDatePicker && (
              <DateTimePicker
                value={followUpDate}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}

            {Platform.OS !== 'ios' && (
              <TouchableOpacity
                style={styles.datePickerBtn}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.datePickerText}>Choose Date</Text>
              </TouchableOpacity>
            )}

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.button, styles.cancelBtn]}
                onPress={() => setFollowUpModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.saveBtn]}
                onPress={saveFollowUp}
              >
                <Text style={[styles.buttonText, { color: '#fff' }]}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* ==================== STATUS PICKER MODAL ==================== */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={statusModalVisible}
        onRequestClose={() => setStatusModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Update Lead Status</Text>

            <View
              style={{
                borderWidth: 1,
                borderColor: '#999',
                borderRadius: 6,
                width: wp('80'),
                color: 'black',
                // backgroundColor: 'black',
                // overflow: 'hidden',
              }}
            >
              <Picker
                selectedValue={selectedStatus}
                onValueChange={itemValue => setSelectedStatus(itemValue)}
                dropdownIconColor="#666"
                itemStyle={{
                  color: 'black', // This controls the text color in the dropdown list
                  fontSize: 16,
                  backgroundColor: 'red',
                }}
                style={{
                  picker: {
                    height: 50,
                    ...Platform.select({
                      android: {
                        color: 'black',
                        width: wp('40'),
                      },
                      ios: { height: 160 },
                    }),
                  },
                  color: 'black',
                }}
              >
                <Picker.Item label={'Select'} value={null} />
                {statusOptions.map(status => {
                  return (
                    <Picker.Item
                      label={status.label}
                      value={status.value}
                      // style={{ color: 'black' }}
                    />
                  );
                })}
              </Picker>
            </View>

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.button, styles.cancelBtn]}
                onPress={() => {
                  setStatusModalVisible(false);
                }}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.saveBtn]}
                onPress={saveStatus}
              >
                <Text style={[styles.buttonText, { color: '#fff' }]}>
                  Update Status
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default LeadDetailScreen;
