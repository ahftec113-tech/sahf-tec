import { View, Text } from 'react-native';
import React, { memo } from 'react';
import ThemeButton from '../../Components/ThemeButton';
import { wp } from '../../Hooks/useResponsive';
import { HeaderComponent } from '../../Components/HeaderComp';
import useReduxStore from '../../Hooks/UseReduxStore';
import { types } from '../../Redux/types';
import { getProperLocation } from '../../Services/GlobalFunctions';

const MarkAttendanceScreen = () => {
  const { dispatch, getState } = useReduxStore();
  const { attendanceTime } = getState('attendanceTime');
  console.log(
    'attendanceTimeattendanceTimeattendanceTimeattendanceTimeattendanceTimeattendanceTime',
    attendanceTime,
  );
  return (
    <>
      <HeaderComponent headerTitle={'Make Attendance'} isBack />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ThemeButton
          title={attendanceTime == null ? 'Punch In' : 'Punch Out'}
          style={{ width: wp('50') }}
          onPress={async () => {
            const location = await getProperLocation();
            console.log(
              'locationlocationlocationlocationlocation',
              location?.location?.coords,
            );
            if (attendanceTime == null) {
              dispatch({
                type: types?.makeAtt,
              });
            } else {
              dispatch({
                type: types?.removeAtt,
              });
            }
          }}
        />
      </View>
    </>
  );
};

export default memo(MarkAttendanceScreen);
