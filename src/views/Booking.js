import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
  TextInput,
  StyleSheet,TouchableOpacity,

} from 'react-native';




import COLORS from '../consts/colors';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Loader from '../../components/Looder';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';


const Booking = ({navigation}) => {
  const [inputs, setInputs] = React.useState({
    fullname: '',
    
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

   
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

  

    if (!inputs.fullname) {
      handleError('Please Fill the Field', 'fullname');
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
        AsyncStorage.setItem('userData', JSON.stringify(inputs));
        navigation.navigate('HomeScreen');
      } catch (error) {
        Alert.alert('Error', 'Something went wrong');
      }
    }, 3000);
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{paddingTop: 50, paddingHorizontal: 20}}>
        <Text style={{color: COLORS.black, fontSize: 40, fontWeight: 'bold'}}>
          Payment
        </Text>
         <Text style={{color: COLORS.grey, fontSize: 18, marginVertical: 10}}>
          Enter Your payment Details
        </Text> 
   


        <View style={{flex:1, flexDirection: 'row', }}>
        <View style={{flex: 1,}}>
          <Text style={{fontSize: 14,color: COLORS.grey,}}></Text>
          <TouchableOpacity
          
          style={styles.iconContainer}
        >
          <Ionicons
        style={styles.icon}
        name="card"
        color={COLORS.white}
        size={20}
      />
   <Text style={{fontWeight: 'bold',fontSize: 18, flexDirection: 'row', marginRight: 50, marginTop:10,color: COLORS.white,}}>Bank Card</Text>

        </TouchableOpacity>
        </View>

        <View style={{flex: 1,borderColor: "#cccccc", marginLeft: 10}}>
          <Text style={{fontSize: 14,color: COLORS.grey,}} ></Text>
          <TouchableOpacity
          
              style={styles.iconContainer}
            >
              <Icon
            style={styles.icon}
            name="paypal"
            color={COLORS.white}
            size={20}
          />
       <Text style={{fontWeight: 'bold',fontSize: 18, flexDirection: 'row', marginRight: 80, marginTop:10,color: COLORS.white,}}>Paypal</Text>

            </TouchableOpacity>

        </View>
      


      </View>


      
   
        <View style={{marginVertical: 20}}>
          <Input
            onChangeText={text => handleOnchange(text, 'fullname')}
            onFocus={() => handleError(null, 'fullname')}
            iconName="person"
            label="Cardholder Name"
            placeholder="Enter Cardholder Name"
            error={errors.fullname}
          />

          <Input
            onChangeText={text => handleOnchange(text, 'fullname')}
            onFocus={() => handleError(null, 'fullname')}
            iconName="card"
            label="CardNumber"
            placeholder="Enter your Card Number"
            error={errors.fullname}
          />
           <View style={{flex:1, flexDirection: 'row', }}>
        <View style={{flex: 1,}}>
          <Text style={{fontSize: 14,color: COLORS.grey,}}>Expiration date </Text>
          <Input style={{fontSize: 14,color: COLORS.black,}} maxLength={17}
          onChangeText={text => handleOnchange(text, 'fullname')}
          onFocus={() => handleError(null, 'fullname')}
          //iconName="email-outline"
          //label="Passenger"
          placeholder="Enter Expiration date"
          error={errors.fullname}
          keyboardType="numeric" /> 
        </View>

        <View style={{flex: 1,borderColor: "#cccccc", marginLeft: 10}}>
          <Text style={{fontSize: 14,color: COLORS.grey,}} >CVV</Text>
          <Input style={{fontSize: 14,color: COLORS.grey,}} maxLength={3}
          onChangeText={text => handleOnchange(text, 'fullname')}
          onFocus={() => handleError(null, 'fullname')}
          //iconName="email-outline"
          //label="Passenger"
          placeholder="Enter CVV"
          error={errors.fullname}
          keyboardType="numeric" />


        </View>
      </View>

      <Text style={{color: COLORS.black,fontWeight: 'bold',fontSize: 18, marginVertical: 10}}>
          You have to pay : 
        </Text> 


          <Button title="Pay Now" onPress={validate} />
          <Text
            style={{color: COLORS.black,fontWeight: 'bold',textAlign: 'center',fontSize: 12,
            }}>
            Click pay now to pay the payment
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  criteriaRow: {
    flexDirection: "row",
    padding: 25,
    alignItems: "center",
  },
  horizontalLine: {
    width: "100%",
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  text: {
    paddingLeft: 15,
    paddingBottom: 15,
    marginBottom: 15,
    paddingTop: 15,
  },
  icon: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
  },
  iconContainer: {
    backgroundColor: "red",
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
  },
});



export default Booking;