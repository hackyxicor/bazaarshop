import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Keyboard, TouchableOpacity, TextInput, Button } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import auth from '@react-native-firebase/auth';

// import { GREY_3, TEXT_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from '../../constant/color.constant';
// import TextInput from '../../component/text-input/text-input.component';
// import Button from '../../component/button/button.component';

const STEPS = {
  MOBILE_NUMBER_INPUT: 1,
  OTP_INPUT: 2
}

class LoginScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      loading: false,
      mobile: '',
      otp: ''
    }
  }

  componentDidMount = () => {
    this.fechMobileNumber();

    auth().onAuthStateChanged((user) => {
      if (user) {
        // if (result.success) {
        //   const userObj = result.response;
        //   const token = result.token;

        //   const userRecord = Object.assign(userObj, { token });
        //   this.props.setUserAction(userRecord)
        //   APP.TOKEN = token;

        //   const userDetailSet = IsUserDetailsSet(userRecord);
        //   if (!userDetailSet.allStepDone) {
        //     resetToScreen('UserDetailInput', { step: userDetailSet.step });
        //   } else {
        //     resetToScreen('TabNavigator');
        //   }

        //   this.props.fetchGames();
        //   this.props.fetchTournaments();
        //   this.props.fetchBattle();
        //   this.props.fetchAllJoinedMatchAction();
        // } else {
        //   this.setState({ loading: false });
        // }
      }
    })
  }

  fechMobileNumber = async () => {
  }

  componentWillUnmout() {
  }

  inputHandler = (mobile) => {
    this.setState({ mobile });

    if (mobile.length == 10) {
      Keyboard.dismiss();
    }
  }

  inputOTPHandler = (otp) => {
    this.setState({ otp });

    if (otp.length == 6) {
      Keyboard.dismiss();
    }
  }

  isButtonDisabled = () => {
    return (!(this.state.mobile.length == 10) || this.state.loading)
  }

  editMobileNumber = () => {
    this.setState({ step: 1 })
  }

  resendOTP = async () => {
    this.setState({ loading: true });
    // await PublicApi.ResendOTP(this.state.otpRef);
    this.setState({ loading: false });
  }

  proceed = () => {
    this.setState({ loading: true, step: 2 })
  }

  generateOTP = async () => {
    const { mobile } = this.state;
    this.setState({ loading: true });
    const confirm = await auth().signInWithPhoneNumber(`+91 ${mobile}`);
    this.setState({ loading: false });
    if (confirm) {
      this.setState({ step: STEPS.OTP_INPUT, confirm });
    }
  }

  verifyOTP = async () => {
    const { mobile, otp } = this.state;
    this.setState({ loading: true });
    await this.state.confirm.confirm(otp);
    this.setState({ loading: false });
  }

  RenderMobileNumberInputForm = () => {
    return (
      <>
        <View style={{ paddingTop: 5, paddingBottom: 5 }} >
          <Text style={styles.fontMini} >Hey, what's your</Text>
        </View>
        <View style={{ paddingTop: 5, paddingBottom: 5 }} >
          <Text style={styles.fontH1} >Mobile number?</Text>
        </View>
        <View style={{ paddingTop: 5, paddingBottom: 5 }} >
          <Text style={styles.fontMiniLight} >Don't worry! We just need it to send OTP</Text>
        </View>
        <View style={styles.inputTextContainer} >
          <TextInput
            label="Mobile Number"
            prefix="+91"
            placeholder="Enter Mobile Number"
            keyboardType="number-pad"
            maxLength={10}
            value={this.state.mobile}
            onChangeText={this.inputHandler}
          />
        </View>
        <View style={styles.buttonContainer} >
          <Button
            title="PROCEED"
            loading={this.state.loading}
            disabled={this.isButtonDisabled()}
            onPress={this.generateOTP}
          />
        </View>
      </>
    )
  }

  RenerOTPInputForm = () => {
    return (
      <>
        <View style={{ paddingTop: 5, paddingBottom: 5 }} >
          <Text style={styles.fontMini} >Share your</Text>
        </View>
        <View style={{ paddingTop: 5, paddingBottom: 5 }} >
          <Text style={styles.fontH1} >Verification code</Text>
        </View>
        <View style={{ paddingTop: 5, paddingBottom: 5 }} >
          <Text style={styles.fontMiniLight} >Code sent to this number</Text>
        </View>
        <View style={{ paddingTop: 0, paddingBottom: 5, flexDirection: 'row' }} >
          <Text style={styles.mobileNumberText} >{`+91 ${this.state.mobile}`}</Text>
          <TouchableOpacity onPress={this.editMobileNumber} >
            <Text style={styles.editText} >Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputTextContainer} >
          <OTPInputView
            pinCount={6}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeChange={(code) => {
            }}
            onCodeFilled={(code => {
              this.setState({ otp: code })
            })}
          />
        </View>
        <View style={styles.otpButtonContainer} >
          <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
            <Button
              loading={this.state.loading}
              disabled={this.isButtonDisabled()}
              title={'PROCEED'}
              onPress={this.verifyOTP}
            />
          </View>
        </View>
      </>
    )
  }

  render() {
    const { step } = this.state;

    return (
      <ScrollView
        style={styles.container}
      >
        {step == STEPS.MOBILE_NUMBER_INPUT ? this.RenderMobileNumberInputForm() : null}
        {step == STEPS.OTP_INPUT ? this.RenerOTPInputForm() : null}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  fontMini: {
    // color: GREY_3,
    fontSize: 14,
    fontWeight: '500'
  },
  fontH1: {
    // color: TEXT_COLOR,
    fontSize: 22,
    fontWeight: '500'
  },
  fontMiniLight: {
    // color: GREY_3,
    fontSize: 14,
    fontWeight: '300'
  },
  inputTextContainer: {
    height: 100,
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  },
  buttonContainer: {
    height: 100,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  otpButtonContainer: {
    flexDirection: 'row',
    height: 100,
  },
  mobileNumberText: {
    fontSize: 14,
    // color: PRIMARY_COLOR
  },
  editText: {
    // color: SECONDARY_COLOR,
    fontSize: 14,
    fontWeight: '500',
    paddingLeft: 10,
    paddingRight: 10
  },
  borderStyleHighLighted: {
    // borderColor: PRIMARY_COLOR,
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    // borderColor: PRIMARY_COLOR,
  },
})

export default LoginScene;