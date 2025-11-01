import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import DropdownInput from "../../components/dropdownInput";
import InputTextField from "../../components/inputTextField";

interface EducationCareerStepProps {
  onNext: () => void;
}

const educationOptions = [
  { label: "High School", value: "high-school" },
  { label: "Diploma", value: "diploma" },
  { label: "Bachelor's Degree", value: "bachelors" },
  { label: "Master's Degree", value: "masters" },
  { label: "Doctorate/PhD", value: "doctorate" },
  { label: "Professional Degree", value: "professional" },
];

const occupationOptions = [
  { label: "Business Owner", value: "business-owner" },
  { label: "Self Employed", value: "self-employed" },
  { label: "Private Job", value: "private-job" },
  { label: "Government Job", value: "government-job" },
  { label: "Professional (Doctor/CA/Lawyer)", value: "professional" },
  { label: "Student", value: "student" },
  { label: "Not Working", value: "not-working" },
  { label: "Other", value: "other" },
];

const incomeOptions = [
  { label: "Below ₹3 Lakhs", value: "below-3" },
  { label: "₹3 - 5 Lakhs", value: "3-5" },
  { label: "₹5 - 7 Lakhs", value: "5-7" },
  { label: "₹7 - 10 Lakhs", value: "7-10" },
  { label: "₹10 - 15 Lakhs", value: "10-15" },
  { label: "₹15 - 20 Lakhs", value: "15-20" },
  { label: "₹20 - 30 Lakhs", value: "20-30" },
  { label: "₹30 - 50 Lakhs", value: "30-50" },
  { label: "₹50 - 75 Lakhs", value: "50-75" },
  { label: "₹75 Lakhs - 1 Crore", value: "75-100" },
  { label: "Above ₹1 Crore", value: "above-100" },
];



export default function EducationCareerStep({ onNext }: EducationCareerStepProps) {
  const [education, setEducation] = useState("");
  const [college, setCollege] = useState("");
  const [occupation, setOccupation] = useState("");
  const [company, setCompany] = useState("");
  const [designation, setDesignation] = useState("");
  const [income, setIncome] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("India");
  const [about, setAbout] = useState("");

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Education & Career</Text>
          <Text style={styles.subtitle}>
            Professional and educational background
          </Text>
        </View>

        {/* Form Fields */}
        <View style={styles.form}>
          <DropdownInput
            label="Highest Education *"
            data={educationOptions}
            placeholder="Select education level"
            value={education}
            onChange={setEducation}
          />

          <InputTextField
            inputLabel="College/University Name"
            placeholder="Enter institution name"
            value={college}
            onChangeText={setCollege}
          />

          <DropdownInput
            label="Occupation *"
            data={occupationOptions}
            placeholder="Select occupation"
            value={occupation}
            onChange={setOccupation}
          />

          <InputTextField
            inputLabel="Company/Business Name"
            placeholder="Enter company or business name"
            value={company}
            onChangeText={setCompany}
          />

          <InputTextField
            inputLabel="Designation/Position"
            placeholder="Enter your designation"
            value={designation}
            onChangeText={setDesignation}
          />

          <DropdownInput
            label="Annual Income *"
            data={incomeOptions}
            placeholder="Select income range"
            value={income}
            onChange={setIncome}
          />

          <InputTextField
            inputLabel="Current City *"
            placeholder="Enter current city"
            value={city}
            onChangeText={setCity}
          />

          <InputTextField
            inputLabel="State *"
            placeholder="Enter state"
            value={state}
            onChangeText={setState}
          />

          <InputTextField
            inputLabel="Country *"
            placeholder="Enter country"
            value={country}
            onChangeText={setCountry}
          />

          <InputTextField
            inputLabel="About Me"
            placeholder="Write a few lines about yourself, your interests, hobbies, and what you're looking for in a partner"
            value={about}
            onChangeText={setAbout}
            multiline
            numberOfLines={4}
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

  textArea: {
    height: 120,
  },

});