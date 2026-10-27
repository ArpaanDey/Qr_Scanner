// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Alert,
// } from 'react-native';
// import { Camera } from 'react-native-camera-kit';

// const Scanner = () => {
//   const [scannedValue, setScannedValue] = useState('');

//   const handleScan = (event: any) => {
//     const value = event.nativeEvent.codeStringValue;

//     if (value) {
//       setScannedValue(value);
//       Alert.alert('QR Code Scanned', value);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Scan QR Code</Text>

//       <Camera
//         style={styles.camera}
//         scanBarcode={true}
//         showFrame={true}
//         laserColor="red"
//         frameColor="white"
//         onReadCode={handleScan}
//       />

//       <Text style={styles.label}>Scanned Result:</Text>
//       <Text selectable style={styles.result}>
//         {scannedValue || 'Point your camera at a QR code'}
//       </Text>
//     </View>
//   );
// };

// export default Scanner;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#FFFFFF',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//     color: '#222222',
//   },
//   camera: {
//     width: '100%',
//     height: 350,
//   },
//   label: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginTop: 20,
//   },
//   result: {
//     fontSize: 16,
//     marginTop: 8,
//     color: '#333333',
//   },
// });

import React, { useState, useRef, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Linking,
  Alert,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Camera } from 'react-native-camera-kit';

export default function Scanner() {
  const [scannedValue, setScannedValue] = useState('');
  const [isUrl, setIsUrl] = useState(false);
  const hasScanned = useRef(false);

  const checkIsUrl = (text: string) => {
    try {
      const url = new URL(text);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      hasScanned.current = false;
      setScannedValue('');
      setIsUrl(false);
    }
  }, [isFocused]);

  const handleScan = (event: any) => {
    const value = event?.nativeEvent?.codeStringValue?.trim();

    if (!value || hasScanned.current) {
      return;
    }
 
    hasScanned.current = true;
    setScannedValue(value);
    setIsUrl(checkIsUrl(value));
  };

  const openWebsite = async () => {
    try {
      await Linking.openURL(scannedValue);
    } catch {
      Alert.alert('Unable to open link', 'Please try again.');
    }
  };

  const scanAgain = () => {
    hasScanned.current = false;
    setScannedValue('');
    setIsUrl(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>QR Scanner</Text>
          <Text style={styles.subtitle}>Scan any QR code</Text>
        </View>

        <View style={styles.scannerCard}>
          {!scannedValue ? (
            <>
              <View style={styles.cameraContainer}>
                {isFocused && !scannedValue && (
                  <Camera
                    key={isFocused ? 'scanner-active' : 'scanner-inactive'}
                    style={styles.camera}
                    scanBarcode={true}
                    showFrame={true}
                    laserColor="#2563EB"
                    frameColor="#FFFFFF"
                    onReadCode={handleScan}
                  />
                )}
              </View>

              <View style={styles.instructionRow}>
                <View style={styles.statusDot} />
                <Text style={styles.instruction}>
                  Point your camera at a QR code
                </Text>
              </View>
            </>
          ) : (
            <View style={styles.successContainer}>
              <Text style={styles.successTitle}>Scan Successful!</Text>
              <Text style={styles.successSubtitle}>
                Your QR code content is ready
              </Text>
            </View>
          )}
        </View>

        <View style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultTitle}>Scanned Result</Text>
            {/* {scannedValue ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>SUCCESS</Text>
              </View>
            ) : null} */}
          </View>

          <View style={styles.resultBox}>
            <Text selectable style={styles.resultText}>
              {scannedValue || 'Your scanned text or link will appear here.'}
            </Text>
          </View>

          {scannedValue && isUrl ? (
            <Pressable
              style={({ pressed }) => [
                styles.openButton,
                pressed && styles.pressed,
              ]}
              onPress={openWebsite}
            >
              <Text style={styles.buttonText}> Open Website</Text>
            </Pressable>
          ) : null}

          {scannedValue ? (
            <Pressable
              style={({ pressed }) => [
                styles.scanAgainButton,
                pressed && styles.pressed,
              ]}
              onPress={scanAgain}
            >
              <Text style={styles.scanAgainText}>Scan Again</Text>
            </Pressable>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101828',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
    marginVertical: 40,
  },
  iconCircle: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: '#263B60',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  headerIcon: {
    fontSize: 35,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#A9B6CA',
    textAlign: 'center',
    marginTop: 8,
  },
  scannerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 12,
    elevation: 5,
  },
  cameraContainer: {
    height: 300,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#E5E7EB',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  instructionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 17,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#16A34A',
    marginRight: 9,
  },
  instruction: {
    color: '#475467',
    fontSize: 13,
    fontWeight: '500',
  },
  successContainer: {
    minHeight: 180,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  successIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  checkmark: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#15803D',
  },
  successTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#101828',
  },
  successSubtitle: {
    fontSize: 13,
    color: '#667085',
    marginTop: 7,
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginTop: 22,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 13,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#101828',
  },
  badge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  badgeText: {
    color: '#15803D',
    fontSize: 10,
    fontWeight: '800',
  },
  resultBox: {
    backgroundColor: '#F2F4F7',
    borderRadius: 12,
    padding: 14,
    minHeight: 65,
    justifyContent: 'center',
  },
  resultText: {
    fontSize: 15,
    lineHeight: 23,
    color: '#344054',
  },
  openButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 14,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  scanAgainButton: {
    backgroundColor: '#E8EEFF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  scanAgainText: {
    color: '#1D4ED8',
    fontSize: 15,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.75,
  },
  footer: {
    color: '#8492A8',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 24,
  },
});
