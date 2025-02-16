import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const CarouselProduct = ({ images }) => {
  const flatlistRef = useRef(null);
  const screenWidth = Dimensions.get("window").width;
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation();

  // //  console.log("productTop", productTop);
  // Auto Scroll
  useEffect(() => {
    if (!images?.length) return; // Avoid running if no data

    const interval = setInterval(() => {
      const nextIndex = activeIndex >= images.length - 1 ? 0 : activeIndex + 1;

      // Use safe scrolling with bounds checking
      try {
        flatlistRef.current.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        setActiveIndex(nextIndex);
      } catch (error) {
        console.warn("Scroll to index failed", error);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [activeIndex, images?.length]);

  const getItemLayout = (data, index) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index,
  });
//  console.log(images,'full')
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("FullScreen", { images })}
    >
      <Image
        source={{ uri: item }}
        style={{ height: 400, width: screenWidth }}
      />
    </TouchableOpacity>
  );

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth); // Round to avoid floating-point issues
    setActiveIndex(index);
  };

  const renderDotIndicators = () =>
    images?.map((_, index) => (
      <View
        key={index}
        style={{
          backgroundColor: activeIndex === index ? "green" : "red",
          height: 8,
          width: 8,
          borderRadius: 4,
          marginHorizontal: 6,
        }}
      />
    ));

  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={images}
        ref={flatlistRef}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        keyExtractor={(item) => item.toString()}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 5,
          alignItems: "center",
        
        
        }}
      >
        {renderDotIndicators()}
      </View>
    </View>
  );
};

export default CarouselProduct;

const styles = StyleSheet.create({});
