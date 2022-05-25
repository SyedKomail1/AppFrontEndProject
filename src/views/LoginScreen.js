import React from "react";
import { View, Text, SafeAreaView, Keyboard, Alert } from "react-native";
import COLORS from "../consts/colors";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Loader from "../../components/Looder";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


const LoginScreen = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({ email: "", password: "" });
 // const [inputs, setInputs] = React.useState({ email: "zainharoon890@gmail.com", password: "newpass1234" });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError("Please input email", "email");
      isValid = false;
    }
    if (!inputs.password) {
      handleError("Please input password", "password");
      isValid = false;
    }
    if (isValid) {
      login();
    }
  };

  const login = () => {
    setLoading(true);
    console.log(inputs.email, inputs.password);
    axios
      .post("https://tourbook-backend.herokuapp.com/user/login", {
        email: inputs.email,
        password: inputs.password,
      })
      .then((r) => {
        console.log(r);
        if (r.status == 200) {
          setLoading(false);
          console.log(r.data.data.role, "role");
          if (r.data.data.role == "tourist") {
            console.log("your status is ", r.status);
            navigation.navigate("HomeScreen");
          }
          if (r.data.role == "Agency") {
            console.log("your status is ", r.status);
            navigation.navigate("AgencyHomeScreen");
          }
          if (r.data.role == "guide") {
            console.log("your status is ", r.status);
            navigation.navigate("TgHomeScreen");
          }
        } else {
          console.log(r.data.message, "error msg");
          setTimeout(async () => {
            Alert.alert("Error", "helo");
          }, 3000);
        }
  })
  .catch((err) => {
    console.error(err);
    setLoading(false);
  });
};

  
const handleOnchange = (text, input) => {
  setInputs((prevState) => ({ ...prevState, [input]: text }));
};
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader visible={loading} />
      <View style={{ paddingTop: 50, paddingHorizontal: 20 }}>
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}>
          Log In
        </Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
          Enter Your Details to Login
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={(text) => handleOnchange(text, "email")}
            onFocus={() => handleError(null, "email")}
            Name="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "password")}
            onFocus={() => handleError(null, "password")}
            Name="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />

          <Text
            onPress={() => navigation.navigate("ForgetPassword")}
            style={{
              color: COLORS.black,
              fontWeight: "bold",
              textAlign: "left",
              fontSize: 16,
            }}
          >
            Forget Password
          </Text>

          <Button title="Log In" onPress={validate} />
          <Text
            onPress={() => navigation.navigate("RegisterScreen")}
            style={{
              color: COLORS.black,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            Don't have account ?Register
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;