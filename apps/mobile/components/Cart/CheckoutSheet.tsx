import { View, Text, StyleSheet } from "react-native";
import React, { useMemo, useState } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useCart } from "@/hooks/useCart";
import { Colors } from "@/constants/Colors";
import EmptyCartPage from "@/app/(cart)/checkout";
import OrderDetails from "./OrderDetails";
import { TouchableOpacity } from "react-native-gesture-handler";

const CheckoutSheet = () => {
  const bottomSheetRef = React.useRef<BottomSheet>(null);

  const snapIndices = useMemo(() => ["20%", "50%"], []);
  const { total } = useCart();
  // const router = useRouter();

  // Function to handle checkout
  const handleCheckout = () => {
    bottomSheetRef.current?.snapToIndex(1);
  };

  return (
    <>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutButtonText}>Go to Checkout</Text>
          <Text style={styles.totalText}>₹{total}</Text>
        </TouchableOpacity>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapIndices}
        index={-1}
        enablePanDownToClose
        enableDynamicSizing
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            pressBehavior={"close"}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
          />
        )}
      >
        <BottomSheetView style={styles.contentContainer}>
          <OrderDetails onClose={() => bottomSheetRef.current?.close()} />
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  totalText: {
    right: 16,
    fontSize: 16,
    backgroundColor: Colors.light.accent,
    padding: 6,
    borderRadius: 10,
  },
  checkoutButton: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 2,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 16,
    alignSelf: "center",
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
});

export default CheckoutSheet;
