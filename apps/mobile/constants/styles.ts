import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

const theme = Colors.light; // You can toggle this to Colors.dark for dark mode

const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: theme.tint,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: theme.inputBackground,
    color: theme.text,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: theme.tint,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.background,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.tint,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: theme.icon,
    marginBottom: 20,
  },
  linkText: {
    fontSize: 14,
    fontWeight: "bold",
    color: theme.tint,
  },
  text: {
    fontSize: 14,
    color: theme.text,
  },
});

export default defaultStyles;
