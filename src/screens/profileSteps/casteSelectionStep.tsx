import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from "react-native";

interface CasteSelectionStepProps {
  onNext: () => void;
}

interface Caste {
  id: string;
  name: string;
  count: string;
}

const castes: Caste[] = [
  { id: "maheshwari", name: "Maheshwari", count: "2.5K+" },
  { id: "khandelwal", name: "Khandelwal", count: "3.2K+" },
  { id: "marwari", name: "Marwari", count: "5.1K+" },
  { id: "aggarwal", name: "Aggarwal", count: "4.8K+" },
  { id: "jain", name: "Jain", count: "6.3K+" },
  { id: "gupta", name: "Gupta", count: "3.9K+" },
  { id: "bansal", name: "Bansal", count: "2.1K+" },
  { id: "agarwal", name: "Agarwal", count: "7.2K+" },
  { id: "mittal", name: "Mittal", count: "1.8K+" },
  { id: "garg", name: "Garg", count: "2.3K+" },
  { id: "singhal", name: "Singhal", count: "1.5K+" },
  { id: "goyal", name: "Goyal", count: "3.4K+" },
];

const { width } = Dimensions.get('window');

export default function CasteSelectionStep({ onNext }: CasteSelectionStepProps) {
  const [selectedCaste, setSelectedCaste] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCastes = castes.filter((caste) =>
    caste.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCasteItem = ({ item, index }: { item: Caste; index: number }) => (
    <TouchableOpacity
      style={[
        styles.casteItem,
        selectedCaste === item.id && styles.selectedCasteItem,
      ]}
      onPress={() => setSelectedCaste(item.id)}
    >
      <View style={styles.casteContent}>
        <Text
          style={[
            styles.casteName,
            selectedCaste === item.id && styles.selectedCasteName,
          ]}
        >
          {item.name}
        </Text>
        {selectedCaste === item.id && (
          <Text style={styles.checkIcon}>✓</Text>
        )}
      </View>
      <Text style={styles.casteCount}>{item.count} profiles</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>👥</Text>
          </View>
          <Text style={styles.title}>Choose Your Caste</Text>
          <Text style={styles.subtitle}>
            Select your community to find matches from similar backgrounds
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for your caste..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </View>

        {/* Caste List */}
        <FlatList
          data={filteredCastes}
          renderItem={renderCasteItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />

        {filteredCastes.length === 0 && (
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>
              No castes found matching "{searchQuery}"
            </Text>
          </View>
        )}

        {selectedCaste && (
          <View style={styles.successMessage}>
            <Text style={styles.successText}>
              ✓ Great choice! You can update this later in settings.
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    padding: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  iconContainer: {
    width: 64,
    height: 64,
    backgroundColor: "#E91E63",
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
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
    height: 48,
    borderWidth: 2,
    borderColor: "#e9ecef",
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 12,
    color: "#999",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  listContainer: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
  casteItem: {
    width: (width - 60) / 2,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: "#e9ecef",
  },
  selectedCasteItem: {
    borderColor: "#E91E63",
    backgroundColor: "#FFF5F7",
  },
  casteContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  casteName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  selectedCasteName: {
    color: "#E91E63",
  },
  checkIcon: {
    fontSize: 20,
    color: "#E91E63",
    fontWeight: "bold",
  },
  casteCount: {
    fontSize: 14,
    color: "#666",
  },
  noResults: {
    alignItems: "center",
    paddingVertical: 32,
  },
  noResultsText: {
    fontSize: 16,
    color: "#666",
  },
  successMessage: {
    backgroundColor: "#f0f9ff",
    borderWidth: 1,
    borderColor: "#bfdbfe",
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  successText: {
    fontSize: 14,
    color: "#1e40af",
  },
});