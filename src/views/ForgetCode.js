import React from "react";
import { View, Text, SafeAreaView, Keyboard, Alert } from "react-native";
import COLORS from "../consts/colors";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Loader from "../../components/Looder";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ForgetCode = ({ navigation }) => {
  const [code, setCode] = React.useState("");
  const [errors, setErrors] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!code) {
      handleError("Please input code", "code");
      isValid = false;
    }
    if(code === await getVerifyCode() && isValid) {
      navigation.navigate("NewPass");
    }
    else{Alert.alert("wrong verification code");}
  };
  const getVerifyCode = async () => {
    try {
      const value = await AsyncStorage.getItem('code')
      if(value !== null) {
        console.log( "getdata vala",value)
        return value
      }
    } catch(e) {
      // error reading value
    }
  }
  const verifyCode = async () => {
    setLoading(true);
    
    await axios.post("http://tourbook-backend.herokuapp.com/user/forgot", { email }).then(res => {
        setVerifyCode(res.data.data.toString());
        const verifycode = AsyncStorage.getItem('code');
        console.log(res.data.data,"is my code");
        setLoading(false);
        navigation.navigate("ForgetCode");


      }).catch((err) => {console.log(err); setLoading(false);Alert.alert(console.error(err));});

  };

  const handleOnchange = (text) => {
    setCode(text);
  };

  const handleError = (error) => {
    setErrors(error);
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader visible={loading} />
      <View style={{ paddingTop: 50, paddingHorizontal: 20 }}>
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}>
          Verify your Code
        </Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
        A 5-digit code has been sent to your email;
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={(text) => handleOnchange(text)}
            onFocus={() => handleError(null)}
            iconName="mail-outline"
            label="Enter Verification code"
            placeholder="Enter Code"
            error={errors}
          />

          <Button
            title="Submit"
            onPress={() => validate()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgetCode;
