import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { colors } from "../assets/styles/colors";
import fontFamily from "../assets/styles/fontFamily";

type PasswordInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  containerStyle?: ViewStyle | ViewStyle[];
  inputStyle?: TextStyle | TextStyle[];
  showInfo?: boolean;
  showStrengthBar?: boolean;
  title?: string;
  error?: string | boolean;
};

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChangeText,
  placeholder = "Enter password",
  containerStyle,
  inputStyle,
  showInfo = true,
  showStrengthBar = true,
  title,
  error = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    const criteria = {
      length: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    if (criteria.length) strength++;
    if (criteria.uppercase) strength++;
    if (criteria.lowercase) strength++;
    if (criteria.number) strength++;
    if (criteria.symbol) strength++;

    return { strength, criteria };
  };

  const getStrengthColor = (index: number, currentStrength: number) => {
    if (index >= currentStrength) return colors.neutral; // Default gray state
    
    if (currentStrength <= 2) return colors.error; // Red for 1-2 bars
    if (currentStrength <= 3) return colors.warning; // Yellow for 1-3 bars  
    return colors.success; // Green for all 4 bars
  };

  const { strength, criteria } = getPasswordStrength(value);
  
  // Auto-detect error state based on password length only
  const hasError = !!error || (value.length > 0 && value.length < 6);

  return (
    <View style={[styles.container, containerStyle]}>
      {title && (
        <Text style={styles.title}>{title}</Text>
      )}
      <View style={styles.inputContainer}>
        <View style={styles.passwordIcon}>
          <Svg width="14" height="16" viewBox="0 0 14 16" fill="none">
            <Path 
              d="M6.97222 10.0833V11.6389M2.30556 14.75H11.6389C12.498 14.75 13.1944 14.0536 13.1944 13.1944V8.52778C13.1944 7.66867 12.498 6.97222 11.6389 6.97222H2.30556C1.44645 6.97222 0.75 7.66867 0.75 8.52778V13.1944C0.75 14.0536 1.44645 14.75 2.30556 14.75ZM10.0833 6.97222V3.86111C10.0833 2.14289 8.69044 0.75 6.97222 0.75C5.254 0.75 3.86111 2.14289 3.86111 3.86111V6.97222H10.0833Z" 
              stroke="#4B5563" 
              strokeWidth="1.5" 
              strokeLinecap="round"
            />
          </Svg>
        </View>
        <TextInput
          style={[
            styles.input,
            isFocused && styles.inputFocused,
            hasError && styles.inputError,
            inputStyle,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={!isPasswordVisible}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor="#999"
          textContentType="password"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Ionicons
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={20}
            color="#666666"
          />
        </TouchableOpacity>
      </View>
      
      {showStrengthBar && isFocused && (
        <View style={styles.strengthContainer}>
          <View style={styles.strengthBars}>
            {[0, 1, 2, 3].map((index) => (
              <View
                key={index}
                style={[
                  styles.strengthBar,
                  {
                    backgroundColor: getStrengthColor(index, strength),
                  },
                ]}
              />
            ))}
          </View>
          
          {showInfo && (
          
          <View style={styles.criteriaContainer}>
            <Text style={[styles.criteriaText, criteria.length ? styles.criteriaValid : styles.criteriaInvalid]}>
              • Password should be 6 digits long or more
            </Text>
            <Text style={[styles.criteriaText, criteria.uppercase ? styles.criteriaValid : styles.criteriaInvalid]}>
              • It should include 1 upper case
            </Text>
            <Text style={[styles.criteriaText, criteria.lowercase ? styles.criteriaValid : styles.criteriaInvalid]}>
              • It should include 1 lower case
            </Text>
            <Text style={[styles.criteriaText, criteria.number ? styles.criteriaValid : styles.criteriaInvalid]}>
              • It should include 1 number
            </Text>
            <Text style={[styles.criteriaText, criteria.symbol ? styles.criteriaValid : styles.criteriaInvalid]}>
              • It should include 1 symbol at least
            </Text>
          </View>
          )}
        </View>
      )}
      {typeof error === 'string' && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  title: {
    fontSize: 14,
    fontFamily: fontFamily.Inter500,
    fontWeight: "500",
    lineHeight: 16,
    color: colors.black,
    marginBottom: 8,
  },
  inputContainer: {
    position: "relative",
    width: "100%",
  },
  input: {
    height: 42,
    width: "100%",
    borderWidth: 1,
    borderColor: colors.primaryBorderColor,
    borderRadius: 8,
    paddingLeft: 45,
    paddingRight: 50,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: fontFamily.Inter400,
    color: colors.black,
    backgroundColor: colors.white,
  },
  passwordIcon: {
    position: "absolute",
    left: 15.78,
    top: "50%",
    transform: [{ translateY: -8 }],
    zIndex: 1,
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: [{ translateY: -10 }],
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },

  inputFocused: {
    borderColor: colors.primaryBorderColor,
    borderWidth: 1,
  },
  inputError: {
    borderColor: colors.error,
    borderWidth: 1,
  },
  strengthContainer: {
    marginTop: 12,
  },
  strengthBars: {
    flexDirection: "row",
    gap: 4,
    marginBottom: 12,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  criteriaContainer: {
    gap: 4,
  },
  criteriaText: {
    fontSize: 12,
    fontFamily: fontFamily.Inter400,
  },
  criteriaValid: {
    color: "#00AA00",
  },
  criteriaInvalid: {
    color: "#666666",
  },
  errorText: {
    fontSize: 12,
    color: "#F44336",
    fontFamily: fontFamily.Inter400,
    marginTop: 4,
  },
});

export default PasswordInput;