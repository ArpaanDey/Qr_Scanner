import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const Generator = () => {
  const [input, setInput] = useState('');

  const qrValue = input.trim();

  const clearInput = () => {
    setInput('');
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content"/>

      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          

          <Text style={styles.title}>QR Generator</Text>
          <Text style={styles.subtitle}>
            Turn your text and links into QR codes
          </Text>
        </View>

        {/* Input section */}
        <View style={styles.inputCard}>
          <View style={styles.inputHeader}>
            <Text style={styles.sectionTitle}>Your Content</Text>

            {/* <Text style={styles.counter}>{input.length} characters</Text> */}
          </View>

          <TextInput
            style={styles.input}
            placeholder="Enter text, website URL, email or phone number..."
            placeholderTextColor="#98A2B3"
            value={input}
            onChangeText={setInput}
            multiline
            autoCapitalize="none"
            autoCorrect={false}
            textAlignVertical="top"
          />

          {/* <View style={styles.inputFooter}>
            

            {input.length > 0 && (
              <Pressable onPress={clearInput} hitSlop={8}>
                <Text style={styles.clearText}>Clear</Text>
              </Pressable>
            )} 
          </View> */}
        </View>

        
        <View style={styles.previewCard}>
          <View style={styles.previewHeader}>
            <Text style={styles.sectionTitle}>QR Code</Text>

            {/* <View
              style={[
                styles.statusBadge,
                qrValue ? styles.activeBadge : styles.inactiveBadge,
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  qrValue ? styles.activeText : styles.inactiveText,
                ]}
              >
                {qrValue ? 'READY' : 'EMPTY'}
              </Text>
            </View> */}
          </View>

          <View style={styles.qrArea}>
            {qrValue ? (
              <View style={styles.qrWhiteCard}>
                <QRCode
                  value={qrValue}
                  size={220}
                  color="#101828"
                  backgroundColor="#FFFFFF"
                />
              </View>
            ) : (
              <View style={styles.emptyQr}>
                
                
              </View>
            )}
          </View>

          {qrValue ? (
            <View style={styles.contentPreview}>
              <Text style={styles.contentLabel}>CONTENT</Text>
              <Text selectable style={styles.contentText}>
                {qrValue}
              </Text>
            </View>
          ) : null}
        </View>

        
      </ScrollView>
    </View>
  );
};

export default Generator;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#101828',
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 26,
    marginVertical:40
  },
  iconBox: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: '#263B60',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  icon: {
    color: '#FFFFFF',
    fontSize: 36,
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
  inputCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
  },
  inputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#101828',
  },
  counter: {
    fontSize: 12,
    color: '#667085',
  },
  input: {
    minHeight: 115,
    maxHeight: 180,
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    padding: 14,
    fontSize: 15,
    lineHeight: 23,
    color: '#101828',
  },
  inputFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  helperText: {
    flex: 1,
    fontSize: 11,
    color: '#667085',
  },
  clearText: {
    color: '#DC2626',
    fontSize: 13,
    fontWeight: '700',
    paddingLeft: 10,
  },
  previewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    borderRadius: 20,
    paddingHorizontal: 11,
    paddingVertical: 5,
  },
  activeBadge: {
    backgroundColor: '#DCFCE7',
  },
  inactiveBadge: {
    backgroundColor: '#F2F4F7',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
  },
  activeText: {
    color: '#15803D',
  },
  inactiveText: {
    color: '#667085',
  },
  qrArea: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  qrWhiteCard: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EAECF0',
  },
  emptyQr: {
    width: 244,
    height: 244,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#D0D5DD',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyQrIcon: {
    fontSize: 54,
    color: '#98A2B3',
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#344054',
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 12,
    lineHeight: 18,
    color: '#667085',
    textAlign: 'center',
    marginTop: 8,
  },
  contentPreview: {
    backgroundColor: '#F2F4F7',
    borderRadius: 12,
    padding: 14,
  },
  contentLabel: {
    fontSize: 10,
    letterSpacing: 1,
    fontWeight: '800',
    color: '#667085',
    marginBottom: 8,
  },
  contentText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#344054',
  },
  footer: {
    textAlign: 'center',
    color: '#8492A8',
    fontSize: 12,
    marginTop: 24,
  },
});

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   ScrollView,
//   Linking,
//   Pressable,
// } from 'react-native';
// import QRCode from 'react-native-qrcode-svg';

// const Generator = () => {
//   const [input, setInput] = useState('');

//   const value = input.trim();

//   const isUrl = (text: string) => {
//     try {
//       const url = new URL(text);
//       return url.protocol === 'http:' || url.protocol === 'https:';
//     } catch {
//       return false;
//     }
//   };

//   const urlInput = isUrl(value);

//   const openWebsite = async () => {
//     if (urlInput) {
//       try {
//         await Linking.openURL(value);
//       } catch {
//         console.log('Unable to open website');
//       }
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Generate QR Code</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Enter text or website URL..."
//         value={input}
//         onChangeText={setInput}
//         multiline
//         autoCapitalize="none"
//         autoCorrect={false}
//         keyboardType="url"
//       />

//       {value.length > 0 ? (
//         <View style={styles.qrContainer}>
//           <QRCode
//             value={value}
//             size={220}
//             color="#000000"
//             backgroundColor="#FFFFFF"
//           />

//           {urlInput ? (
//             <>
//               <Text style={styles.previewLabel}>
//                 Website URL:
//               </Text>

//               <Pressable onPress={openWebsite}>
//                 <Text style={styles.link}>
//                   {value}
//                 </Text>
//               </Pressable>

//               <Text style={styles.hint}>
//                 Scan this QR code to open the website.
//               </Text>
//             </>
//           ) : (
//             <>
//               <Text style={styles.previewLabel}>
//                 QR Code Text:
//               </Text>

//               <Text selectable style={styles.preview}>
//                 {value}
//               </Text>
//             </>
//           )}
//         </View>
//       ) : (
//         <Text style={styles.hint}>
//           Enter text or a website URL to generate a QR code.
//         </Text>
//       )}
//     </ScrollView>
//   );
// };

// export default Generator;

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 24,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#FFFFFF',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 24,
//     color: '#222222',
//   },
//   input: {
//     width: '100%',
//     minHeight: 110,
//     borderWidth: 1,
//     borderColor: '#CCCCCC',
//     borderRadius: 12,
//     padding: 14,
//     fontSize: 16,
//     textAlignVertical: 'top',
//     marginBottom: 30,
//   },
//   qrContainer: {
//     alignItems: 'center',
//     padding: 20,
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: '#EEEEEE',
//     width: '100%',
//   },
//   previewLabel: {
//     marginTop: 20,
//     marginBottom: 8,
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   preview: {
//     textAlign: 'center',
//     color: '#444444',
//   },
//   link: {
//     color: '#2563EB',
//     textDecorationLine: 'underline',
//     textAlign: 'center',
//   },
//   hint: {
//     marginTop: 14,
//     color: '#777777',
//     fontSize: 14,
//     textAlign: 'center',
//   },
// });
