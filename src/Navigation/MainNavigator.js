import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigationService from '../Services/NavigationService';
import * as Screens from '../Screens/index';
import useReduxStore from '../Hooks/UseReduxStore';
import MybottomTabs from './BottomNavigation';
import Drawernavigation from './Drawernavigation';

const Stack = createNativeStackNavigator();

function MainNavigator() {
  const { getState } = useReduxStore();
  //   const { onboarding } = getState('onboarding');
  const { isLogin, userData } = getState('Auth');
  return (
    <NavigationContainer
      ref={ref => {
        NavigationService.setRef(ref);
        // const p = NavigationService.getCurrentRoute(ref.getCurrentRoute());
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true,
          headerTitle: null,
          headerShown: false,
        }}
      >
        {!isLogin && (
          <>
            {/* <Stack.Screen
              name="WelcomeScreen"
              component={Screens.WelcomeScreen}
            /> */}
            <Stack.Screen name="LoginScreen" component={Screens.LoginScreen} />
            <Stack.Screen
              name="RegisterScreen"
              component={Screens.RegisterScreen}
            />
          </>
        )}
        {isLogin && (
          <>
            <Stack.Screen
              name="DashboardScreen"
              component={Screens.DashboardScreen}
            />
            <Stack.Screen
              name="AddComScreen"
              component={Screens.AddComScreen}
            />
            <Stack.Screen
              name="AddLeadsScreen"
              component={Screens.AddLeadsScreen}
            />
            <Stack.Screen
              name="MarkAttendanceScreen"
              component={Screens.MarkAttendanceScreen}
            />
            <Stack.Screen
              name="WhatappMsgScreen"
              component={Screens.WhatappMsgScreen}
            />
            <Stack.Screen
              name="LeadReportScreen"
              component={Screens.LeadReportScreen}
            />
            <Stack.Screen
              name="LeadDetailScreen"
              component={Screens.LeadDetailScreen}
            />
            <Stack.Screen
              name="LeadFilterScreen"
              component={Screens.LeadFilterScreen}
            />

            <Stack.Screen
              name="CallSyncScreen"
              component={Screens.CallSyncScreen}
            />
            <Stack.Screen
              name="LeadListScreen"
              component={Screens.LeadListScreen}
            />
            <Stack.Screen
              name="CodeTypeSelectorScreen"
              component={Screens.CodeTypeSelectorScreen}
            />
            <Stack.Screen
              name="ListTableScreen"
              component={Screens.ListTableScreen}
            />
            <Stack.Screen
              name="PostIssueFormScreen"
              component={Screens.PostIssueFormScreen}
            />
            <Stack.Screen name="ChatScreen" component={Screens.ChatScreen} />
            <Stack.Screen
              name="FormDisplayScreen"
              component={Screens.FormDisplayScreen}
            />
            <Stack.Screen
              name="POIDDetailsScreen"
              component={Screens.POIDDetailsScreen}
            />
            <Stack.Screen
              name="TypeCodeScreen"
              component={Screens.TypeCodeScreen}
            />
            <Stack.Screen
              name="TableDataScreen"
              component={Screens.TableDataScreen}
            />
            <Stack.Screen
              name="OrderListDetailScreen"
              component={Screens.OrderListDetailScreen}
            />
            {/* <Stack.Screen name="WelcomeScreen" component={Screens.WelcomeScreen} />
        <Stack.Screen name="LoginScreen" component={Screens.LoginScreen} />
        <Stack.Screen
          name="RegisterScreen"
          component={Screens.RegisterScreen}
        /> */}
            <Stack.Screen
              name="SavedAdsScreen"
              component={Screens.SavedAdsScreen}
            />
            <Stack.Screen
              name="OrderDetailScreen"
              component={Screens.OrderDetailScreen}
            />
            <Stack.Screen
              name="QRCodeScanScreen"
              component={Screens.QRCodeScanScreen}
            />
            <Stack.Screen
              name="OrderBrowserScreen"
              component={Screens.OrderBrowserScreen}
            />
            <Stack.Screen
              name="FavorateScreen"
              component={Screens.FavorateScreen}
            />
            <Stack.Screen
              name="CreateListingScreen"
              component={Screens.CreateListingScreen}
            />
            <Stack.Screen name="QuotaScreen" component={Screens.QuotaScreen} />
            <Stack.Screen
              name="EditProfileScreen"
              component={Screens.EditProfileScreen}
            />

            <Stack.Screen
              name="ProjectDetailScreen"
              component={Screens.ProjectDetailScreen}
            />
            <Stack.Screen
              name="DraftAdScreen"
              component={Screens.DraftAdScreen}
            />
            <Stack.Screen
              name="ProjectListScreen"
              component={Screens.ProjectListScreen}
            />
            <Stack.Screen
              name="FilterScreen"
              component={Screens.FilterScreen}
            />
            <Stack.Screen
              name="ListViewScreen"
              component={Screens.ListViewScreen}
            />
            <Stack.Screen
              name="Drawernavigation"
              component={Drawernavigation}
            />
            <Stack.Screen
              name="ProjectsScreen"
              component={Screens.ProjectsScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;
