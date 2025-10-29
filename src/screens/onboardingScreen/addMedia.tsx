// src/screens/onboarding/BioPhotos.tsx
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { OnboardingStackParamList } from "../../types/navigation";

type Props = NativeStackScreenProps<OnboardingStackParamList, "AddMedia">;

export default function AddMedia({ navigation }: Props) {
  const [step, setStep] = useState<1 | 2>(1);

  // Biodata
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");

  // Photos (demo)
  const [count, setCount] = useState(0);

  const nextFromBiodata = () => {
    if (!fullName.trim() || !dob.trim()) {
      Alert.alert("Incomplete", "Please fill Full Name and Date of Birth.");
      return;
    }
    setStep(2);
  };

  const finish = () => {
    if (count < 1) {
      Alert.alert("Add a Photo", "Please add at least one photo to continue.");
      return;
    }
    // If you want to pass data forward:
    // navigation.navigate("InfoForm", { fullName, dob, photosCount: count } as any);
    navigation.navigate("PersonalDetails");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Onboarding</Text>
      <Text style={styles.stepper}>Step {step} / 2</Text>

      {step === 1 ? (
        <>
          <Text style={styles.title}>Biodata</Text>

          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="e.g. Jane Doe"
          />

          <Text style={[styles.label, { marginTop: 12 }]}>Date of Birth</Text>
          <TextInput
            style={styles.input}
            value={dob}
            onChangeText={setDob}
            placeholder="YYYY-MM-DD"
          />

          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.btn, styles.secondary]}
              onPress={() => setStep(2)}
            >
              <Text style={styles.secondaryText}>Skip →</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={nextFromBiodata}>
              <Text style={styles.btnText}>Next →</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.title}>Photos</Text>
          <Text style={styles.subtitle}>
            Upload a couple of photos to continue.
          </Text>

          <View style={styles.dropzone}>
            <Text style={{ color: "#6B7280" }}>📷 Demo Dropzone</Text>
            <TouchableOpacity
              style={styles.upload}
              onPress={() => setCount((c) => c + 1)}
            >
              <Text style={{ color: "#fff", fontWeight: "700" }}>
                Add Photo
              </Text>
            </TouchableOpacity>
            <Text style={{ marginTop: 8 }}>Added: {count}</Text>
          </View>

          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.btn, styles.secondary]}
              onPress={() => setStep(1)}
            >
              <Text style={styles.secondaryText}>← Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={finish}>
              <Text style={styles.btnText}>Continue →</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  header: { fontSize: 14, color: "#6B7280" },
  stepper: { fontSize: 12, color: "#9CA3AF", marginBottom: 8 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#555", marginBottom: 16 },
  label: { fontSize: 14, color: "#6B7280", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  dropzone: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  upload: {
    backgroundColor: "#111827",
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  row: { flexDirection: "row", justifyContent: "space-between", marginTop: 24 },
  btn: {
    backgroundColor: "#4F46E5",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  btnText: { color: "#fff", fontWeight: "600" },
  secondary: { backgroundColor: "#F3F4F6" },
  secondaryText: { color: "#111827", fontWeight: "600" },
});
