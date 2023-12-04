import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SocialWave from './src/components/socialwave/SocialWave';
import { AuthProvider } from './src/components/auth/AuthProvider';

export default function App() {
  return (
    <AuthProvider>
      <SocialWave></SocialWave>
    </AuthProvider>

  );
}