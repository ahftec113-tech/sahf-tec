// src/screens/LeadListScreen/useLeadListScreen.js
import { useMutation } from '@tanstack/react-query';
import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import useReduxStore from '../../Hooks/UseReduxStore';
import { errorMessage } from '../../Config/NotificationMessage';
import API from '../../Utils/helperFunc';

/**
 * Mock API – replace with your real endpoint later
 */
const fetchLeads = async (page = 1, filters = {}) => {
  // Simulate network delay
  await new Promise(r => setTimeout(r, 300));

  // ----- MOCK DATA (same shape as the screenshot) -----
  const allLeads = [
    {
      id: 1,
      name: 'ARSHAD KAMAL',
      mobile: '3008248910',
      status: 'Contact in Future',
    },
    {
      id: 2,
      name: 'Dr Beenish',
      mobile: '0332 8793246',
      status: 'Contact in Future',
    },
    { id: 3, name: 'Azam', mobile: '03277699368', status: 'Lost Lead' },
    {
      id: 4,
      name: 'Dr Beenish',
      mobile: '0332 8793246',
      status: 'Contact in Future',
    },
    {
      id: 5,
      name: 'Adeel hashmi',
      mobile: '03432878341',
      status: 'Meeting Confirmed',
    },
    {
      id: 6,
      name: 'SALAH UDDIN',
      mobile: '3333551778',
      status: 'Attempted To Contact',
    },
    {
      id: 7,
      name: 'ABID HUSSAIN',
      mobile: '3332306773',
      status: 'Pre-Qualified',
    },
    { id: 8, name: 'Unknown', mobile: '03333364347', status: 'Lost Lead' },
    { id: 9, name: 'Ashfaq', mobile: '03312288533', status: 'Lost Lead' },
    { id: 10, name: 'unknown', mobile: '3008232198', status: 'Junk Lead' },
    // … add more if you want pagination
  ];

  const pageSize = 10;
  const start = (page - 1) * pageSize;
  const paginated = allLeads.slice(start, start + pageSize);

  return {
    data: paginated,
    total: 124505, // as shown in the screenshot
    page,
    pageSize,
  };
};

const useLeadListScreen = ({ params }) => {
  const { getState, dispatch } = useReduxStore();
  const { userData, token } = getState('Auth');

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({}); // you can extend later

  const loadPage = useCallback(
    async (p = 1) => {
      setLoading(true);
      try {
        const res = await fetchLeads(p, filters);
        setLeads(p === 1 ? res.data : prev => [...prev, ...res.data]);
        setTotal(res.total);
        setPage(res.page);
      } catch (e) {
        Alert.alert('Error', 'Failed to load leads');
      } finally {
        setLoading(false);
      }
    },
    [filters],
  );

  // initial load
  // useEffect(() => {
  //   loadPage(1);
  // }, [loadPage]);

  const onRefresh = () => loadPage(1);
  const onEndReached = () => {
    if (leads.length < total && !loading) {
      loadPage(page + 1);
    }
  };

  const { mutate } = useMutation({
    mutationFn: data => {
      console.log('lkjsdvlkdsbvklsdbvkldsbvklsdbvbsdklvsd', {
        rqst_ke_fntn_vl: `usr_lg_attempt`,
        userLoginToken: token,
        userLoginIDC: userData?.id,
        crm_software_clients_id: userData?.crm_software_clients_id,
        userRoleIndicate: userData?.crm_user_role,

        allowtoEntCrmSctino: userData?.id,
        selectedLeadsCategory: userData?.leads_category_id,
        ...data,
      });
      return API.post(params?.url, {
        rqst_ke_fntn_vl: `usr_lg_attempt`,
        userLoginToken: token,
        userLoginIDC: userData?.id,
        crm_software_clients_id: userData?.crm_software_clients_id,
        userRoleIndicate: userData?.crm_user_role,

        allowtoEntCrmSctino: userData?.id,
        selectedLeadsCategory: userData?.leads_category_id,
        ...data,
      });
    },
    onSuccess: ({ ok, data }) => {
      console.log('iuudshisodfiodsfiodsfsdlvsdlkvnldsknvklsdv', data);
      if (ok) {
        setLeads(data?.crm_data?.data);
        setTotal(data?.crm_data?.total);
        setPage(data?.crm_data?.current_page);
        setTotalPages(data?.crm_data?.last_page);
        // setPageData(data?.crm_data?.last_page);
      }
      // else errorMessage(data?.message);
    },
    onError: e => errorMessage(e),
  });

  useEffect(() => {
    mutate(params?.leadListType);
  }, []);

  return {
    leads,
    loading,
    total,
    onRefresh,
    onEndReached,
    setFilters, // expose for filter UI later
    page,
    totalPages,
    mutate,
  };
};

export default useLeadListScreen;
