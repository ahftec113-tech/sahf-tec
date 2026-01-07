// src/screens/LeadFilterScreen/useLeadFilterScreen.js
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import API from '../../Utils/helperFunc';
import { errorMessage } from '../../Config/NotificationMessage';
import useReduxStore from '../../Hooks/UseReduxStore';

const initialFilters = {
  source: [],
  systemDefined: [],
  agentWise: [],
  userWise: [],
  statusWise: [],
  dateStatusWise: null,
  action: null,
  createdModified: 'Created Date',
  followUpDate: '',
  sorting: { field: 'Leads', order: 'ASC' },
};

export const useLeadFilterScreen = ({ goBack }, { params }) => {
  const currentDate = new Date();

  const [filters, setFilters] = useState({
    source: [],
    systemDefined: [],
    agentWise: [],
    userWise: [],
    statusWise: [],
    dateStatusWise: null,
    action: null,
    createdModified: 'Created Date',
    sorting: { field: 'Leads', order: 'ASC' },
    createdAtDateOptions: null,
    dateWiseChild: null,
    dateStatusWiseFromDate: currentDate,
    dateStatusWiseToDate: currentDate,
    actionFromDate: currentDate,
    actionToDate: currentDate,
    leadCreatedAt: currentDate,
    followUpdate: currentDate,
    leadCreatedAtToDate: currentDate,
    leadCreatedAtFromDate: currentDate,
  });
  const [modalState, setModalState] = useState(null);

  const [filterAPi, setFilterAPI] = useState({
    sourceApi: [],
    agentWiseApi: [],
    userWiseApi: [],
    statusWiseApi: [],
    dateStatusWiseApi: [],
    actionApi: [],
    createdModifiedApi: [],
    sortingApi: [],
    createdAtDateRangeOptions: [],
    dateWiseChild: [],
  });

  const { getState } = useReduxStore();
  const { userData, token } = getState('Auth');

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(v => v !== value)
        : [...prev[key], value],
    }));
  };

  const toggleSystemDefined = value => toggleFilter('systemDefined', value);

  const setSorting = (field, order) => {
    setFilters(prev => ({
      ...prev,
      sorting: { field, order },
    }));
  };

  const applyFilters = () => {
    goBack();
    params?.afterFilterSelect(filters);
  };

  const resetFilters = () => {
    setFilters({
      source: [],
      systemDefined: [],
      agentWise: [],
      userWise: [],
      statusWise: [],
      dateStatusWise: null,
      action: null,
      createdModified: 'Created Date',
      sorting: { field: 'Leads', order: 'ASC' },
      dateStatusWiseFromDate: currentDate,
      dateStatusWiseToDate: currentDate,
      actionFromDate: currentDate,
      actionToDate: currentDate,
      leadCreatedAtFromDate: currentDate,
      leadCreatedAtToDate: currentDate,
      followUpdate: currentDate,
      dateWiseChild: [],
    });
  };
  console.log(
    'wertyuiopoiuytrertyuiopoiuyter67890poi86543456789009876543wertyu',
    {
      rqst_ke_fntn_vl: `usr_lg_attempt`,
      userLoginToken: token,
      userLoginIDC: userData?.id,
      crm_software_clients_id: userData?.crm_software_clients_id,
      userRoleIndicate: userData?.crm_user_role,
      allowtoEntCrmSctino: userData?.id,
      selectedLeadsCategory: userData?.leads_category_id,
      ...params?.leadType,
    },
  );

  const { mutate } = useMutation({
    mutationFn: () =>
      API.post(params?.url, {
        rqst_ke_fntn_vl: `usr_lg_attempt`,
        userLoginToken: token,
        userLoginIDC: userData?.id,
        crm_software_clients_id: userData?.crm_software_clients_id,
        userRoleIndicate: userData?.crm_user_role,
        allowtoEntCrmSctino: userData?.id,
        selectedLeadsCategory: userData?.leads_category_id,
        ...params?.leadType,
      }),
    onSuccess: ({ ok, data }) => {
      console.log('lkdnklsdnvklsndvknsdkvnlkdsnvsdfsdfsdfsdfs', ok);
      if (ok) {
        setFilterAPI({
          sourceApi:
            data?.filters?.source?.options ??
            data?.filters?.lead_source?.options ??
            [],
          agentWiseApi:
            data?.filters?.agentWise?.options ??
            data?.filter?.agent_wise_filter?.options ??
            [],
          userWiseApi:
            data?.filters?.userWise?.options ??
            data?.filter?.user_wise_filter?.options ??
            [],
          statusWiseApi:
            data?.filters?.statusWise?.options ??
            data?.filter?.status_wise_filter?.options ??
            [],
          dateStatusWiseApi:
            data?.filters?.dateStatus?.status_options ??
            data?.filter?.date_status_wise_filter?.options ??
            [],
          actionApi:
            data?.filters?.actionTask?.options ??
            data?.filter?.action_filter?.options ??
            [],
          createdModifiedApi:
            data?.filters?.createdModified?.range_options ??
            data?.filter?.created_modified_date?.range_options ??
            [],
          sortingApi: data?.filters?.sorting ?? [],
          dateWiseChild: data?.filters?.dateStatus?.action_filter,
          createdAtDateRangeOptions:
            data?.filters?.createdModified?.range_options,
        });
      }
    },
    onError: e => errorMessage(e),
  });

  useEffect(() => {
    mutate();
  }, []);

  return {
    filters,
    updateFilter,
    toggleFilter,
    toggleSystemDefined,
    setSorting,
    applyFilters,
    resetFilters,
    actionApi: filterAPi.actionApi,
    agentWiseApi: filterAPi.agentWiseApi,
    createdModifiedApi: filterAPi.createdModifiedApi,
    dateStatusWiseApi: filterAPi.dateStatusWiseApi,
    sortingApi: filterAPi.sortingApi,
    sourceApi: filterAPi.sourceApi,
    statusWiseApi: filterAPi.statusWiseApi,
    userWiseApi: filterAPi.userWiseApi,
    dateWiseChild: filterAPi.dateWiseChild,
    modalState,
    setModalState,
    currentDate,
    createdAtDateRangeOptions: filterAPi?.createdAtDateRangeOptions,
  };
};
