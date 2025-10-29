// src/screens/advanced/AdvancedSearch.tsx
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AdvancedSearch() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const onSearch = () => {
    // demo fake results
    setResults(q ? [`${q} result 1`, `${q} result 2`, `${q} result 3`] : []);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Advanced Search</Text>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          value={q}
          onChangeText={setQ}
          placeholder="Type to search..."
        />
        <TouchableOpacity style={styles.button} onPress={onSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Text style={styles.result}>• {item}</Text>}
        ListEmptyComponent={
          <Text style={{ color: "#6B7280" }}>No results</Text>
        }
        contentContainerStyle={{ gap: 8, paddingTop: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 12 },
  row: { flexDirection: "row", gap: 8 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#111827",
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  buttonText: { color: "#fff", fontWeight: "600" },
  result: { fontSize: 16 },
});
