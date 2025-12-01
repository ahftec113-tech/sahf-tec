import { types } from '../types';
import { updateAuth } from '../Action/AuthAction';
import { loadingFalse, loadingTrue } from '../Action/isloadingAction';
// import {
//   appleIdlogin,
//   emailLogin,
//   emailSignUp,
//   faceBookLogin,
//   forgotPasswordServices,
//   googleLogin,
// } from '../../Utils/SocialLogin';
import {
  fcmRegService,
  // getFbResult,
  // logOutFirebase,
  loginService,
  registerService,
  updateProfileService,
} from '../../Services/AuthServices';
import { errorMessage, successMessage } from '../../Config/NotificationMessage';
import NavigationService from '../../Services/NavigationService';

// const loginObject = {
//   Google: () => googleLogin(),
//   facebook: () => faceBookLogin(),
//   email: data => emailSignUp(data),
//   appleID: () => appleIdlogin(),
// };

export const loginThunk =
  ({ datas, type }) =>
  async dispatch => {
    console.log(':ibsdbvksdbnvksldvsd', type, datas);
    dispatch(loadingTrue());
    try {
      const { email, password } = datas;
      //   const getLoginData = loginObject[type];
      //   const resultData = await getLoginData(datas);
      //   const { socialData, ok } = { socialData: resultData, ok: true };

      //   if (ok) {
      // const idTokenResult = await getFbResult();
      // const jwtToken = idTokenResult.token;

      // if (jwtToken) {
      console.log('klweflksdbvkldsblkvsd', {
        LGEmail: email,
        LGPassword: password,
        user_lng_val: 1231231231,
        user_lat_val: 1231231231,
        goingToLogin: 'LogIn',
        user_device_desktop_val: 1,
        user_device_mobile_val: 1,
      });
      const { data, ok } = await loginService({
        // token: jwtToken,
        LGEmail: email,
        LGPassword: password,
        user_lng_val: 1231231231,
        user_lat_val: 1231231231,
        goingToLogin: 'LogIn',
        user_device_desktop_val: 1,
        user_device_mobile_val: 1,
      });
      console.log('lskdbvlksdbklvbsdsdfsdfklbvklsdbvksd', data);
      if (ok) {
        dispatch(updateAuth(data?.user));
      } else {
        console.log('lskdbvlksdbklvbsdklbvklsdbvksd', data);
        errorMessage(data?.message);
      }
      // }
      //   }
    } catch (error) {
      const errorStr =
        error?.message?.split(' ')?.slice(1)?.join(' ') ?? error.message;
      errorMessage(errorStr);
      console.log('Login Error:', error.toString());
    } finally {
      dispatch(loadingFalse());
    }
  };

export const registerThunk =
  ({ datas }) =>
  async dispatch => {
    dispatch(loadingTrue());
    try {
      const { email, password, full_name } = datas;
      //   const result = await emailLogin(datas);
      //   const { data, ok } = { data: result, ok: true };

      //   if (ok) {
      //     const idTokenResult = await getFbResult();
      //     const jwtToken = idTokenResult.token;

      //     if (jwtToken) {
      const { data, ok } = await registerService({
        user_name: full_name,
        email,
        password,
        userLoginProcess_val: 'user_register',
      });

      if (ok) {
        dispatch(loginThunk({ datas }));
      } else {
        errorMessage(data?.message);
      }
      //     }
      //   }
    } catch (error) {
      const errorStr =
        error?.message?.split(' ')?.slice(1)?.join(' ') ?? error.message;
      errorMessage(errorStr);
      console.log('Register Error:', error.toString());
    } finally {
      dispatch(loadingFalse());
    }
  };

export const logoutThunk = () => async dispatch => {
  try {
    dispatch({ type: types.LogoutType });
    await logOutFirebase();
    console.log('Logged out successfully');
  } catch (error) {
    errorMessage(error.message.split(' ').slice(1).join(' '));
  } finally {
    dispatch(loadingFalse());
  }
};

export const updateProfileThunk = profileData => async dispatch => {
  dispatch(loadingTrue());
  try {
    const { ok, data } = await updateProfileService(profileData);
    console.log('lskdbvklsdbvklsdbkvlsldkvklds', data);
    if (ok) {
      dispatch({ type: types.UpdateProfile, payload: data.data?.user });
      successMessage('Your profile has been updated');
      NavigationService.goBack();
    }
  } catch (error) {
    errorMessage(error.message.split(' ').slice(1).join(' '));
  } finally {
    setTimeout(() => {
      dispatch(loadingFalse());
    }, 2000);
  }
};

export const fcmRegisterThunk = token => async () => {
  await fcmRegService(token);
};

export const forgotPasswordThunk = email => async dispatch => {
  try {
    dispatch(loadingTrue());
    await forgotPasswordServices(email);
    successMessage('Password Reset Request has been sent to your mail');
    NavigationService.navigate('LoginScreen');
  } catch (error) {
    errorMessage(error.message.split(' ').slice(1).join(' '));
  } finally {
    setTimeout(() => {
      dispatch(loadingFalse());
    }, 1000);
  }
};
