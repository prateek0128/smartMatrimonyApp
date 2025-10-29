// src/screens/onboarding/InfoForm.tsx
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

type Props = NativeStackScreenProps<
  OnboardingStackParamList,
  "PersonalDetails"
>;

export default function PersonalDetails({ navigation }: Props) {
  const [about, setAbout] = useState("");

  const finish = () => {
    // Demo: finalize and go to MainTabs (root)
    // If your RootStack uses a different name, adjust "MainTabs".
    navigation.getParent()?.reset({
      index: 0,
      routes: [{ name: "MainTabs" as never }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Info Form</Text>
      <Text style={styles.subtitle}>Tell us a bit more about you.</Text>

      <TextInput
        style={[styles.input, { height: 120 }]}
        value={about}
        onChangeText={setAbout}
        placeholder="About me..."
        multiline
      />

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.btn, styles.secondary]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.secondaryText}>← Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            if (!about.trim()) {
              Alert.alert(
                "Form Incomplete",
                "Please add a short bio to continue."
              );
              return;
            }
            finish();
          }}
        >
          <Text style={styles.btnText}>Finish ✔</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#555", marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#fff",
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
