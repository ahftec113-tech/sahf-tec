import { useMutation } from '@tanstack/react-query';
import { AuthUrl } from '../../Utils/Urls';
import useReduxStore from '../../Hooks/UseReduxStore';
import { errorMessage } from '../../Config/NotificationMessage';
import { useEffect, useState } from 'react';
import API from '../../Utils/helperFunc';
import { formatDateToMDY } from '../../Services/GlobalFunctions';

const useLeadReportScreen = () => {
  const { getState, dispatch } = useReduxStore();
  const { userData, token } = getState('Auth');

  const currentDate = new Date();

  const [leads_category, setLeads_category] = useState([]);
  const [report_types, setReport_types] = useState([]);
  const [add_remarks_user_data, setAdd_remarks_user_data] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [lead_user_data, setLead_user_data] = useState(null);

  const [apiPostData, setApiPostData] = useState({
    leadsCat: null,
    reportType: null,
    dayType: null,
    dateType: null,
    startDate: null,
    endDate: null,
    modalType: null,
  });

  const {
    leadsCat,
    reportType,
    dateType,
    dayType,
    endDate,
    startDate,
    modalType,
  } = apiPostData;

  const updateState = data => setApiPostData(prev => ({ ...prev, ...data }));

  const onChangeVal = (key, val) => updateState({ [key]: val });

  const { mutateAsync } = useMutation({
    mutationFn: data => {
      console.log('lkjsdvlkdsbvklsdbvkldsbvklsdbvbsdklvsd', data);
      return API.post('/mb_user_lead_report_pl.htm', {
        ...data,
        rqst_ke_fntn_vl: `usr_lg_attempt`,
        userLoginToken: token,
        userLoginIDC: userData?.id,
        allowtoEntCrmSctino: userData?.id,
        crm_software_clients_id: userData?.crm_software_clients_id,
        userRoleIndicate: `admin`,
        GetReportTypeAndLeadCategory: 'GetReportTypeAndLeadCategory',
      });
    },
    onSuccess: ({ ok, data }) => {
      console.log('iuudshisodfiodsfiodsf', data);
      if (ok) {
        setLeads_category(data?.data?.leads_category);
        setReport_types(data?.data?.report_types);
      } else errorMessage(data?.message);
    },
    onError: e => errorMessage(e),
  });
  const { mutate } = useMutation({
    mutationFn: data => {
      console.log('jdjkdjkfjkdhfjkdhjhdl', {
        rqst_ke_fntn_vl: `usr_lg_attempt`,
        userLoginToken: token,
        userLoginIDC: userData?.id,
        allowtoEntCrmSctino: userData?.id,
        crm_software_clients_id: userData?.crm_software_clients_id,
        userRoleIndicate: userData?.crm_user_role,
        LeadReportParentCateg: leadsCat,
        selectStartDateLeadReport: formatDateToMDY(startDate ?? currentDate),
        selectEndDateLeadReport: formatDateToMDY(endDate ?? currentDate),
        DateTypeLeadReport: dateType,
        LeadReportIntType: dayType,
        LeadReportCategoryWise: reportType,
        leadReportDetail: 'leadReportShowleadDetail',
      });
      return API.post('/mb_user_lead_report_pl.htm', {
        rqst_ke_fntn_vl: `usr_lg_attempt`,
        userLoginToken: token,
        userLoginIDC: userData?.id,
        allowtoEntCrmSctino: userData?.id,
        crm_software_clients_id: userData?.crm_software_clients_id,
        userRoleIndicate: userData?.crm_user_role,
        LeadReportParentCateg: leadsCat,
        selectStartDateLeadReport: formatDateToMDY(startDate ?? currentDate),
        selectEndDateLeadReport: formatDateToMDY(endDate ?? currentDate),
        DateTypeLeadReport: dateType,
        LeadReportIntType: dayType,
        LeadReportCategoryWise: reportType,
        leadReportDetail: 'leadReportShowleadDetail',
      });
    },
    onSuccess: ({ ok, data }) => {
      console.log('iuudshisodfiodsfiodsf', data, ok, leadsCat);
      if (ok) {
        setLead_user_data(
          Array.isArray(data?.[leadsCat]) ? data[leadsCat] : null,
        );
        setAdd_remarks_user_data(data?.add_remarks_user_data);
        // setLeads_category(data?.data?.leads_category);
        // setReport_types(data?.data?.report_types);
      } else errorMessage('Please select required fields!');
    },
    onError: e => errorMessage(e),
  });
  const addReason = useMutation({
    mutationFn: data => {
      console.log('jdjkdjkfjkdhfjkdfsdfsdfsdfsdfdshjhdl', {
        rqst_ke_fntn_vl: `usr_lg_attempt`,
        userLoginToken: token,
        userLoginIDC: userData?.id,
        allowtoEntCrmSctino: userData?.id,
        crm_software_clients_id: userData?.crm_software_clients_id,
        userRoleIndicate: userData?.crm_user_role,
        LeadReportIntType: dayType,
        LeadReportAddReason: 'LeadReportAddReason',
        user_id: add_remarks_user_data?.user_id,
        date: add_remarks_user_data?.date,
        ...data,
      });
      return API.post('/mb_user_lead_report_pl.htm', {
        rqst_ke_fntn_vl: `usr_lg_attempt`,
        userLoginToken: token,
        userLoginIDC: userData?.id,
        allowtoEntCrmSctino: userData?.id,
        crm_software_clients_id: userData?.crm_software_clients_id,
        userRoleIndicate: userData?.crm_user_role,
        LeadReportIntType: dayType,
        LeadReportAddReason: 'LeadReportAddReason',
        user_id: add_remarks_user_data?.user_id,
        date: add_remarks_user_data?.date,
        ...data,
      });
    },
    onSuccess: ({ ok, data }) => {
      console.log('iuudshisodfiodzdvsdvxdvxcvxcvsfiodsf', data, ok, leadsCat);
      if (ok) {
        // setLead_user_data(
        //   Array.isArray(data?.[leadsCat]) ? data[leadsCat] : null,
        // );
        // setAdd_remarks_user_data(data?.add_remarks_user_data);
        // setLeads_category(data?.data?.leads_category);
        // setReport_types(data?.data?.report_types);
      } else errorMessage('Please select required fields!');
    },
    onError: e => errorMessage(e),
  });

  useEffect(() => {
    mutateAsync();
  }, []);

  return {
    userData,
    leads_category,
    report_types,
    onChangeVal,
    leadsCat,
    reportType,
    currentDate,
    dateType,
    dayType,
    endDate,
    startDate,
    modalType,
    apiPostData,
    mutate,
    lead_user_data,
    setApiPostData,
    setLead_user_data,
    add_remarks_user_data,
    modalVisible,
    setModalVisible,
    addReason,
  };
};

export default useLeadReportScreen;
