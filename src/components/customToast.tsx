import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../assets/styles/colors';
 
type ToastType = 'success' | 'error';
 
interface CustomToastProps {
  visible: boolean;
  type: ToastType;
  message: string;
  onHide: () => void;
  duration?: number;
}
 
export const CustomToast: React.FC<CustomToastProps> = ({
  visible,
  type,
  message,
  onHide,
  duration = 2000,
}) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onHide();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onHide]);
 
  if (!visible) return null;
 
  return (
    <View style={styles.container}>
      <View style={[styles.toast, type === 'success' ? styles.success : styles.error]}>
        <Text style={styles.text}>{message}</Text>
      </View>
    </View>
  );
};
 
export const useToast = () => {
  const [toast, setToast] = useState<{
    visible: boolean;
    type: ToastType;
    message: string;
  }>({
    visible: false,
    type: 'success',
    message: '',
  });
 
  const showToast = (type: ToastType, message: string) => {
    setToast({ visible: true, type, message });
  };
 
  const hideToast = () => {
    setToast(prev => ({ ...prev, visible: false }));
  };
 
  return {
    toast,
    showToast,
    hideToast,
  };
};
 
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    zIndex: 1000,
    alignItems: 'center',
  },
  toast: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    width: '90%',
  },
  success: {
    backgroundColor: colors.success,
  },
  error: {
    backgroundColor: colors.error,
  },
  text: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});