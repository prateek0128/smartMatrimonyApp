import DropdownInput from "@/src/components/dropdownInput";
import InputTextField from "@/src/components/inputTextField";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../types/navigation";
import { storage } from "../../utils/storage";

type Props = NativeStackScreenProps<RootStackParamList, "Signup">;

export default function SignUpScreen({ navigation }: Props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [touched, setTouched] = useState<{ [k: string]: boolean }>({});
  const [selectedCountry, setSelectedCountry] = useState<
    string | number | null
  >(null);

  const countries = [
    { label: "India", value: "IN" },
    { label: "USA", value: "US" },
    { label: "Canada", value: "CA" },
    { label: "Australia", value: "AU" },
  ];
  const errors = useMemo(() => {
    const e: { [k: string]: string } = {};
    if (!username.trim()) e.username = "Username is required";
    else if (username.trim().length < 3)
      e.username = "Username must be at least 3 characters";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!email.trim()) e.email = "Email is required";
    else if (!emailRegex.test(email)) e.email = "Enter a valid email";

    const pass = password;
    if (!pass) e.password = "Password is required";
    else if (pass.length < 6) e.password = "Min 6 characters";
    else if (!/[0-9]/.test(pass) || !/[A-Za-z]/.test(pass))
      e.password = "Use letters and numbers";

    return e;
  }, [username, email, password]);

  const isValid = Object.keys(errors).length === 0;

  const onSubmit = async () => {
    if (!isValid) {
      // Mark all as touched to show errors
      setTouched({ username: true, email: true, password: true });
      Alert.alert("Fix errors", "Please correct the highlighted fields.");
      return;
    }

    setSubmitting(true);
    try {
      const emailToCheck = email.trim().toLowerCase();

      // Check locally stored list of registered emails
      const existing = await storage.getItem("registered_emails");
      let emails: string[] = [];
      try {
        emails = existing ? JSON.parse(existing) : [];
      } catch (_) {
        emails = [];
      }

      if (emails.includes(emailToCheck)) {
        Alert.alert(
          "Email already registered",
          "This email is already associated with an account. Try logging in or use a different email.",
          [{ text: "OK" }],
          { cancelable: false }
        );
        return; // stay on signup screen
      }

      // Persist minimal user info (demo purpose)
      const payload = { username: username.trim(), email: emailToCheck };
      await storage.setItem("user", JSON.stringify(payload));
      await storage.setItem(
        "signup_credentials",
        JSON.stringify({ email: emailToCheck, password })
      );

      // Update local registry of emails
      emails.push(emailToCheck);
      await storage.setItem("registered_emails", JSON.stringify(emails));

      Alert.alert(
        "Success",
        "Signed up successfully!",
        [
          {
            text: "Continue",
            onPress: () =>
              navigation.navigate("Onboarding", {
                screen: "AddMedia",
              } as never),
          },
        ],
        { cancelable: false }
      );
    } catch (err) {
      Alert.alert("Save failed", "Could not store your details. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerArea}>
          <Text style={styles.brand}>SmartMatrimony</Text>
          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.subtitle}>Join and start your journey</Text>
        </View>

        <View style={styles.formArea}>
          <View style={styles.fieldGroup}>
            {/* <Text style={styles.label}>Username</Text> */}
            <InputTextField
              value={username}
              onChangeText={setUsername}
              inputLabel="Name"
              placeholder="enter name"
            />
            {touched.username && errors.username ? (
              <Text style={styles.errorText}>{errors.username}</Text>
            ) : null}
          </View>

          <View style={styles.fieldGroup}>
            {/* <Text style={styles.label}>Email</Text> */}
            <InputTextField
              value={email}
              onChangeText={setEmail}
              inputLabel="Email"
              placeholder="enter email"
            />
            <DropdownInput
              label="Select Country"
              data={countries}
              value={selectedCountry}
              onChange={setSelectedCountry}
            />

            {touched.email && errors.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
          </View>

          <View style={styles.fieldGroup}>
            {/* <Text style={styles.label}>Password</Text> */}
            <View style={styles.passwordWrap}>
              <InputTextField
                value={password}
                onChangeText={setPassword}
                inputLabel="Password"
                placeholder="enter password"
              />
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel={
                  showPassword ? "Hide password" : "Show password"
                }
                onPress={() => setShowPassword((s) => !s)}
                style={styles.iconBtn}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>
            {touched.password && errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
          </View>

          <TouchableOpacity
            style={[
              styles.primaryBtn,
              submitting ? styles.primaryBtnDisabled : null,
            ]}
            onPress={onSubmit}
            disabled={submitting}
          >
            <Text style={styles.primaryBtnText}>
              {submitting ? "Please wait..." : "Sign up"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <SafeAreaView edges={["bottom"]} style={styles.footer}>
        <Text style={styles.terms}>
          By signing up, you agree to our Terms and Privacy Policy.
        </Text>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: "#F8FAFC",
  },
  headerArea: {
    marginTop: 8,
    marginBottom: 24,
    alignItems: "center",
  },
  formArea: {
    width: "100%",
  },
  brand: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 4,
    textAlign: "center",
  },
  title: { fontSize: 28, fontWeight: "800", textAlign: "center" },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 20,
  },

  fieldGroup: { marginBottom: 14 },
  label: { fontSize: 13, color: "#374151", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: "#fff",
  },
  inputError: { borderColor: "#EF4444" },
  errorText: { color: "#EF4444", fontSize: 12, marginTop: 6 },

  passwordWrap: { position: "relative" },
  passwordInput: { paddingRight: 44 },
  iconBtn: {
    position: "absolute",
    right: 10,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
  },

  primaryBtn: {
    marginTop: 8,
    backgroundColor: "#4F46E5",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryBtnDisabled: { opacity: 0.6 },
  primaryBtnText: { color: "#fff", fontWeight: "700", fontSize: 16 },

  footer: {
    paddingHorizontal: 24,
    paddingBottom: 12,
    paddingTop: 4,
    backgroundColor: "#F8FAFC",
  },
  terms: { fontSize: 12, color: "#6B7280", textAlign: "center" },
});
