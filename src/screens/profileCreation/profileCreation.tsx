import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import PhotoUploadStep from "../profileSteps/photoUploadStep";
import CasteSelectionStep from "../profileSteps/casteSelectionStep";
import PersonalDetailsStep from "../profileSteps/personalDetailsStep";
import FamilyBackgroundStep from "../profileSteps/familyBackgroundStep";
import EducationCareerStep from "../profileSteps/educationCareerStep";


type ProfileCreationNavProp = NativeStackNavigationProp<RootStackParamList>;

interface Step {
  id: number;
  title: string;
  component: React.ComponentType<{ onNext: () => void }>;
}

const steps: Step[] = [
  { id: 1, title: "Photos", component: PhotoUploadStep },
  { id: 2, title: "Caste", component: CasteSelectionStep },
  { id: 3, title: "Personal", component: PersonalDetailsStep },
  { id: 4, title: "Family", component: FamilyBackgroundStep },
  { id: 5, title: "Career", component: EducationCareerStep },
//   { id: 6, title: "Preferences", component: PreferencesStep },
];

const { width } = Dimensions.get('window');

export default function ProfileCreation() {
  const navigation = useNavigation<ProfileCreationNavProp>();
  const [currentStep, setCurrentStep] = useState(1);

  const totalSteps = steps.length;
  const CurrentStepComponent = steps[currentStep - 1].component;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Profile creation complete
      Alert.alert(
        "🎉 Profile Created Successfully!",
        "Your profile is now active and visible to matches",
        [
          {
            text: "Continue",
            onPress: () => {
              // Navigate to home or main app
              navigation.reset({
                index: 0,
                routes: [{ name: "MainTabs" }],
              });
            },
          },
        ]
      );
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          {currentStep > 1 && (
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
          )}
          <View style={styles.headerContent}>
            <Text style={styles.title}>Create Your Profile</Text>
            <Text style={styles.stepText}>
              Step {currentStep} of {totalSteps}
            </Text>
          </View>
        </View>

        {/* Step Indicators */}
        <View style={styles.stepIndicators}>
          {steps.map((step) => (
            <View key={step.id} style={styles.stepIndicator}>
              <View
                style={[
                  styles.stepBar,
                  step.id < currentStep && styles.completedStepBar,
                  step.id === currentStep && styles.activeStepBar,
                ]}
              />
              <Text
                style={[
                  styles.stepLabel,
                  step.id <= currentStep && styles.activeStepLabel,
                ]}
              >
                {step.title}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Step Content */}
       <View style={styles.content}>
        <CurrentStepComponent onNext={handleNext} />
      </View>

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.continueButton} onPress={handleNext}>
          <Text style={styles.continueButtonText}>
            {currentStep === totalSteps ? "Complete Profile" : "Continue"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  backIcon: {
    fontSize: 20,
    color: "#333",
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2D1B4E",
    marginBottom: 4,
  },
  stepText: {
    fontSize: 14,
    color: "#666",
  },
  stepIndicators: {
    flexDirection: "row",
    gap: 8,
  },
  stepIndicator: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  stepBar: {
    width: "100%",
    height: 4,
    borderRadius: 2,
    backgroundColor: "#e0e0e0",
  },
  completedStepBar: {
    backgroundColor: "#4CAF50",
  },
  activeStepBar: {
    backgroundColor: "#E91E63",
  },
  stepLabel: {
    fontSize: 12,
    color: "#999",
  },
  activeStepLabel: {
    color: "#E91E63",
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  footer: {
    padding: 24,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  continueButton: {
    backgroundColor: "#E91E63",
    height: 56,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#E91E63",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});