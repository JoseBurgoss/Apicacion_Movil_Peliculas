import { StyleSheet, Text, View, Platform, KeyboardAvoidingView, Pressable, Image } from 'react-native';
import React, { useContext, useState } from 'react';
import CustomInput from '../shared/CustomInput';
import AuthContext from '../context/AuthContext';
import bg from '../assets/signup-bg.jpg';

export default function SignUpScreen({ navigation, route }) {
  const { setIsLoggedIn } = route.params;
  const { registerEmail, setRegisterEmail, registerPassword, setRegisterPassword, confirmPassword, setConfirmPassword, onRegister, onSignIn } = useContext(AuthContext);
  const [username, setUsername] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
    return re.test(password);
  };

  const createUserAccount = async () => {
    if (username.length < 3) {
      alert('El nombre de usuario debe tener al menos 3 caracteres');
      return;
    }
    if (!validateEmail(registerEmail)) {
      alert('El correo debe estar en un formato válido');
      return;
    }
    if (!validatePassword(registerPassword)) {
      alert('La contraseña debe tener al menos 8 caracteres, contener al menos una letra mayúscula, una letra minúscula y un número');
      console.log('Password validation failed:', registerPassword);
      return;
    }
    if (registerPassword !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    await onRegister(username, registerEmail, registerPassword);
    setIsLoggedIn(true); // Actualizar el estado de isLoggedIn a true
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.main}>
        <Image source={bg} style={styles.bg} />
        <Text style={styles.title}>Crear cuenta</Text>
        <CustomInput style={styles.input} value={username} setValue={setUsername} placeholder='Nombre de usuario' />
        <CustomInput style={styles.input} value={registerEmail} setValue={setRegisterEmail} placeholder='Correo electrónico' />
        <CustomInput style={styles.input} value={registerPassword} setValue={setRegisterPassword} placeholder='Contraseña' secureTextEntry={true} />
        <CustomInput style={styles.input} value={confirmPassword} setValue={setConfirmPassword} placeholder='Confirmar contraseña' secureTextEntry={true} />
        <Pressable style={styles.button} onPress={createUserAccount}>
          <Text style={styles.buttonText}>Crear cuenta</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'beige',
    padding: 20,
  },
  bg: {
    width: '60%',
    height: 200,
    marginTop: 50,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    textAlign: 'center',
    marginTop: 20,
    color: '#FFA500',
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%',
    borderRadius: 10,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 15,
    width: '80%',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});