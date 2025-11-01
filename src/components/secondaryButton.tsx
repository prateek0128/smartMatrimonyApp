import React from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { colors } from "../assets/styles/colors";
import fontFamily from "../assets/styles/fontFamily";

type SecondaryButtonProps = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  buttonStyle?: ViewStyle | ViewStyle[]; // for TouchableOpacity
  textStyle?: TextStyle | TextStyle[]; // for Text
  variant?: string; // Example variant prop
};

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
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
        styles.button,
        disabled && styles.disabledButton,
        buttonStyle, // allows caller to override/add styles
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          {
            // color:
            //   variant == "outlined"
            //     ? theme === "dark"
            //       ? colors.white
            //       : colors.octodenaryText
            //     : theme === "dark"
            //     ? colors.darkPrimaryText
            //     : colors.nonaryText,
          },
          textStyle, // allows caller to override/add styles
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.secondaryButtonColor,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.secondaryBorderColor,
  },
  disabledButton: {
    opacity: 0.5,
    borderWidth: 1,
    borderColor: colors.secondaryBorderColor,
  },
  buttonText: {
    fontFamily: fontFamily.Inter500,
    fontSize: 16,
    color: colors.primaryText,
  },
});

export default SecondaryButton;
