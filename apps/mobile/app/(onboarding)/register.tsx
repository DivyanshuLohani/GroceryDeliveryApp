import PasswordValidator from "@/components/PasswordValidator";
import { Link, useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const SignupScreen = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Sign up to get started</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        placeholderTextColor="#B0B0B0"
      />

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        placeholderTextColor="#B0B0B0"
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor="#B0B0B0"
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#B0B0B0"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#B0B0B0"
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        value={password}
        onChangeText={setPassword}
      />
      <PasswordValidator password={password} />
      <TouchableOpacity style={styles.signupButton}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <TouchableOpacity>
          <Text style={styles.loginLink} onPress={() => navigation.goBack()}>
            Log In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9DB",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFC107",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#B0B0B0",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#FFC107",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#FFFCF2",
    color: "#333",
  },
  signupButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFC107",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  signupButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  loginText: {
    fontSize: 14,
    color: "#333",
  },
  loginLink: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFC107",
  },
});

export default SignupScreen;
