import { useMutation } from '@tanstack/react-query';
import { AuthUrl, baseURL } from '../../Utils/Urls';
import API from '../../Utils/helperFunc';
import { errorMessage } from '../../Config/NotificationMessage';
import { useEffect, useState } from 'react';
import useReduxStore from '../../Hooks/UseReduxStore';

const useDashboardScreen = () => {
  const { getState, dispatch } = useReduxStore();
  const { userData, token } = getState('Auth');

  const [selected, setSelected] = useState();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(); // default selected
  const [items, setItems] = useState([]);

  const [upperTabsArry, setUpperTabsArry] = useState([]);
  const [pageData, setPageData] = useState({});

  const { mutate } = useMutation({
    mutationFn: data => {
      console.log('lkjsdvlkdsbvklsdbvkldsbvklsdbvbsdklvsd', data);
      return API.post(AuthUrl, data);
    },
    onSuccess: ({ ok, data }) => {
      if (ok) {
        console.log('kjsdkjsdjksdnknskdnklsdnklnsd', data?.data);
        setUpperTabsArry([
          ...data?.data?.TopMenuLink,
          {
            id: 'attendance',
            top_menus: 'Mark Attendance',
          },
        ]);
        const modifyData = data?.data?.LeadsCategory.map(res => ({
          label: res?.leads_category,
          value: res?.id,
        }));
        setSelected(modifyData[0]);
        setItems(modifyData);
        mutateAsync({
          // selectedLeadsCategory: 4,
          selectedLeadsCategory: modifyData[0]?.value,
        });
      } else errorMessage(data?.message);
    },
    onError: e => errorMessage(e),
  });
  const { mutateAsync } = useMutation({
    mutationFn: data => {
      console.log('lkjsdvlkdsbvklsdbvkldsbvklsdbvbsdklvsd', data);
      return API.post(AuthUrl, {
        ...data,
        rqst_ke_fntn_vl: `usr_lg_attempt`,
        userLoginToken: token,
        userLoginIDC: userData?.id,
        crm_software_clients_id: userData?.crm_software_clients_id,
        userRoleIndicate: `admin`,
        goingToUpdateLeadsCategoryId: 'goingToUpdateLeadsCategoryId',
      });
    },
    onSuccess: ({ ok, data }) => {
      console.log('iuudshisodfiodsfiodsf', data);
      if (ok) {
        setPageData(data?.data);
      } else errorMessage(data?.message);
    },
    onError: e => errorMessage(e),
  });

  useEffect(() => {
    mutate({
      rqst_ke_fntn_vl: 'usr_lg_attempt',
      userLoginToken: token,
      userLoginIDC: userData?.id,
      dashboard: 'dashboard',
      crm_software_clients_id: userData?.crm_software_clients_id,
    });
  }, []);

  return {
    upperTabsArry,
    pageData,
    dispatch,
    open,
    setOpen,
    value,
    setValue,
    items,
    setItems,
    selected,
    setSelected,
    onValueChange: mutateAsync,
  };
};

export default useDashboardScreen;
