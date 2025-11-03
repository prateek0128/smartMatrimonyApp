import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import DropdownInput from "../../components/dropdownInput";
import InputTextField from "../../components/inputTextField";

interface PersonalDetailsStepProps {
  onNext: () => void;
}

interface DropdownOption {
  label: string;
  value: string;
}

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const maritalStatusOptions = [
  { label: "Never Married", value: "never-married" },
  { label: "Divorced", value: "divorced" },
  { label: "Widowed", value: "widowed" },
  { label: "Separated", value: "separated" },
];

const complexionOptions = [
  { label: "Fair", value: "fair" },
  { label: "Wheatish", value: "wheatish" },
  { label: "Brown", value: "brown" },
  { label: "Dark", value: "dark" },
];

const bodyTypeOptions = [
  { label: "Slim", value: "slim" },
  { label: "Average", value: "average" },
  { label: "Athletic", value: "athletic" },
  { label: "Heavy", value: "heavy" },
];

const generateHeightOptions = () => {
  const heights = [];
  for (let feet = 4; feet <= 7; feet++) {
    for (let inches = 0; inches < 12; inches++) {
      const heightStr = `${feet}'${inches}"`;
      heights.push({ label: heightStr, value: heightStr });
    }
  }
  return heights;
};

const heightOptions = generateHeightOptions();

export default function PersonalDetailsStep({ onNext }: PersonalDetailsStepProps) {
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [timeOfBirth, setTimeOfBirth] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [complexion, setComplexion] = useState("");
  const [bodyType, setBodyType] = useState("");

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <LinearGradient
            colors={["#E91E63", "#FF6B9D"]}
            style={styles.iconContainer}
          >
            <Text style={styles.iconText}>👤</Text>
          </LinearGradient>
          <Text style={styles.title}>Personal Info</Text>
          <Text style={styles.subtitle}>Tell us about yourself</Text>
        </View>

        {/* Form Fields */}
        <View style={styles.form}>
          <InputTextField
            inputLabel="Full Name *"
            placeholder="Arvind Maheshwari"
            value={fullName}
            onChangeText={setFullName}
          />

          <DropdownInput
            label="Gender *"
            data={genderOptions}
            placeholder="Select gender"
            value={gender}
            onChange={(value) => setGender(String(value))}
          />

          <View style={styles.row}>
            <View style={styles.halfField}>
              <InputTextField
                inputLabel="Date of Birth *"
                placeholder="DD-MM-YYYY"
                value={dateOfBirth}
                onChangeText={setDateOfBirth}
              />
            </View>

            <View style={styles.halfField}>
              <InputTextField
                inputLabel="Time of Birth"
                placeholder="HH:MM"
                value={timeOfBirth}
                onChangeText={setTimeOfBirth}
              />
            </View>
          </View>

          <InputTextField
            inputLabel="Place of Birth *"
            placeholder="Govardhan"
            value={placeOfBirth}
            onChangeText={setPlaceOfBirth}
          />

          <View style={styles.row}>
            <View style={styles.halfField}>
              <DropdownInput
                label="Height *"
                data={heightOptions}
                placeholder="Select height"
                value={height}
                onChange={(value) => setHeight(String(value))}
              />
            </View>

            <View style={styles.halfField}>
              <InputTextField
                inputLabel="Weight (kg)"
                placeholder="65"
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
              />
            </View>
          </View>

          <DropdownInput
            label="Marital Status *"
            data={maritalStatusOptions}
            placeholder="Select marital status"
            value={maritalStatus}
            onChange={(value) => setMaritalStatus(String(value))}
          />

          <DropdownInput
            label="Complexion"
            data={complexionOptions}
            placeholder="Select complexion"
            value={complexion}
            onChange={(value) => setComplexion(String(value))}
          />

          <DropdownInput
            label="Body Type"
            data={bodyTypeOptions}
            placeholder="Select body type"
            value={bodyType}
            onChange={(value) => setBodyType(String(value))}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  iconText: {
    fontSize: 32,
    color: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2D1B4E",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  form: {
    gap: 20,
  },

  halfField: {
    flex: 1,
    gap: 8,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },

});