import { View, Text } from "react-native";
import React from "react";
import CarouselFullScreen from "./CarouselFullScreen";
import Header from "./Header";
import Headers from "./Headers";

const FullScreen = () => {
  return (
    <View>
      {/* <Header /> */}
      <View style={{ padding: 15 }}>
        <Header isCart={true} name={`Back`} />
      </View>
      <CarouselFullScreen />
    </View>
  );
};

export default FullScreen;
