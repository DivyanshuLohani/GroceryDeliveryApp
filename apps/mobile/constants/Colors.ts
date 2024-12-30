/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#333", // Dark text for light theme
    background: "#FFF9DB", // Light yellow background
    tint: "#007AFF", // Golden yellow for highlights
    icon: "#B0B0B0", // Light gray for icons
    tabIconDefault: "#B0B0B0", // Default tab icon
    tabIconSelected: "#FFC107", // Selected tab icon
    inputBackground: "#FFFCF2", // Light input background
    accent: "#f0d37d", // Golden yellow for highlights
    inputBorder: "#FFC107", // Golden yellow for input border
  },
  dark: {
    text: "#ECEDEE", // Light text for dark theme
    background: "#151718", // Dark background
    tint: "#FFC107", // Golden yellow for highlights
    icon: "#9BA1A6", // Light gray for icons in dark theme
    tabIconDefault: "#9BA1A6", // Default tab icon
    tabIconSelected: "#FFC107", // Selected tab icon
    inputBackground: "#1E1E1E", // Dark input background
  },
};
