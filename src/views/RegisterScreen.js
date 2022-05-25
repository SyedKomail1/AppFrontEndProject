import AsyncStorage from "@react-native-async-storage/async-storage";
import React,{ useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
} from "react-native";

import COLORS from "../consts/colors";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Loader from "../../components/Looder";
import { Picker } from "@react-native-picker/picker";


const RegisterScreen = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    email: "",
    fullname: "",
    firstname:"",
    lastname:"",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError("Please input email", "email");
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please input a valid email", "email");
      isValid = false;
    }

    if (!inputs.fullname) {
      handleError("Please input fullname", "fullname");
      isValid = false;
    }

    if (!inputs.fullname) {
      handleError("Please input firstname", "firstname");
      isValid = false;
    }

    if (!inputs.fullname) {
      handleError("Please input lastname", "lastname");
      isValid = false;
    }

    if (!inputs.phone) {
      handleError("Please input phone number", "phone");
      isValid = false;
    }

    if (!inputs.password) {
      handleError("Please input password", "password");
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError("Min password length of 5", "password");
      isValid = false;
    }

    if (isValid) {
      register();
    }
  };

  const register = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        setLoading(false);
        AsyncStorage.setItem("userData", JSON.stringify(inputs));
        navigation.navigate("LoginScreen");
      } catch (error) {
        Alert.alert("Error", "Something went wrong");
      }
    }, 3000);
  };

  const [selectedLanguage, setSelectedLanguage] = useState();


  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}
      >
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}>
          Register
        </Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
          Enter Your Details to Register
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
            onChangeText={(text) => handleOnchange(text, "firstname")}
            onFocus={() => handleError(null, "firstname")}
            Name="account-outline"
            label="First Name"
            placeholder="Enter your firstname"
            error={errors.firstname}
          />

<Input
            onChangeText={(text) => handleOnchange(text, "lastname")}
            onFocus={() => handleError(null, "lastname")}
            Name="account-outline"
            label="Last Name"
            placeholder="Enter your lastname"
            error={errors.firstname}
          />

          <Input
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "phone")}
            onFocus={() => handleError(null, "phone")}
            Name="phone-outline"
            label="Phone Number"
            placeholder="Enter your phone no"
            error={errors.phone}
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




<View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Picker
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedLanguage(itemValue)
                }
              >
                <Picker.Item label="Tourist " value="java" />
                <Picker.Item label="Agency" value="js" />
                <Picker.Item label="Tour Guide" value="js" />

              </Picker>
            </View>
          </View>


          <Button title="Register" onPress={validate} />
          <Text
            onPress={() => navigation.navigate("LoginScreen")}
            style={{
              color: COLORS.black,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            Already have account ?Login
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
