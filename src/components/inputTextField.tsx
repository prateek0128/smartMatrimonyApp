import { forwardRef, useState } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from "react-native";
import { colors } from "../assets/styles/colors";
import fontFamily from "../assets/styles/fontFamily";
interface InputTextFieldProps extends TextInputProps {
  style?: StyleProp<TextStyle>;
  inputLabel?: string;
}

// 👇 Wrap component in forwardRef

const InputTextField = forwardRef<TextInput, InputTextFieldProps>(
  ({ style, inputLabel, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>{inputLabel}</Text>
        <TextInput
          ref={ref}
          style={[styles.defaultInput, style]}
          placeholderTextColor={colors.tertiaryText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  inputContainer: { gap: 8 },
  inputLabel: {
    fontFamily: fontFamily.Inter500,
    fontSize: 14,
    color: colors.secondaryText,
  },
  defaultInput: {
    height: 40,
    borderWidth: 1,
    borderColor: colors.primaryBorderColor,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 12,
    fontSize: 14,
    color: colors.secondaryText,
    fontFamily: fontFamily.Inter400,
    backgroundColor: colors.white,
  },
});

export default InputTextField;
