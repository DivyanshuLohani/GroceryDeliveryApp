import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";

// TODO: add types
interface ProductImageCarouselProps {
  images: any[];
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
        renderItem={({ item }) => (
          <Image
            source={item}
            style={styles.productImage}
            resizeMode="contain"
          />
        )}
        onSnapToItem={(index) => setCurrentImage(index)}
      />
      <View style={{ flexDirection: "row" }}>
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
              source={image}
              style={[
                styles.carouselPreviewImage,
                { opacity: i === currentImage ? 1 : 0.5 },
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </View>
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
