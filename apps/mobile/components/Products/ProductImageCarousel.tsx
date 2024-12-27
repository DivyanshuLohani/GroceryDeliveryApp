import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { ScrollView } from "react-native-gesture-handler";

// TODO: add types
interface ProductImageCarouselProps {
  images: string[];
}

const ProductImageCarousel = ({ images }: ProductImageCarouselProps) => {
  const [currentImage, setCurrentImage] = useState<number>(0);
  const carouselRef = React.useRef<ICarouselInstance>(null);

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        ref={carouselRef}
        width={300}
        height={300}
        data={images}
        mode="parallax"
        renderItem={({ item }) => (
          <Image
            source={{ uri: item, width: 300, height: 300 }}
            style={styles.productImage}
            resizeMode="contain"
          />
        )}
        onSnapToItem={(index) => setCurrentImage(index)}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexDirection: "row", marginTop: 10, marginHorizontal: 20 }}
      >
        {images.map((image, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => {
              if (!carouselRef.current) return;

              carouselRef.current.scrollTo({ index: i });
              setCurrentImage(i);
            }}
          >
            <Image
              source={{ uri: image, width: 50, height: 50 }}
              style={[
                styles.carouselPreviewImage,
                { opacity: i === currentImage ? 1 : 0.5 },
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  carouselContainer: {
    alignItems: "center",
    marginVertical: 10,
    flex: 1,
  },
  carouselPreviewImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  productImage: {
    width: 300,
    height: 300,
  },
});

export default ProductImageCarousel;
