import React, { useRef, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

const banners = [
  {
    id: "1",
    image: require("@/assets/images/Banner.png"), // Replace with your image URL
    title: "Enjoy the special offer upto 30%",
    subtitle: "From 14th June, 2022",
  },
  {
    id: "2",
    image: require("@/assets/images/Banner.png"), // Replace with your image URL
    title: "Get 50% off on your first order",
    subtitle: "Valid until 20th June, 2022",
  },
  {
    id: "3",
    image: require("@/assets/images/Banner.png"), // Replace with your image URL
    title: "Fresh vegetables delivered to your door",
    subtitle: "Order now and save big!",
  },
];

export default function PromoCarousel() {
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const renderBanner = ({ item }: { item: (typeof banners)[0] }) => (
    <Image source={item.image} style={styles.image} />
  );

  return (
    <View style={styles.container}>
      <Carousel
        loop
        scrollAnimationDuration={5000}
        width={width}
        height={width / 2}
        autoPlay={true}
        data={banners}
        renderItem={renderBanner}
        ref={carouselRef}
        onSnapToItem={(index) => setActiveSlide(index)}
      />
      <View style={styles.pagination}>
        {banners.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
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
  },
  banner: {
    width: "100%",
    height: 180,
    justifyContent: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    borderRadius: 10,

    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  textContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    marginTop: 5,
  },
  pagination: {
    flexDirection: "row",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#4CAF50",
  },
});
