import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { colors } from "../assets/styles/colors";
import fontFamily from "../assets/styles/fontFamily";

type DropdownItem = {
  label: string;
  value: string | number;
};

type DropdownInputProps = {
  label?: string;
  data: DropdownItem[];
  placeholder?: string;
  value: string | number | null;
  onChange: (value: string | number) => void;
};

const DropdownInput: React.FC<DropdownInputProps> = ({
  label,
  data,
  placeholder = "Select an option",
  value,
  onChange,
}) => {
  return (
    <View style={styles.dropdownContainer}>
      {label && <Text style={styles.inputLabel}>{label}</Text>}

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.itemTextStyle}
        containerStyle={styles.dropdownMenuContainer}
        iconStyle={styles.iconStyle}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        onChange={(item) => onChange(item.value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: { gap: 8 },
  inputLabel: {
    fontFamily: fontFamily.Inter500,
    fontSize: 14,
    color: colors.secondaryText,
  },
  dropdown: {
    height: 40,
    borderWidth: 1,
    borderColor: colors.primaryBorderColor,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.white,
  },
  placeholderStyle: { color: colors.tertiaryText, fontSize: 14 },
  selectedTextStyle: {
    fontSize: 14,
    color: colors.secondaryText,
    fontFamily: fontFamily.Inter400,
  },
  itemTextStyle: {
    color: colors.secondaryText,
    fontSize: 15,
    fontFamily: fontFamily.Inter400,
  },
  dropdownMenuContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    //paddingHorizontal: 8,
  },
  iconStyle: { width: 20, height: 20, tintColor: "#666" },
});

export default DropdownInput;
