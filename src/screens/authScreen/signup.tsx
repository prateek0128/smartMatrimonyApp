import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik } from "formik";
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
import * as Yup from "yup";

import { colors } from "@/src/assets/styles/colors";
import DropdownInput from "@/src/components/dropdownInput";
import InputTextField from "@/src/components/inputTextField";
import PasswordInput from "@/src/components/passwordInput";
import PhoneNumberInput from "@/src/components/phoneNumberInput";
import PrimaryButton from "@/src/components/primaryButton";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "../../types/navigation";
import { storage } from "../../utils/storage";

type Props = NativeStackScreenProps<RootStackParamList, "Signup">;

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  gender: string | number | null;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

const SignupSchema = Yup.object({
  fullName: Yup.string().trim().min(3, "Min 3 characters").required("Full name is required"),
  email: Yup.string().trim().email("Enter a valid email address").required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone must be 10 digits")
    .required("Phone number is required"),
  gender: Yup.mixed().oneOf(["male", "female", "other"], "Select gender").required("Gender is required"),
  password: Yup.string()
    .min(6, "Min 6 characters")
    .matches(/[A-Z]/, "Include 1 upper case")
    .matches(/[a-z]/, "Include 1 lower case")
    .matches(/\d/, "Include 1 number")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
  terms: Yup.boolean().oneOf([true], "Please agree to terms"),
});

