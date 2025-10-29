// src/screens/settings/ProfileSettings.tsx
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SettingsStackParamList } from "../../types/navigation";

type Props = NativeStackScreenProps<SettingsStackParamList, "Profile">;

export default function ProfileSettings({ navigation }: Props) {
  const [name, setName] = useState("Jane Doe");
  const [email, setEmail] = useState("jane@example.com");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Settings</Text>

      <Text style={styles.label}>Full Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={[styles.label, { marginTop: 12 }]}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <View style={{ height: 16 }} />

      <TouchableOpacity style={styles.save} onPress={() => navigation.goBack()}>
        <Text style={styles.saveText}>Save & Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 16 },
  label: { fontSize: 14, color: "#6B7280", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
  },
  save: {
    backgroundColor: "#4F46E5",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  saveText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
