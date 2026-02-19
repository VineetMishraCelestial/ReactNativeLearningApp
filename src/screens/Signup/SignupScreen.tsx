import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../app/navigation/NavigationTypes';
import { useSignupViewModel } from './SignupViewModel';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const { canSignup } = useSignupViewModel();

  const onSignup = (): void => {
    if (!canSignup()) return;
    navigation.replace('HomeTabs');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>

      <TouchableOpacity style={styles.button} onPress={onSignup}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
  button: { backgroundColor: '#007AFF', padding: 12, borderRadius: 8 },
  buttonText: { color: '#fff' },
  link: { marginTop: 16, color: '#007AFF' },
});
