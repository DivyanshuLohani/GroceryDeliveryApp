import { View, Text } from "react-native";
import React from "react";
import useAuth from "@/hooks/useAuth";
import { Redirect } from "expo-router";

const IndexPage = () => {
  const { auth } = useAuth();

  if (auth) return <Redirect href="/home" />;

  return <Redirect href="/login" />;
};

export default IndexPage;
