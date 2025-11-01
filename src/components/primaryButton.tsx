import React from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../assets/styles/colors";
import fontFamily from "../assets/styles/fontFamily";

type PrimaryButtonProps = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  buttonStyle?: ViewStyle | ViewStyle[]; // for TouchableOpacity
  textStyle?: TextStyle | TextStyle[]; // for Text
  variant?: string; // Example variant prop
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  disabled = false,
  buttonStyle,
  textStyle,
  variant = "contained",
}) => {
  // const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.buttonContainer,
        disabled && styles.disabledButton,
        buttonStyle,
      ]}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={["#E91E63", "#FF6B9D"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.button}
      >
        <Text
          style={[
            styles.buttonText,
            textStyle,
          ]}
        >
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 12,
    marginTop: 16,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    fontFamily: fontFamily.Inter500,
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
  },
});

export default PrimaryButton;
