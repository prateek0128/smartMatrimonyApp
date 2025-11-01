import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
// import DocumentPicker from 'react-native-document-picker';

interface PhotoUploadStepProps {
  onNext: () => void;
}

interface Photo {
  uri: string;
  id: string;
}

const { width } = Dimensions.get('window');
const photoSize = (width - 64) / 3;

export default function PhotoUploadStep({ onNext }: PhotoUploadStepProps) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [biodata, setBiodata] = useState<string | null>(null);

  const handlePhotoUpload = () => {
    const options = {
      mediaType: 'photo' as const,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      selectionLimit: 5 - photos.length,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.assets) {
        const newPhotos = response.assets.map((asset :any, index :any) => ({
          uri: asset.uri!,
          id: `${Date.now()}_${index}`,
        }));
        setPhotos([...photos, ...newPhotos].slice(0, 5));
      }
    });
  };

//   const handleBiodataUpload = async () => {
//     try {
//       const result = await DocumentPicker.pickSingle({
//         type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
//       });
      
//       if (result.size && result.size > 10 * 1024 * 1024) {
//         Alert.alert('Error', 'File size should be less than 10MB');
//         return;
//       }
      
//       setBiodata(result.name);
//     } catch (err) {
//       if (!DocumentPicker.isCancel(err)) {
//         Alert.alert('Error', 'Failed to upload document');
//       }
//     }
//   };

  const removePhoto = (id: string) => {
    setPhotos(photos.filter(photo => photo.id !== id));
  };

  const removeBiodata = () => {
    setBiodata(null);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>📷</Text>
        </View>
        <Text style={styles.title}>Begin Your Journey</Text>
        <Text style={styles.subtitle}>
          Upload your photos and bio-data to get personalized matches
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Profile Photos</Text>
            <Text style={styles.sectionSubtitle}>
              Upload up to 5 photos (min 1 required)
            </Text>
          </View>
          <View style={styles.counter}>
            <Text style={styles.counterText}>{photos.length}/5</Text>
          </View>
        </View>

        <View style={styles.photoGrid}>
          {photos.map((photo, index) => (
            <View key={photo.id} style={styles.photoContainer}>
              <Image source={{ uri: photo.uri }} style={styles.photo} />
              {index === 0 && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultText}>Default</Text>
                </View>
              )}
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removePhoto(photo.id)}
              >
                <Text style={styles.removeText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}

          {photos.length < 5 && (
            <TouchableOpacity style={styles.uploadSlot} onPress={handlePhotoUpload}>
              <Text style={styles.uploadIcon}>📤</Text>
              <Text style={styles.uploadText}>
                {photos.length === 0 ? 'Add Photo' : 'Add More'}
              </Text>
            </TouchableOpacity>
          )}

          {Array.from({ length: Math.max(0, 5 - photos.length - 1) }).map((_, i) => (
            <View key={`empty-${i}`} style={styles.emptySlot} />
          ))}
        </View>

        {photos.length === 0 && (
          <View style={styles.warningBox}>
            <Text style={styles.warningText}>
              📷 Please upload at least one photo to continue
            </Text>
          </View>
        )}

        {photos.length > 0 && (
          <View style={styles.tipsBox}>
            <Text style={styles.tipsTitle}>📸 Photo Tips:</Text>
            <Text style={styles.tipsText}>• First photo will be your profile picture</Text>
            <Text style={styles.tipsText}>• Use clear, well-lit photos</Text>
            <Text style={styles.tipsText}>• Smile and dress appropriately</Text>
            <Text style={styles.tipsText}>• Avoid group photos or filters</Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Bio-Data Upload</Text>
            <Text style={styles.sectionSubtitle}>(Optional)</Text>
          </View>
        </View>

        {biodata ? (
          <View style={styles.biodataContainer}>
            <View style={styles.biodataInfo}>
              <View style={styles.biodataIcon}>
                <Text style={styles.biodataIconText}>📄</Text>
              </View>
              <View>
                <Text style={styles.biodataName}>{biodata}</Text>
                <Text style={styles.biodataType}>PDF Document</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.biodataRemove} onPress={removeBiodata}>
              <Text style={styles.removeText}>×</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.biodataUpload} >
            <Text style={styles.biodataUploadIcon}>📤</Text>
            <Text style={styles.biodataUploadTitle}>Tap here to upload your bio-data</Text>
            <Text style={styles.biodataUploadSubtitle}>PDF, JPG, PNG less than 10MB</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        style={[styles.nextButton, photos.length === 0 && styles.nextButtonDisabled]}
        onPress={onNext}
        disabled={photos.length === 0}
      >
        <Text style={[styles.nextButtonText, photos.length === 0 && styles.nextButtonTextDisabled]}>
          Continue
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  iconContainer: {
    width: 64,
    height: 64,
    backgroundColor: '#E91E63',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  iconText: {
    fontSize: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D1B4E',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  counter: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  counterText: {
    fontSize: 14,
    color: '#666666',
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  photoContainer: {
    position: 'relative',
    width: photoSize,
    height: photoSize,
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#F0F0F0',
  },
  defaultBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#E91E63',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  defaultText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    backgroundColor: '#FF4444',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  uploadSlot: {
    width: photoSize,
    height: photoSize,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    borderStyle: 'dashed',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
  },
  uploadIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  uploadText: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  emptySlot: {
    width: photoSize,
    height: photoSize,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    borderRadius: 16,
    backgroundColor: '#F8F8F8',
  },
  warningBox: {
    backgroundColor: '#FFF8E1',
    borderWidth: 1,
    borderColor: '#FFD54F',
    borderRadius: 12,
    padding: 16,
  },
  warningText: {
    color: '#F57F17',
    fontSize: 14,
  },
  tipsBox: {
    backgroundColor: '#E3F2FD',
    borderWidth: 1,
    borderColor: '#90CAF9',
    borderRadius: 12,
    padding: 16,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1565C0',
    marginBottom: 8,
  },
  tipsText: {
    fontSize: 14,
    color: '#1976D2',
    marginBottom: 4,
  },
  biodataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E8F5E8',
    borderWidth: 2,
    borderColor: '#C8E6C9',
    borderRadius: 16,
    padding: 20,
  },
  biodataInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  biodataIcon: {
    width: 56,
    height: 56,
    backgroundColor: '#A5D6A7',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  biodataIconText: {
    fontSize: 28,
  },
  biodataName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  biodataType: {
    fontSize: 14,
    color: '#666666',
  },
  biodataRemove: {
    width: 36,
    height: 36,
    backgroundColor: '#FFCDD2',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  biodataUpload: {
    borderWidth: 2,
    borderColor: '#CCCCCC',
    borderStyle: 'dashed',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
  },
  biodataUploadIcon: {
    fontSize: 32,
    marginBottom: 16,
  },
  biodataUploadTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  biodataUploadSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  nextButton: {
    backgroundColor: '#E91E63',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  nextButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButtonTextDisabled: {
    color: '#999999',
  },
});