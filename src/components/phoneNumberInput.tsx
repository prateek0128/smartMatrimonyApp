import React, { useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface Country {
  code: string;
  dial_code: string;
  flag: string;
  name: string;
}

interface PhoneNumberInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  defaultCountry?: string;
  countries?: Country[];
  style?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  label?: string;
  errorMessage?: string;
  disabled?: boolean;
}

// Country data with flags and codes
const COUNTRIES = [
  { code: "IN", dial_code: "+91", flag: "🇮🇳", name: "India" },
  { code: "US", dial_code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "GB", dial_code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "CA", dial_code: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "AU", dial_code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "DE", dial_code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "FR", dial_code: "+33", flag: "🇫🇷", name: "France" },
  { code: "JP", dial_code: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "CN", dial_code: "+86", flag: "🇨🇳", name: "China" },
  { code: "BR", dial_code: "+55", flag: "🇧🇷", name: "Brazil" },
];

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  value = "",
  onChangeText,
  placeholder = "00000 00000",
  defaultCountry = "IN",
  countries = COUNTRIES,
  style,
  inputStyle,
  labelStyle,
  label = "Phone Number",
  errorMessage,
  disabled = false,
}) => {
  const [selectedCountry, setSelectedCountry] = useState(
    countries.find((c) => c.code === defaultCountry) || countries[0]
  );
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectorWidth, setSelectorWidth] = useState(0);
  const [inputContainerHeight, setInputContainerHeight] = useState(0);

  const inputContainerRef = useRef<View>(null);

  const formatIndian = (digits: string) => {
    const d = digits.replace(/\D/g, "").slice(0, 10);
    if (d.length <= 5) return d;
    return d.replace(/(\d{5})(\d{0,5})/, (_, a, b) => (b ? `${a} ${b}` : a));
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setDropdownVisible(false);
  };

  const renderCountryItem = (item: Country) => (
    <TouchableOpacity
      key={item.code}
      style={styles.countryItem}
      onPress={() => handleCountrySelect(item)}
    >
      <Text style={styles.countryFlag}>{item.flag}</Text>
      <Text style={styles.countryName}>{item.name}</Text>
      <Text style={styles.countryCode}>{item.dial_code}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      <View
        ref={inputContainerRef}
        style={styles.inputContainer}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setInputContainerHeight(height);
        }}
      >
        <TouchableOpacity
          style={styles.countrySelector}
          onPress={() => !disabled && setDropdownVisible(!dropdownVisible)}
          disabled={disabled}
          onLayout={(event) => {
            const { width } = event.nativeEvent.layout;
            setSelectorWidth(width);
          }}
        >
          <Text style={styles.flag}>{selectedCountry.flag}</Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </TouchableOpacity>

        <Text style={styles.dialCode}>{selectedCountry.dial_code}</Text>

        <TextInput
          style={[styles.input, inputStyle, disabled && styles.disabled]}
          value={formatIndian(value)}
          onChangeText={(t) => onChangeText && onChangeText(t.replace(/\D/g, "").slice(0, 10))}
          placeholder={placeholder}
          placeholderTextColor="#999"
          keyboardType="phone-pad"
          editable={!disabled}
          maxLength={12}
        />
      </View>

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      {dropdownVisible && (
        <View style={[styles.dropdown, { width: 200, top: inputContainerHeight + (label ? 32 : 0) }]}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            style={styles.dropdownList}
          >
            {countries.map(renderCountryItem)}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    position: "relative",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  countrySelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    height: 38,
    paddingHorizontal: 12,
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    borderRightWidth: 1,
    borderRightColor: "#ddd",
    marginVertical: 1,
  },
  flag: {
    fontSize: 24,
    marginRight: 4,
  },
  dropdownIcon: {
    fontSize: 10,
    color: "#666",
  },
  dialCode: {
    fontSize: 14,
    color: "#000",
    paddingHorizontal: 6,
    marginRight: 6,
    fontWeight: "500",
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#000",
    backgroundColor: "transparent",
  },
  disabled: {
    backgroundColor: "#f5f5f5",
    color: "#999",
  },
  errorText: {
    color: "#ff3b30",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  dropdown: {
    position: "absolute",
    left: 0,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    maxHeight: 150,
    zIndex: 1000,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownList: {
    maxHeight: 150,
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  countryFlag: {
    fontSize: 20,
    marginRight: 8,
  },
  countryName: {
    fontSize: 14,
    color: "#000",
    marginRight: 8,
  },
  countryCode: {
    fontSize: 12,
    color: "#666",
  },
});

export default PhoneNumberInput;
 