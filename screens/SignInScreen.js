import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Pressable, Image } from 'react-native';
import bg from '../assets/login-img.jpg';
import { FontAwesome } from '@expo/vector-icons';
import CustomInput from '../shared/CustomInput';
import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function SignInScreen({ route, navigation }) {
  const { setIsLoggedIn } = route.params;
  const { onSignIn, setEmail, setPassword } = useContext(AuthContext);
  const [input, setInput] = useState('');
  const [password, setPasswordState] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!input || !password) {
      alert('Por favor ingrese el correo electrónico o nombre de usuario y la contraseña');
      return;
    }
    try {
      await onSignIn(input, password);
      setIsLoggedIn(true);
    } catch (err) {
      console.error(err);
      alert('Credenciales incorrectas');
      setIsLoggedIn(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.main}>
          <Image source={bg} style={styles.bg} />
          <Text style={styles.title}>CineManía</Text>
          <CustomInput style={styles.input} value={input} setValue={setInput} placeholder='Correo electrónico o nombre de usuario' />
          <CustomInput style={styles.input} value={password} setValue={setPasswordState} placeholder='Contraseña' secureTextEntry={true} />
          <Pressable style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </Pressable>
          <View style={styles.footer}>
            <Pressable onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.linkText}>Registrarse</Text>
            </Pressable>
            <View style={styles.separator} />
            <Pressable onPress={() => alert('Funcionalidad no implementada')}>
              <Text style={styles.linkText}>Olvidé mi contraseña</Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    marginTop: 75 
  },
  bg: {
    width: '60%',
    height: 200,
    marginTop: 130,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    textAlign: 'center',
    marginTop: 20,
    color: '#FFA500',
  },
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'beige',
    padding: 20,
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
  footer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  linkText: {
    color: '#FFA500',
    fontWeight: 'bold',
  },
  separator: {
    width: 20,
  },
});