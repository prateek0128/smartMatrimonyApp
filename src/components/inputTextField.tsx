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
  error?: string;
}

// 👇 Wrap component in forwardRef

const InputTextField = forwardRef<TextInput, InputTextFieldProps>(
  ({ style, inputLabel, error, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>{inputLabel}</Text>
        <TextInput
          ref={ref}
          style={[
            styles.defaultInput, 
            isFocused && styles.focusedInput,
            error && styles.errorInput, 
            style
          ]}
          placeholderTextColor={colors.tertiaryText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          scrollEnabled={false}
          multiline={false}
          textAlignVertical="center"
          {...props}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
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
    height: 42,
    borderWidth: 1,
    borderColor: colors.primaryBorderColor,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    lineHeight: 20,
    color: colors.secondaryText,
    fontFamily: fontFamily.Inter400,
    backgroundColor: colors.white,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  focusedInput: {
    borderColor: colors.primaryPink,
  },
  errorInput: {
    borderColor: "#F44336",
  },
  errorText: {
    fontSize: 12,
    color: "#F44336",
    fontFamily: fontFamily.Inter400,
  },
});

export default InputTextField;
