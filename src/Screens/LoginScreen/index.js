import React, { memo, useState } from 'react';
import { View, Image, ImageBackground } from 'react-native';
import { TextComponent } from '../../Components/TextComponent';
import { styles } from './styles';
import ThemeButton from '../../Components/ThemeButton';
import { afhLogo, sahfLogo } from '../../Assets';
import { InputComponent } from '../../Components/InputComponent';
import useLogin from './useLoginScreen';
import KeyBoardWrapper from '../../Components/KeyBoardWrapper';
import { LoginBg } from '../../Assets';
import { hp, wp } from '../../Hooks/useResponsive';
import { HeaderComponent } from '../../Components/HeaderComp';

const LoginScreen = ({ navigation }) => {
  const [check, setCheck] = useState();

  const {
    handleSubmit,
    errors,
    reset,
    control,
    getValues,
    onPress,
    loginUser,
    appleIdlogin,
    googleLoginFunc,
    facebookLoginFunc,
    rememberValue,
    remember,
    socialLoginFun,
  } = useLogin(navigation);

  return (
    <ImageBackground style={styles.ImgBg} source={LoginBg}>
      {/* <Image source={logoImg} resizeMode="contain" style={styles.logoImage} /> */}
      <HeaderComponent />
      <KeyBoardWrapper
        styles={styles.logInMain}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={sahfLogo}
          resizeMode="contain"
          style={{ width: wp('35'), height: hp('10'), alignSelf: 'center' }}
        />
        <TextComponent
          text={'Login to Admin Panel'}
          styles={styles.signInText}
        />
        <TextComponent
          text={'Enter your email and password to log in.'}
          styles={{
            textAlign: 'center',
            marginTop: hp('2'),
            marginBottom: hp('10'),
          }}
        />
        <InputComponent
          {...{
            name: 'email',
            handleSubmit,
            errors,
            reset,
            control,
            getValues,
            placeholder: 'Enter email',
            //   isImage: sms,
            defaultValue: __DEV__ ? 'simon@simon.com' : '',
            viewStyle: { height: hp('5') },
            inputIconStyle: { flex: 0.4 },
          }}
        />

        <InputComponent
          {...{
            name: 'password',
            handleSubmit,
            errors,
            reset,
            control,
            getValues,
            placeholder: 'Enter password',
            //   isImage: locksetting,
            defaultValue: __DEV__ ? '77777777' : '',
            isSecure: true,
            inputIconStyle: styles.inputIconPassword,
            viewStyle: { height: hp('5') },
            inputIconStyle: { flex: 0.4 },
          }}
        />

        {/* <View style={styles.forgotContainer}>
          <TextComponent
            text={'Forgot Password?'}
            styles={styles.forgetText}
            onPress={() => navigation.navigate('ForgotPasswordScreen')}
          />
        </View> */}

        <View style={styles.buttonRow}>
          <ThemeButton
            // onPress={() => navigation.navigate('SubscriptionScreen')}
            onPress={handleSubmit(loginUser)}
            title={'Log In'}
            isTheme
            // style={styles.buttonStyle}
            textStyle={styles.buttonText}
          />
        </View>

        {/* <View style={styles.barMain}>
          <View style={styles.barLine}></View>
          <TextComponent
            text={'Or Continue With'}
            styles={styles.barText}
            isThemeColor
            family={'400'}
          />
          <View style={styles.barLine}></View>
        </View> */}

        {/* <SocialBottomComp onSocialPress={socialLoginFun} /> */}
        {/* <View style={styles.dontHave}>
          <TextComponent
            text={'----------- Powered By AHF Technologies -----------'}
            styles={styles.dontHaveText}
            isThemeColor
          />
        </View> */}
        {/* <View style={styles.dontHave}>
          <TextComponent
            text={'Don’t have an account?'}
            styles={styles.dontHaveText}
          />
          <Touchable onPress={onPress}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </Touchable>
        </View> */}
      </KeyBoardWrapper>
    </ImageBackground>
  );
};

export default memo(LoginScreen);
