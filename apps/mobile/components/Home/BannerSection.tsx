import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

const banners = [
  {
    id: "1",
    image: require("@/assets/images/Banner.png"),
    title: "Enjoy the special offer upto 30%",
    subtitle: "From 14th June, 2022",
  },
  {
    id: "2",
    image: require("@/assets/images/Banner.png"),
    title: "Get 50% off on your first order",
    subtitle: "Valid until 20th June, 2022",
  },
  {
    id: "3",
    image: require("@/assets/images/Banner.png"),
    title: "Fresh vegetables delivered to your door",
    subtitle: "Order now and save big!",
  },
];

export default function PromoCarousel() {
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const animatedValues = useRef(
    banners.map(() => new Animated.Value(8)) // Initialize all dots with a width of 8
  ).current;

  useEffect(() => {
    // Animate the active dot width
    animatedValues.forEach((value, index) => {
      Animated.timing(value, {
        toValue: activeSlide === index ? 20 : 8, // Active dot width is 20, others are 8
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
  }, [activeSlide]);

  const renderBanner = ({ item }: { item: (typeof banners)[0] }) => (
    <Image source={item.image} style={styles.image} />
  );

  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={width - 30}
        height={(width - 30) / 2}
        data={banners}
        renderItem={renderBanner}
        ref={carouselRef}
        onSnapToItem={(index) => setActiveSlide(index)}
        mode="parallax"
      />
      <View style={styles.pagination}>
        {banners.map((_, index) => (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              {
                width: animatedValues[index], // Use Animated width
              },
              activeSlide === index ? styles.activeDot : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 10,
    padding: 10,
  },
  image: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  pagination: {
    flexDirection: "row",
    marginTop: 10,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#4CAF50",
  },
});
