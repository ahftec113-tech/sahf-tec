import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import API from '../../Utils/helperFunc';
import { errorMessage, successMessage } from '../../Config/NotificationMessage';
import useReduxStore from '../../Hooks/UseReduxStore';
import {
  formatDateToMDY,
  getCustom12HourTime,
  getFormattedTimeWithSec,
} from '../../Services/GlobalFunctions';

const useAddComScreen = ({ params }, { goBack }) => {
  const currentDate = new Date();

  const [comKeys, setComKeys] = useState({
    selectedLeadStatus: null,
    selectedProjectName: null,
    selectedPropertyType: null,
    selectedImg: null,
    isPersonal: false,
    selectedCategory: null,
    selectedAreaList: null,
    selectedCityList: null,
    selectedSalesType: null,
    selectedTransferOpt: null,
    selectDate: null,
    selectedTime: null,
  });

  const [noteText, setNoteText] = useState(null);
  const [modalValue, setModalValue] = useState(null);
  const [saleRev, setSaleRev] = useState(null);
  const [price, setPrice] = useState(null);
  const [uniteNo, setUniteNo] = useState(null);
  const [budget, setBudget] = useState(null);

  const {
    selectedLeadStatus,
    selectedProjectName,
    selectedPropertyType,
    selectedImg,
    isPersonal,
    selectedCategory,
    selectedAreaList,
    selectedCityList,
    selectedSalesType,
    selectedTransferOpt,
    selectDate,
    selectedTime,
  } = comKeys;

  const updateValue = (key, value) => {
    setComKeys(prev => ({ ...prev, [key]: value }));
  };

  const { getState, dispatch } = useReduxStore();
  const { userData, token } = getState('Auth');

  console.log(
    'ertyuioiuytredfghjkoiuytrdfghjkmnbcvbnkiuytrdsxcvbnkyfghj',
    {
      goingToAddNewLeadChatDetail: 'goingToAddNewLeadChatDetail',
      userRoleIndicate: userData?.crm_user_role,
      crm_software_clients_id: userData?.crm_software_clients_id,
      selectedLeadsCategory: userData?.leads_category_id,
      allowtoEntCrmSctino: userData?.id,
      userLoginToken: token,
      userLoginIDC: userData?.id,
      rqst_ke_fntn_vl: 'usr_lg_attempt',

      addNewLedChatAddNewComm_leadAssigneeID: params?.leadAssignId,
      addNewLedChatAddNewComm_leadUserID: params?.leadUserId,
      addNewLedChatAddNewComm_leadID: params?.id,
      addNewLedChatAddNewComm_LeadStatus: selectedLeadStatus,
      addNewLedChatAddNewComm_NeedRecommMoreOption: selectedPropertyType,
      addNewLedChatAddNewComm_MoreDetails: noteText,
      addNewLedChatAddNewComm_date: formatDateToMDY(selectDate ?? currentDate),
      addNewLedChatAddNewComm_time: getFormattedTimeWithSec(
        selectedTime ?? currentDate,
      ),

      // addNewLedChatAddNewComm_timeNotification,
      addNewLedChatAddNewComm_ProjName: selectedProjectName,
      addNewLedChatAddNewComm_SaleRevenue: saleRev,
      addNewLedChatAddNewComm_ProjectPrice: price,
      addNewLedChatAddNewComm_UnitNo: uniteNo,
      // addNewLedChatAddNewComm_Tower,
      addNewLedChatAddNewComm_IsPersonal: isPersonal,

      addNewLedChatAddNewComm_budget: budget,
      addNewLedChatAddNewComm_area: selectedAreaList,
      addNewLedChatAddNewComm_propertytype: selectedSalesType,
      addNewLedChatAddNewComm_salestype: selectedSalesType,
    },
    params,
  );

  const { mutate } = useMutation({
    mutationFn: data => {
      return API.post(params?.url, {
        goingToAddNewLeadChatDetail: 'goingToAddNewLeadChatDetail',
        userRoleIndicate: userData?.crm_user_role,
        crm_software_clients_id: userData?.crm_software_clients_id,
        selectedLeadsCategory: userData?.leads_category_id,
        allowtoEntCrmSctino: userData?.id,
        userLoginToken: token,
        userLoginIDC: userData?.id,
        rqst_ke_fntn_vl: 'usr_lg_attempt',

        addNewLedChatAddNewComm_leadAssigneeID: params?.leadAssignId,
        addNewLedChatAddNewComm_leadUserID: params?.leadUserId,
        addNewLedChatAddNewComm_leadID: params?.id,
        addNewLedChatAddNewComm_LeadStatus: selectedLeadStatus,
        addNewLedChatAddNewComm_NeedRecommMoreOption: selectedPropertyType,
        addNewLedChatAddNewComm_MoreDetails: noteText,
        addNewLedChatAddNewComm_date: formatDateToMDY(
          selectDate ?? currentDate,
        ),
        addNewLedChatAddNewComm_time: getFormattedTimeWithSec(
          selectedTime ?? currentDate,
        ),

        // addNewLedChatAddNewComm_timeNotification,
        addNewLedChatAddNewComm_ProjName: selectedProjectName,
        addNewLedChatAddNewComm_SaleRevenue: saleRev,
        addNewLedChatAddNewComm_ProjectPrice: price,
        addNewLedChatAddNewComm_UnitNo: uniteNo,
        // addNewLedChatAddNewComm_Tower,
        addNewLedChatAddNewComm_IsPersonal: isPersonal,

        addNewLedChatAddNewComm_budget: budget,
        addNewLedChatAddNewComm_area: selectedAreaList,
        addNewLedChatAddNewComm_propertytype: selectedSalesType,
        addNewLedChatAddNewComm_salestype: selectedSalesType,
      });
    },
    onSuccess: ({ ok, data }) => {
      console.log('kjsdkjsdjksdnknskdnklsdasdfdsnklnsd', data);
      if (ok) {
        successMessage(data?.message);
        goBack();
      } else errorMessage(data?.message);
    },
    onError: e => errorMessage(e),
  });

  return {
    updateValue,
    selectedLeadStatus,
    selectedProjectName,
    selectedPropertyType,
    selectedImg,
    isPersonal,
    selectedCategory,
    selectedAreaList,
    selectedCityList,
    selectedSalesType,
    setComKeys,
    selectedTransferOpt,
    noteText,
    setNoteText,
    modalValue,
    setModalValue,
    selectDate,
    selectedTime,
    comKeys,
    currentDate,
    budget,
    setBudget,
    uniteNo,
    setUniteNo,
    price,
    setPrice,
    saleRev,
    setSaleRev,
    onPress: () => mutate(),
  };
};

export default useAddComScreen;
