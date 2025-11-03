import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowLeft,
  CheckCircle2,
  MessageSquare,
  RefreshCw,
} from "lucide-react-native";
import { AnimatePresence, MotiView } from "moti";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { RootStackParamList } from "../../types/navigation";

type OTPNavProp = NativeStackNavigationProp<RootStackParamList, "OTP">;
type OTPRouteProp = {
  key: string;
  name: "OTP";
  params: { phoneNumber: string };
};

export default function OTPVerification() {
  const navigation = useNavigation<OTPNavProp>();
  const route = useRoute<OTPRouteProp>();
  const { phoneNumber } = route.params;
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  useEffect(() => {
    if (otp.length === 6) handleVerify();
  }, [otp]);

  const handleResendOTP = () => {
    setTimer(30);
    setCanResend(false);
    setOtp("");
    Toast.show({
      type: "success",
      text1: "OTP sent successfully!",
      text2: `A new code has been sent to ${phoneNumber}`,
    });
  };

  const handleVerify = () => {
    if (otp.length === 6) {
      setIsVerifying(true);
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Phone number verified!",
          text2: "Your phone number has been successfully verified",
        });
        setTimeout(() => {
          navigation.navigate("ProfileCreation");
        }, 500);
      }, 1000);
    }
  };

  return (
    <LinearGradient colors={["#FFF5F7", "#FFFFFF"]} style={styles.container}>
      <Toast />

      {/* Status Bar */}
      <View style={styles.statusBar}>
        <Text style={styles.timeText}>09:30 PM</Text>
        <View style={styles.iconsRow}>
          <View style={styles.fakeIcon} />
          <View style={styles.fakeIcon} />
          <View style={styles.fakeIcon} />
        </View>
      </View>

      {/* Header */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <ArrowLeft size={20} color="#444" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <MotiView
          from={{ opacity: 0, translateY: 25 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 500 }}
        >
          <View style={styles.iconContainer}>
            <MotiView
              from={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 500 }}
              style={styles.iconWrapper}
            >
              <LinearGradient
                colors={["#E91E63", "#FF6B9D"]}
                style={styles.iconCircle}
              >
                <MessageSquare color="#FFF" size={36} />
              </LinearGradient>
              <MotiView
                from={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 300, type: "spring" }}
                style={styles.iconCheck}
              >
                <CheckCircle2 color="#FFF" size={20} />
              </MotiView>
            </MotiView>

            <Text style={styles.title}>Verify Your Number</Text>
            <Text style={styles.subtitle}>Enter the 6-digit code sent to</Text>

            <View style={styles.phoneRow}>
              <Text style={styles.phoneText}>{phoneNumber}</Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* OTP Input */}
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 200 }}
            style={styles.otpCard}
          >
            <View style={styles.otpContainer}>
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <TextInput
                  key={index}
                  style={[
                    styles.otpBox,
                    otp[index] && { borderColor: "#E91E63", color: "#E91E63" },
                  ]}
                  value={otp[index] || ""}
                  keyboardType="numeric"
                  maxLength={1}
                  editable={!isVerifying}
                  onChangeText={(text) => {
                    const newOtp = otp.split("");
                    newOtp[index] = text;
                    setOtp(newOtp.join("").slice(0, 6));
                  }}
                />
              ))}
            </View>

            {isVerifying && (
              <View style={styles.verifyingRow}>
                <RefreshCw
                  size={16}
                  color="#E91E63"
                  style={{ marginRight: 5 }}
                />
                <Text style={styles.verifyingText}>Verifying...</Text>
              </View>
            )}
          </MotiView>

          {/* Resend OTP Section */}
          <AnimatePresence>
            <MotiView
              key={canResend ? "resend" : "timer"}
              from={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -10 }}
              transition={{ duration: 300 }}
              style={styles.resendContainer}
            >
              {canResend ? (
                <TouchableOpacity
                  onPress={handleResendOTP}
                  style={styles.resendButton}
                >
                  <RefreshCw size={16} color="#E91E63" />
                  <Text style={styles.resendText}>Resend OTP</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.timerRow}>
                  <View style={styles.timerCircle}>
                    <Text style={styles.timerText}>{timer}</Text>
                  </View>
                  <Text style={styles.timerDesc}>
                    Didn’t receive code? Resend in{" "}
                    <Text style={{ color: "#E91E63" }}>{timer}s</Text>
                  </Text>
                </View>
              )}
            </MotiView>
          </AnimatePresence>

          {/* Verify Button */}
          <MotiView
            from={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 400 }}
          >
            <TouchableOpacity
              disabled={otp.length !== 6 || isVerifying}
              onPress={handleVerify}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#E91E63", "#FF6B9D"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[
                  styles.verifyButton,
                  (otp.length !== 6 || isVerifying) && { opacity: 0.6 },
                ]}
              >
                <Text style={styles.verifyButtonText}>
                  {isVerifying ? "Verifying..." : "Verify & Continue"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </MotiView>

          {/* Info Card */}
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 600 }}
            style={styles.infoCard}
          >
            <Text style={styles.infoText}>
              💡 Make sure to check your SMS inbox. The code is valid for 10
              minutes.
            </Text>
          </MotiView>
        </MotiView>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: "center",
  },
  timeText: { fontSize: 14, color: "#333" },
  iconsRow: { flexDirection: "row", gap: 4 },
  fakeIcon: { width: 18, height: 10, backgroundColor: "#333", borderRadius: 2 },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  backText: { marginLeft: 8, color: "#444", fontSize: 16 },
  scrollContainer: { paddingHorizontal: 24, paddingBottom: 30 },
  iconContainer: { alignItems: "center", marginBottom: 24 },
  iconWrapper: { position: "relative", marginBottom: 12 },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  iconCheck: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#4CAF50",
    borderWidth: 3,
    borderColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  title: { color: "#2D1B4E", fontSize: 22, fontWeight: "700", marginBottom: 6 },
  subtitle: { color: "#666", fontSize: 14, marginBottom: 8 },
  phoneRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  phoneText: { color: "#111", fontSize: 15 },
  editText: { color: "#E91E63", fontSize: 13, textDecorationLine: "underline" },
  otpCard: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  otpBox: {
    width: 46,
    height: 56,
    borderWidth: 2,
    borderColor: "#DDD",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 20,
    color: "#222",
  },
  verifyingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  verifyingText: { color: "#E91E63", fontSize: 14 },
  resendContainer: { alignItems: "center", marginBottom: 20 },
  resendButton: { flexDirection: "row", alignItems: "center", gap: 6 },
  resendText: { color: "#E91E63", fontSize: 14 },
  timerRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  timerCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#E91E63",
    alignItems: "center",
    justifyContent: "center",
  },
  timerText: { fontSize: 12, color: "#E91E63" },
  timerDesc: { color: "#555", fontSize: 13 },
  verifyButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 10,
  },
  verifyButtonText: { color: "#FFF", fontWeight: "600", fontSize: 16 },
  infoCard: {
    marginTop: 20,
    backgroundColor: "#E8F0FF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#C8D8FF",
    padding: 14,
  },
  infoText: { textAlign: "center", color: "#2C4E93", fontSize: 13 },
});
