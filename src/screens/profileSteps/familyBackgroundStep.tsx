import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import DropdownInput from "../../components/dropdownInput";
import InputTextField from "../../components/inputTextField";

interface FamilyBackgroundStepProps {
  onNext: () => void;
}

const casteOptions = [
  { label: "Agarwal", value: "agarwal" },
  { label: "Maheshwari", value: "maheshwari" },
  { label: "Marwari", value: "marwari" },
  { label: "Jain", value: "jain" },
  { label: "Khandelwal", value: "khandelwal" },
  { label: "Bansal", value: "bansal" },
  { label: "Gupta", value: "gupta" },
  { label: "Other", value: "other" },
];

const rashiOptions = [
  { label: "Mesh (Aries)", value: "mesh" },
  { label: "Vrishabh (Taurus)", value: "vrishabh" },
  { label: "Mithun (Gemini)", value: "mithun" },
  { label: "Kark (Cancer)", value: "kark" },
  { label: "Singh (Leo)", value: "singh" },
  { label: "Kanya (Virgo)", value: "kanya" },
  { label: "Tula (Libra)", value: "tula" },
  { label: "Vrishchik (Scorpio)", value: "vrishchik" },
  { label: "Dhanu (Sagittarius)", value: "dhanu" },
  { label: "Makar (Capricorn)", value: "makar" },
  { label: "Kumbh (Aquarius)", value: "kumbh" },
  { label: "Meen (Pisces)", value: "meen" },
];

const manglikOptions = [
  { label: "No", value: "no" },
  { label: "Yes", value: "yes" },
  { label: "Anshik (Partial)", value: "anshik" },
  { label: "Don't Know", value: "dont-know" },
];

const familyTypeOptions = [
  { label: "Joint Family", value: "joint" },
  { label: "Nuclear Family", value: "nuclear" },
];

const familyStatusOptions = [
  { label: "Upper Class", value: "upper-class" },
  { label: "Upper Middle Class", value: "upper-middle" },
  { label: "Middle Class", value: "middle-class" },
  { label: "Lower Middle Class", value: "lower-middle" },
];

const numberOptions = [
  { label: "0", value: "0" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
];



export default function FamilyBackgroundStep({ onNext }: FamilyBackgroundStepProps) {
  const [caste, setCaste] = useState("");
  const [subcaste, setSubcaste] = useState("");
  const [gotra, setGotra] = useState("");
  const [birthplace, setBirthplace] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [rashi, setRashi] = useState("");
  const [manglik, setManglik] = useState("");
  const [familyType, setFamilyType] = useState("");
  const [familyStatus, setFamilyStatus] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [fatherOccupation, setFatherOccupation] = useState("");
  const [motherName, setMotherName] = useState("");
  const [motherOccupation, setMotherOccupation] = useState("");
  const [brothers, setBrothers] = useState("");
  const [sisters, setSisters] = useState("");
  const [familyDetails, setFamilyDetails] = useState("");

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Family & Background</Text>
          <Text style={styles.subtitle}>
            Tell us about your family and community
          </Text>
        </View>

        {/* Form Fields */}
        <View style={styles.form}>
          <DropdownInput
            label="Caste/Community *"
            data={casteOptions}
            placeholder="Select your caste"
            value={caste}
            onChange={setCaste}
          />

          <InputTextField
            inputLabel="Sub-Caste"
            placeholder="Enter sub-caste (optional)"
            value={subcaste}
            onChangeText={setSubcaste}
          />

          <InputTextField
            inputLabel="Gotra *"
            placeholder="Enter your gotra"
            value={gotra}
            onChangeText={setGotra}
          />

          <InputTextField
            inputLabel="Birth Place *"
            placeholder="City, State"
            value={birthplace}
            onChangeText={setBirthplace}
          />

          <InputTextField
            inputLabel="Birth Time"
            placeholder="HH:MM (24-hour format)"
            value={birthTime}
            onChangeText={setBirthTime}
          />

          <DropdownInput
            label="Rashi (Moon Sign)"
            data={rashiOptions}
            placeholder="Select rashi"
            value={rashi}
            onChange={setRashi}
          />

          <DropdownInput
            label="Manglik Status *"
            data={manglikOptions}
            placeholder="Select manglik status"
            value={manglik}
            onChange={setManglik}
          />

          <DropdownInput
            label="Family Type *"
            data={familyTypeOptions}
            placeholder="Select family type"
            value={familyType}
            onChange={setFamilyType}
          />

          <DropdownInput
            label="Family Status"
            data={familyStatusOptions}
            placeholder="Select family status"
            value={familyStatus}
            onChange={setFamilyStatus}
          />

          <InputTextField
            inputLabel="Father's Name *"
            placeholder="Enter father's name"
            value={fatherName}
            onChangeText={setFatherName}
          />

          <InputTextField
            inputLabel="Father's Occupation"
            placeholder="Enter occupation"
            value={fatherOccupation}
            onChangeText={setFatherOccupation}
          />

          <InputTextField
            inputLabel="Mother's Name *"
            placeholder="Enter mother's name"
            value={motherName}
            onChangeText={setMotherName}
          />

          <InputTextField
            inputLabel="Mother's Occupation"
            placeholder="Enter occupation"
            value={motherOccupation}
            onChangeText={setMotherOccupation}
          />

          <View style={styles.row}>
            <View style={styles.halfField}>
              <DropdownInput
                label="No. of Brothers"
                data={numberOptions}
                placeholder="Select"
                value={brothers}
                onChange={setBrothers}
              />
            </View>

            <View style={styles.halfField}>
              <DropdownInput
                label="No. of Sisters"
                data={numberOptions}
                placeholder="Select"
                value={sisters}
                onChange={setSisters}
              />
            </View>
          </View>

          <InputTextField
            inputLabel="About Family"
            placeholder="Share more about your family values, business background, etc."
            value={familyDetails}
            onChangeText={setFamilyDetails}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            style={styles.textArea}
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
    marginBottom: 32,
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

  textArea: {
    height: 96,
  },

});