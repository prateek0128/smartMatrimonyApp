// src/screens/home/Overview.tsx
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { HomeStackParamList } from "../../types/navigation";

type Props = NativeStackScreenProps<HomeStackParamList, "Overview">;

export default function Overview({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Overview</Text>
      <Text style={styles.subtitle}>Quick summary of your home metrics.</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today</Text>
        <Text style={styles.cardValue}>42</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, { marginTop: 24 }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>← Back to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#555", marginBottom: 24 },
  card: {
    backgroundColor: "#F3F4F6",
    padding: 16,
    borderRadius: 12,
    width: "100%",
  },
  cardTitle: { fontSize: 14, color: "#6B7280", marginBottom: 6 },
  cardValue: { fontSize: 24, fontWeight: "700" },
  button: {
    backgroundColor: "#111827",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
