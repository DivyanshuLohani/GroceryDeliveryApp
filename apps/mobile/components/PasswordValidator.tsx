import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

interface PasswordValidatorProps {
  password: string;
}

const PasswordValidator = ({ password }: PasswordValidatorProps) => {
  const [strength, setStrength] = useState("");

  const validatePassword = (input: string) => {
    if (input.length < 8) {
      setStrength("weak");
    } else if (/^[a-zA-Z]+$/.test(input)) {
      setStrength("weak");
    } else if (/^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]+$/.test(input)) {
      setStrength("average");
    } else if (
      /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+$/.test(
        input
      )
    ) {
      setStrength("strong");
    } else {
      setStrength("");
    }
  };

  useEffect(() => {
    validatePassword(password);
  }, [password]);

  const getStrengthColor = () => {
    switch (strength) {
      case "weak":
        return styles.weak;
      case "average":
        return styles.average;
      case "strong":
        return styles.strong;
      default:
        return styles.default;
    }
  };

  return (
    <View>
      <Text style={styles.strengthText}>
        {strength ? (
          <>
            Password Strength:{" "}
            <Text style={getStrengthColor()}>{strength}</Text>
          </>
        ) : null}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  strengthText: {
    fontSize: 16,
    textAlign: "left",
    marginTop: -10,
    marginBottom: 10,
  },
  weak: {
    color: "red",
  },
  average: {
    color: "#FFC107",
  },
  strong: {
    color: "green",
  },
  default: {
    color: "#333",
  },
});

export default PasswordValidator;