export default function SignUpScreen({ navigation }: Props) {
  const initialValues: FormValues = {
    fullName: "",
    email: "",
    phone: "",
    gender: null,
    password: "",
    confirmPassword: "",
    terms: false,
  };

  const handleSubmit = async (values: FormValues, setSubmitting: (b: boolean) => void) => {
    try {
      const emailToCheck = values.email.trim().toLowerCase();
      const existing = await storage.getItem("registered_emails");
      let emails: string[] = [];
      try { emails = existing ? JSON.parse(existing) : []; } catch { emails = []; }

      if (emails.includes(emailToCheck)) {
        Alert.alert("Email already registered", "This email is already associated with an account. Try logging in or use a different email.");
        return;
      }

      await storage.setItem("user", JSON.stringify({ username: values.fullName.trim(), email: emailToCheck }));
      await storage.setItem("signup_credentials", JSON.stringify({ email: emailToCheck, password: values.password }));
      emails.push(emailToCheck);
      await storage.setItem("registered_emails", JSON.stringify(emails));

      Alert.alert("Success", "Signed up successfully!", [
        {
          text: "Continue",
          onPress: () =>
            navigation.navigate("Onboarding", { screen: "AddMedia" } as never),
        },
      ], { cancelable: false });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.headerArea}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Start your journey to find your perfect match</Text>
        </View>

        <Formik
          initialValues={initialValues}
          validationSchema={SignupSchema}
          validateOnMount
          onSubmit={(vals, { setSubmitting }) => handleSubmit(vals, setSubmitting)}
        >
          {({ values, errors, touched, submitCount, handleSubmit, setFieldValue, isSubmitting }) => (
            <View style={styles.formArea}>
              <View style={styles.fieldGroup}>
                <InputTextField
                  inputLabel="Full Name"
                  placeholder="Enter your full name"
                  value={values.fullName}
                  onChangeText={(t) => setFieldValue("fullName", t)}
                  autoCapitalize="words"
                />
                {(submitCount > 0 || touched.fullName) && errors.fullName ? (
                  <Text style={styles.errorText}>{errors.fullName}</Text>
                ) : null}
              </View>

              <View style={styles.fieldGroup}>
                <InputTextField
                  inputLabel="Email"
                  placeholder="Enter your email address"
                  value={values.email}
                  onChangeText={(t) => setFieldValue("email", t)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {(submitCount > 0 || touched.email) && errors.email ? (
                  <Text style={styles.errorText}>{errors.email}</Text>
                ) : null}
              </View>

              <View style={styles.fieldGroup}>
                <PhoneNumberInput
                  label="Phone Number"
                  value={values.phone}
                  onChangeText={(t) => setFieldValue("phone", t.replace(/\D/g, ""))}
                  placeholder="00000 00000"
                  errorMessage={(submitCount > 0 || touched.phone) && errors.phone ? errors.phone : undefined}
                />
              </View>

              <View style={styles.fieldGroup}>
                <DropdownInput
                  label="Gender"
                  data={genderOptions}
                  placeholder="Select"
                  value={values.gender}
                  onChange={(v) => setFieldValue("gender", v)}
                />
                {(submitCount > 0 || touched.gender) && errors.gender ? (
                  <Text style={styles.errorText}>{errors.gender as string}</Text>
                ) : null}
              </View>

              <View style={styles.fieldGroup}>
                <PasswordInput
                  title="Password"
                  value={values.password}
                  onChangeText={(t) => setFieldValue("password", t)}
                  showStrengthBar
                  showInfo
                  error={!!(touched.password && errors.password)}
                />
                {(submitCount > 0 || touched.password) && errors.password ? (
                  <Text style={styles.errorText}>{errors.password}</Text>
                ) : null}
              </View>

              <View style={styles.fieldGroup}>
                <PasswordInput
                  title="Confirm Password"
                  value={values.confirmPassword}
                  onChangeText={(t) => setFieldValue("confirmPassword", t)}
                  showStrengthBar={false}
                  showInfo={false}
                  error={!!(touched.confirmPassword && errors.confirmPassword)}
                />
                {(submitCount > 0 || touched.confirmPassword) && errors.confirmPassword ? (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                ) : null}
              </View>
                <View style={styles.termsRow}>
                  <TouchableOpacity onPress={() => setFieldValue("terms", !values.terms)}>
                    <View style={[styles.checkbox, values.terms && styles.checkboxChecked]}>
                      {values.terms && <Ionicons name="checkmark" size={14} color={colors.white} />}
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.termsText}>
                    I have read and agree with terms of service and privacy policy
                  </Text>
                </View>

              {(submitCount > 0 || touched.terms) && errors.terms ? (
                <Text style={styles.errorText}>{errors.terms as string}</Text>
              ) : null}

              <PrimaryButton
                title={isSubmitting ? "Please wait..." : "Sign Up"}
                onPress={() => handleSubmit()}
                disabled={isSubmitting}
              />

              <View style={styles.loginRow}>
                <Text style={styles.loginText}>Already a member? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login" as never)}>
                  <Text style={styles.loginLink}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>

      <SafeAreaView edges={["bottom"]} style={styles.footer} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1, padding: 24, backgroundColor: colors.white },
  headerArea: { marginTop: 8, marginBottom: 24, alignItems: "flex-start" },
  formArea: { width: "100%" },
  title: { fontSize: 20, fontWeight: "800", textAlign: "left", color: colors.secondaryText, lineHeight: 28, letterSpacing: -0.4 },
  subtitle: { fontSize: 16, color: "#6B7280", textAlign: "left", marginTop: 6, marginBottom: 20, lineHeight: 18 },
  fieldGroup: { marginBottom: 14 },
  errorText: { color: colors.error, fontSize: 12, marginTop: 6 },
  termsRow: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 6 },
  checkbox: { width: 18, height: 18, borderWidth: 1, borderColor: colors.primaryBorderColor, borderRadius: 4 },
  checkboxChecked: { backgroundColor: colors.primaryButtonColor, borderColor: colors.primaryButtonColor },
  termsText: { flex: 1, fontSize: 12, color: colors.secondaryText },
  loginRow: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 16 },
  loginText: { color: "#6B7280", fontSize: 13 },
  loginLink: { color: colors.primaryText, fontSize: 13, fontWeight: "600" },
  footer: { paddingHorizontal: 24, paddingBottom: 12, paddingTop: 4, backgroundColor: colors.white },
});
