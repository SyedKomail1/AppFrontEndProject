import React from "react";
import {
  View,
  SafeAreaView,
  Image,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../consts/colors";
import Button from "../../components/Button";


const TourGuideDetails = ({ navigation, route }) => {
  const guide = route.params;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <View style={style.header}>
        <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />
        <Icon name="shopping-cart" size={28} />
      </View>
      <View style={style.imageContainer}>
        <Image
          source={guide.img}
          style={{
            resizeMode: "center",
            width: "100%",
            paddingBottom: 20,
            flex: 1,
          }}
        />
      </View>
      <View style={style.detailsContainer}>
        <ScrollView>
          <View
            style={{
              marginLeft: 20,
              flexDirection: "row",
              alignItems: "flex-end",
            }}
          ></View>
          <View
            style={{
              marginLeft: 20,
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>
              {guide.name}
            </Text>
            <View style={style.priceTag}>
              <Text
                style={{
                  marginLeft: 15,
                  color: COLORS.white,
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                ${guide.price}
              </Text>
            </View>
          </View>
          <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>About</Text>
            <Text
              style={{
                color: "grey",
                fontSize: 16,
                //lineHeight: 22,
                marginTop: 6,
              }}
            >
              {guide.about}
            </Text>
            <View
              style={{
                marginTop: 20,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {/* <View style={style.borderBtn}>
                <Text style={style.borderBtnText}>-</Text>
              </View> */}
                {/* <Text
                style={{
                  fontSize: 20,
                  marginHorizontal: 10,
                  fontWeight: 'bold',
                }}>
                1
              </Text>
              <View style={style.borderBtn}>
                <Text style={style.borderBtnText}>+</Text>
              </View> */}
              </View>

              <Button
          title="Hire Now"
          onPress={() => navigation.navigate("Booking")}
        />

              
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageContainer: {
    flex: 1,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: COLORS.light,
    marginHorizontal: 7,
    marginBottom: 7,
    borderRadius: 30,
    marginTop: 10,
    paddingTop: 30,
  },
  line: {
    width: 25,
    height: 2,
    backgroundColor: COLORS.dark,
    marginBottom: 5,
    marginRight: 3,
  },
  borderBtn: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 40,
  },
  borderBtnText: { fontWeight: "bold", fontSize: 28 },
  buyBtn: {
    width: 130,
    height: 50,
    backgroundColor: COLORS.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  priceTag: {
    backgroundColor: COLORS.green,
    width: 80,
    height: 40,
    justifyContent: "center",
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
});

export default TourGuideDetails;
