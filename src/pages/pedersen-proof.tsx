/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, Text, Share, Alert, StyleSheet } from 'react-native';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/Button';
import Input from '../components/Input';

// Get the circuit to load for the proof generation
// Feel free to replace this with your own circuit
export default function PedersenProof() {
  const [proofAndInputs, setProofAndInputs] = useState('');
  const [proof, setProof] = useState('');
  const [vkey, setVkey] = useState('');
  const [generatingProof, setGeneratingProof] = useState(false);
  const [verifyingProof, setVerifyingProof] = useState(false);
  const [inputs, setInputs] = useState({
    a: '',
    b: ''
  });
  const [provingTime, setProvingTime] = useState(0);
  const [circuitId, setCircuitId] = useState<string>();
}

// return (
//   <MainLayout canGoBack={true}>
//     <Text
//       style={{
//         fontSize: 16,
//         fontWeight: '500',
//         marginBottom: 20,
//         textAlign: 'center',
//         color: '#6B7280'
//       }}
//     >
//       Prove that you know the pedersen hash of two numbers without revealing
//       them{'\n'}(500 rounds ~ 150k constraints)
//     </Text>
//     <Text style={styles.sectionTitle}>Numbers</Text>
//     <View
//       style={{
//         flexDirection: 'row',
//         gap: 5,
//         alignItems: 'center',
//         marginBottom: 20
//       }}
//     >
//       <Input
//         value={inputs.a}
//         style={{
//           flex: 1
//         }}
//         placeholder="1st number"
//         onChangeText={val => {
//           setInputs(prev => ({ ...prev, a: val }));
//         }}
//       />
//       <Text>&</Text>
//       <Input
//         style={{
//           flex: 1
//         }}
//         value={inputs.b}
//         placeholder="2nd number"
//         onChangeText={val => {
//           setInputs(prev => ({ ...prev, b: val }));
//         }}
//       />
//     </View>
//     {/* {proof && (
//       <>
//         <Text style={styles.sectionTitle}>Proof</Text>
//         <Text
//           style={{
//             fontSize: 12,
//             fontWeight: '400',
//             textAlign: 'center',
//             color: '#6B7280',
//             marginBottom: 20,
//           }}>
//           {formatProof(proof)}
//         </Text>
//       </>
//     )} */}
//     {proof && (
//       <>
//         <Text style={styles.sectionTitle}>Proving time</Text>
//         <Text
//           style={{
//             fontSize: 12,
//             fontWeight: '400',
//             textAlign: 'center',
//             color: '#6B7280',
//             marginBottom: 20
//           }}
//         >
//           {provingTime} ms
//         </Text>
//       </>
//     )}
//     {!proof && (
//       // The button is disabled as long as the circuit has not been setup
//       // i.e. the circuitId is not defined
//       <Button
//         disabled={generatingProof || !circuitId}
//         onPress={() => {
//           onGenerateProof();
//         }}
//       >
//         <Text
//           style={{
//             color: 'white',
//             fontWeight: '700'
//           }}
//         >
//           {generatingProof ? 'Proving...' : 'Generate a proof'}
//         </Text>
//       </Button>
//     )}
//     {proof && (
//       <View
//         style={{
//           gap: 10
//         }}
//       >
//         <Button
//           disabled={verifyingProof}
//           onPress={() => {
//             onVerifyProof();
//           }}
//         >
//           <Text
//             style={{
//               color: 'white',
//               fontWeight: '700'
//             }}
//           >
//             {verifyingProof ? 'Verifying...' : 'Verify the proof'}
//           </Text>
//         </Button>
//         <Button
//           theme="secondary"
//           onPress={() => {
//             Share.share({
//               title: 'My Noir React Native proof',
//               message: proof
//             });
//           }}
//         >
//           <Text
//             style={{
//               color: '#151628',
//               fontWeight: '700'
//             }}
//           >
//             Share my proof
//           </Text>
//         </Button>
//       </View>
//     )}
//   </MainLayout>
// );
// }

// const styles = StyleSheet.create({
//   sectionTitle: {
//     textAlign: 'center',
//     fontWeight: '700',
//     color: '#151628',
//     fontSize: 16,
//     marginBottom: 5
//   }
// });
