import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { MotiView } from "moti";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Mail, Phone, User } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Formik } from "formik";
import * as Yup from "yup";
import PasswordInput from "../../components/passwordInput";
import PrimaryButton from "../../components/primaryButton";
import InputTextField from "../../components/inputTextField";
import { CustomToast, useToast } from "../../components/customToast";
import { colors } from "../../assets/styles/colors";
import { RootStackParamList } from "../../types/navigation";

type LoginNavProp = NativeStackNavigationProp<RootStackParamList, "Login">;

const getValidationSchema = (method: string) => {
  if (method === "phone") {
    return Yup.object({
      phoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
    });
  }
  return Yup.object({
    identifier: Yup.string()
      .test("email-or-userid", "Invalid email or user ID", function(value) {
        if (this.parent.method === "email") {
          return Yup.string().email().isValidSync(value);
        }
        return Yup.string().min(3).isValidSync(value);
      })
      .required("This field is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
};

export default function Login() {
  const navigation = useNavigation<LoginNavProp>();
  const [loginMethod, setLoginMethod] = useState<"phone" | "email" | "userid">(
    "phone"
  );
  const { toast, showToast, hideToast } = useToast();


  const handleLogin = (values: any) => {
    if (loginMethod === "phone") {
      showToast("success", "Sending OTP to " + values.phoneNumber);
      setTimeout(() => {
        navigation.navigate("ProfileCreation");
      }, 1500);
    } else {
      showToast("success", "Login successful!");
      setTimeout(() => {
        navigation.navigate("ProfileCreation");
      }, 1500);
    }
  };



  return (
    <LinearGradient colors={["#FFF5F7", "#FFFFFF"]} style={styles.container}>
      <CustomToast
        visible={toast.visible}
        type={toast.type}
        message={toast.message}
        onHide={hideToast}
      />

      {/* Header */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <ArrowLeft size={20} color={colors.darkGray} />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {/* Animated Main Content */}
      <MotiView
        from={{ opacity: 0, translateY: 25 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 500 }}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Login to continue your journey</Text>
          </View>

          {/* Login Tabs */}
          <View style={styles.tabsContainer}>
            {[
              {
                key: "phone",
                label: "Phone",
                icon: (
                  <Phone
                    size={16}
                    color={loginMethod === "phone" ? colors.primaryPink : colors.mediumGray}
                  />
                ),
              },
              {
                key: "email",
                label: "Email",
                icon: (
                  <Mail
                    size={16}
                    color={loginMethod === "email" ? colors.primaryPink : colors.mediumGray}
                  />
                ),
              },
              {
                key: "userid",
                label: "User ID",
                icon: (
                  <User
                    size={16}
                    color={loginMethod === "userid" ? colors.primaryPink : colors.mediumGray}
                  />
                ),
              },
            ].map((tab) => (
              <TouchableOpacity
                key={tab.key}
                style={[
                  styles.tab,
                  loginMethod === tab.key && styles.activeTab,
                ]}
                onPress={() => setLoginMethod(tab.key as any)}
              >
                {tab.icon}
                <Text
                  style={[
                    styles.tabText,
                    loginMethod === tab.key && styles.activeTabText,
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Formik
            initialValues={{
              phoneNumber: "",
              identifier: "",
              password: "",
              method: loginMethod,
            }}
            validationSchema={getValidationSchema(loginMethod)}
            onSubmit={handleLogin}
            enableReinitialize
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <>
                {/* Animated Input Section */}
                <MotiView
                  from={{ opacity: 0, translateY: 20 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ delay: 200, duration: 400 }}
                >
                  <InputTextField
                    inputLabel={
                      loginMethod === "phone"
                        ? "Phone Number"
                        : loginMethod === "email"
                        ? "Email Address"
                        : "User ID"
                    }
                    placeholder={
                      loginMethod === "phone"
                        ? "Enter your phone number"
                        : loginMethod === "email"
                        ? "Enter your email"
                        : "Enter your user ID"
                    }
                    keyboardType={loginMethod === "phone" ? "phone-pad" : "default"}
                    value={loginMethod === "phone" ? values.phoneNumber : values.identifier}
                    onChangeText={handleChange(loginMethod === "phone" ? "phoneNumber" : "identifier")}
                    error={(touched[loginMethod === "phone" ? "phoneNumber" : "identifier"] && errors[loginMethod === "phone" ? "phoneNumber" : "identifier"]) || undefined}
                  />

                  {(loginMethod === "email" || loginMethod === "userid") && (
                    <PasswordInput
                      value={values.password}
                      onChangeText={handleChange("password")}
                      placeholder="Enter your password"
                      title="Password"
                      showStrengthBar={false}
                      showInfo={false}
                      error={(touched.password && errors.password) || undefined}
                    />
                  )}

                  <TouchableOpacity style={styles.forgotContainer}>
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                  </TouchableOpacity>
                </MotiView>

                {/* Animated Button */}
                <MotiView
                  from={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 400, type: "timing", duration: 300 }}
                >
                  <PrimaryButton
                    title={loginMethod === "phone" ? "Send OTP" : "Login"}
                    onPress={handleSubmit}
                    buttonStyle={{ marginTop: 10 }}
                  />
                </MotiView>
              </>
            )}
          </Formik>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.divider} />
          </View>

          {/* Google Login */}
          <TouchableOpacity style={styles.googleButton}>
            <View style={styles.googleButtonContent}>
              <View style={styles.googleLogo}>
                <Text style={styles.googleG}>G</Text>
                <Text style={styles.googleo1}>o</Text>
                <Text style={styles.googleo2}>o</Text>
                <Text style={styles.googleg}>g</Text>
                <Text style={styles.googlel}>l</Text>
                <Text style={styles.googlee}>e</Text>
              </View>
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Don't have an account?{" "}
              <Text style={styles.signupText} onPress={() => navigation.navigate("Signup")}>
                Sign up
              </Text>
            </Text>
          </View>
        </ScrollView>
      </MotiView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 10,
    marginTop: 30
  },
  backText: { marginLeft: 8, color: colors.darkGray, fontSize: 16 },
  scrollContainer: { paddingHorizontal: 24, paddingBottom: 30 },
  headerTextContainer: { marginBottom: 24 },
  title: { color: colors.titleColor, fontSize: 26, fontWeight: "700" },
  subtitle: { color: colors.mediumGray, fontSize: 14 },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  activeTab: {
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: colors.black,
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  tabText: { color: colors.mediumGray, fontSize: 14 },
  activeTabText: { color: colors.primaryPink },
  forgotContainer: { alignSelf: "flex-end" },
  forgotText: { color: colors.primaryPink, fontSize: 13 },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  divider: { flex: 1, height: 1, backgroundColor: colors.dividerColor },
  orText: { marginHorizontal: 8, color: colors.lightTextGray, fontSize: 13 },
  googleButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: "#DADCE0",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    shadowColor: "rgba(0,0,0,0.1)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  googleButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  googleLogo: {
    flexDirection: "row",
    alignItems: "center",
  },
  googleG: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4285F4",
  },
  googleo1: {
    fontSize: 16,
    fontWeight: "500",
    color: "#EA4335",
  },
  googleo2: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FBBC05",
  },
  googleg: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4285F4",
  },
  googlel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#34A853",
  },
  googlee: {
    fontSize: 16,
    fontWeight: "500",
    color: "#EA4335",
  },
  googleButtonText: { 
    fontSize: 14, 
    color: "#3C4043",
    fontWeight: "500",
  },
  footer: { marginTop: 20, alignItems: "center" },
  footerText: { color: colors.mediumGray, fontSize: 13 },
  signupText: { color: colors.primaryPink },

});