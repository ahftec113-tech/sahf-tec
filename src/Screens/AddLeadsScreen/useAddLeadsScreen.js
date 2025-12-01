import { useEffect, useState } from 'react';
import useReduxStore from '../../Hooks/UseReduxStore';
import { errorMessage } from '../../Config/NotificationMessage';
import { useMutation } from '@tanstack/react-query';
import { AuthUrl } from '../../Utils/Urls';
import API from '../../Utils/helperFunc';

const useAddLeadScreen = () => {
  const [category, setCategory] = useState(null);
  const [source, setSource] = useState(null);
  const [campaignName, setCampaignName] = useState(null);
  const [leadDetail1, setLeadDetail1] = useState(null);
  const [leadDetail2, setLeadDetail2] = useState(null);
  const [leadDetail3, setLeadDetail3] = useState(null);
  const [leadDetail4, setLeadDetail4] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [email, setEmail] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [website, setWebsite] = useState(null);
  const [remarks, setRemarks] = useState(null);
  const [assignTo, setAssignTo] = useState(null);
  const [rating, setRating] = useState('Hot');
  const [status, setStatus] = useState(null);

  const [assignToUserArry, setAssignToUserArry] = useState([]);
  const [souceArry, setSourceArry] = useState([]);
  const [statusArry, setStatusArry] = useState([]);
  const [categoryArry, setCategoryArry] = useState([]);

  const { getState, dispatch } = useReduxStore();
  const { userData, token } = getState('Auth');

  const { mutateAsync } = useMutation({
    mutationFn: data => {
      console.log('lkjsdvlkdsbvklsdbvkldsbvklsdbvbsdklvsd', data);
      return API.post(AuthUrl, data);
    },
    onSuccess: ({ ok, data }) => {
      if (ok) {
        console.log('kjsdkjsdjksdnknskdnklsdnklnsd', data?.data);
      } else errorMessage(data?.message);
    },
    onError: e => errorMessage(e),
  });
  const { mutate } = useMutation({
    mutationFn: data => {
      return API.post(AuthUrl, {
        add_lead_form_option: 'add_lead_form_option',
        userRoleIndicate: 'admin',
        crm_software_clients_id: userData?.crm_software_clients_id,
        selectedLeadsCategory: userData?.leads_category_id,
        allowtoEntCrmSctino: userData?.id,
        userLoginToken: token,
        userLoginIDC: userData?.id,
        rqst_ke_fntn_vl: 'usr_lg_attempt',
      });
    },
    onSuccess: ({ ok, data }) => {
      if (ok) {
        setAssignToUserArry(data?.AssignUserShow);
        setSourceArry(data?.LeadSoureLst);
        setStatusArry(data?.LeadStatusLst);
        setCategoryArry(data?.category);
        console.log('kjsdkjsdjksdnknskdnklsdasdfdsnklnsd', data);
      } else errorMessage(data?.message);
    },
    onError: e => errorMessage(e),
  });
  const checkNum = useMutation({
    mutationFn: data => {
      return API.post(AuthUrl, {
        add_lead_form_option: 'add_lead_form_option',
        userRoleIndicate: 'admin',
        crm_software_clients_id: userData?.crm_software_clients_id,
        selectedLeadsCategory: userData?.leads_category_id,
        allowtoEntCrmSctino: userData?.id,
        userLoginToken: token,
        userLoginIDC: userData?.id,
        rqst_ke_fntn_vl: 'usr_lg_attempt',
      });
    },
    onSuccess: ({ ok, data }) => {
      if (ok) {
        console.log('kjsdkjsdjksdnknskdnklsdasdfdsnklnsd', data);
      } else errorMessage(data?.message);
    },
    onError: e => errorMessage(e),
  });

  useEffect(() => {
    mutate();
  }, []);

  return {
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
  };
};
export default useAddLeadScreen;
