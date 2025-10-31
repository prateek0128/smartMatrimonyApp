import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation"; // adjust path if needed

type LoginNavProp = NativeStackNavigationProp<RootStackParamList, "Login">;

const fakeLoginApi = async (email: string, password: string) => {
  // Replace this with a real API call (fetch/axios)
  // This stub simulates network delay and success/failure
  return new Promise<{ success: boolean; token?: string; message?: string }>(
    (resolve) => {
      setTimeout(() => {
        if (email === "user@example.com" && password === "password123") {
          resolve({ success: true, token: "fake-token-abc" });
        } else {
          resolve({ success: false, message: "Invalid credentials" });
        }
      }, 1200);
    }
  );
};

const Login: React.FC = () => {
  const navigation = useNavigation<LoginNavProp>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = () => {
    if (!email.trim() || !password) {
      setError("Please enter both email and password.");
      return false;
    }
    // simple email check (optional)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setLoading(true);
    setError(null);

    try {
        navigation.replace("Onboarding", { screen: "AddMedia" });
      const resp = await fakeLoginApi(email.trim(), password);
      if (resp.success) {
        // save token to secure storage / context / redux if needed
        // then navigate to main app. Use reset so user can't go back to login with back button
        navigation.reset({
          index: 0,
          routes: [{ name: "MainTabs" }],
        });
      } else {
        setError(resp.message ?? "Login failed. Please try again.");
      }
    } catch (e) {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", android: undefined })}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Text style={styles.heading}>Welcome back</Text>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="emailAddress"
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              textContentType="password"
            />

            <TouchableOpacity
              style={[styles.button, loading ? styles.buttonDisabled : null]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>

            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Onboarding", { screen: "PersonalDetails" })}
              >
                <Text style={styles.link}>Create account</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  /* implement forgot password navigation */
                }}
              >
                <Text style={styles.link}>Forgot password?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1 },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "center",
  },
  heading: { fontSize: 26, fontWeight: "700", marginBottom: 24 },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  button: {
    height: 48,
    borderRadius: 10,
    backgroundColor: "#007bff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  row: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "space-between",
  },
  link: { color: "#007bff" },
  errorText: { color: "#d9534f", marginBottom: 8 },
});
