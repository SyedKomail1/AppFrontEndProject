import React, { useState } from 'react'

import {SafeAreaView, StyleSheet, View, Text, Image,  FlatList,ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from "../consts/colors";
import foods from '../consts/foods';
import {PrimaryButton} from '../../components/Button';
import Button from "../../components/Button";
import Input from '../../components/Input';
const categories = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", ];





const CartScreen = ({navigation}) => {

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
  const CartCard = ({item}) => {
    return (
      <View style={style.cartCard}>
        <Image source={item.image} style={{height: 80, width: 80}} />
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.name}</Text>
          <Text style={{fontSize: 13, color: COLORS.grey}}>
            {item.ingredients}
          </Text>
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>${item.price}</Text>
        </View>
        <View style={{marginRight: 20, alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>Pay Now</Text>
          {/* <View style={style.actionBtn}>
            <Icon name="remove" size={25} color={COLORS.white} />
            <Icon name="add" size={25} color={COLORS.white} />
          </View> */}
        </View>


      </View>
    );
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <ScrollView>
       <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Cart</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30}}
        data={foods}
        renderItem={({item}) => <CartCard item={item} />}
        ListFooterComponentStyle={{paddingHorizontal: 20, marginTop: 20}}
       
      />
          
      
          <Text style={{ color: COLORS.black, marginLeft: 10, fontSize: 15, fontWeight: "bold" }}>
         Have a coupon? Click here to enter your code
        </Text>
             <View style={{flex:1, flexDirection: 'row', }}>
        <View style={{flex:1}}>
          <Input style={{fontSize: 14,color: COLORS.black,}} maxLength={17}
          onChangeText={text => handleOnchange(text, 'fullname')}
          onFocus={() => handleError(null, 'fullname')}
          //iconName="email-outline"
          //label="Passenger"
          placeholder="Enter Coupon Code"
          error={errors.fullname}
          keyboardType="numeric" /> 
</View>

<View style={{flex:1,borderColor: "#cccccc", marginLeft: 10,margin:10, marginTop: 10}}>
          <Button title="Apply Coupon" />


        </View>
        </View>

        <Button title="Pay all" style={{margin: 60}}  /> 

              
       </ScrollView>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  cartCard: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default CartScreen;