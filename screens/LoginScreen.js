import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Button } from '@rneui/themed';
import { useDispatch } from 'react-redux';

import { signIn, signUp, subscribeToAuthChanges } from '../AuthManager';
import { addUser, subscribeToUserUpdates } from '../data/Actions';
import LogoImage from '../components/LogoImage.js'

function SigninBox({navigation}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  return (
    <View style={styles.loginContainer}>
      <Text style={styles.loginHeaderText}>Sign In</Text>
      <View style={styles.loginRow}>
        <View style={styles.loginLabelContainer}>
          <Text style={styles.loginLabelText}>Email: </Text>
        </View>
        <View style={styles.loginInputContainer}>
          <TextInput 
            style={styles.loginInputBox}
            placeholder='enter email address' 
            placeholderTextColor="#D0D0D0" 
            autoCapitalize='none'
            spellCheck={false}
            onChangeText={text=>setEmail(text)}
            value={email}
          />
        </View>
      </View>
      <View style={styles.loginRow}>
        <View style={styles.loginLabelContainer}>
          <Text style={styles.loginLabelText}>Password: </Text>
        </View>
        <View style={styles.loginInputContainer}>
          <TextInput 
            style={styles.loginInputBox}
            placeholder='enter password' 
            placeholderTextColor="#D0D0D0" 
            autoCapitalize='none'
            spellCheck={false}
            secureTextEntry={true}
            onChangeText={text=>setPassword(text)}
            value={password}
          />
        </View>
      </View>
      <View style={styles.loginRow}>
        <Button
        color="#FFD600"
        titleStyle={{
          color: "black",
        }}
          onPress={async () => {
            try {
              await signIn(email, password);
            } catch(error) {
              Alert.alert("Sign In Error", error.message,[{ text: "OK" }])
            }
          }}
        >
          Sign In
        </Button>  
      </View>
    </View>
  );
}


function SignupBox({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const dispatch = useDispatch();

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.loginHeaderText}>Sign Up</Text>
      <View style={styles.loginRow}>
        <View style={styles.loginLabelContainer}>
          <Text style={styles.loginLabelText}>Display Name: </Text>
        </View>
        <View style={styles.loginInputContainer}>
          <TextInput 
            style={styles.loginInputBox}
            placeholder='enter display name' 
            placeholderTextColor="#D0D0D0" 
            autoCapitalize='none'
            spellCheck={false}
            onChangeText={text=>setDisplayName(text)}
            value={displayName}
          />
        </View>
      </View>
      <View style={styles.loginRow}>
        <View style={styles.loginLabelContainer}>
          <Text style={styles.loginLabelText}>Email: </Text>
        </View>
        <View style={styles.loginInputContainer}>
          <TextInput 
            style={styles.loginInputBox}
            placeholder='enter email address' 
            placeholderTextColor="#D0D0D0" 
            autoCapitalize='none'
            spellCheck={false}
            onChangeText={text=>setEmail(text)}
            value={email}
          />
        </View>
      </View>

      <View style={styles.loginRow}>
        <View style={styles.loginLabelContainer}>
          <Text style={styles.loginLabelText}>Password: </Text>
        </View>
        <View style={styles.loginInputContainer}>
          <TextInput 
            style={styles.loginInputBox}
            placeholder='enter password' 
            placeholderTextColor="#D0D0D0" 
            autoCapitalize='none'
            spellCheck={false}
            secureTextEntry={true}
            onChangeText={text=>setPassword(text)}
            value={password}
          />
        </View>
      </View>
      <View style={styles.loginRow}>
        <Button
        color="#FFD600"
        titleStyle={{
          color: "black",
        }}
          onPress={async () => {
            try {
              const newUser = await signUp(displayName, email, password);
              // console.log('about to add', newUser);
              dispatch(addUser(newUser));
            } catch(error) {
              Alert.alert("Sign Up Error", error.message,[{ text: "OK" }])
            }
          }}
        >
          Sign Up
        </Button>  
      </View>
    </View>
  );
}

function LoginScreen({navigation}) {

  const [loginMode, setLoginMode] = useState(true);
  useEffect(()=> {
    subscribeToAuthChanges(navigation);
  }, []);
  
  return (
    <View style={styles.container}>
      <LogoImage />
      <View style={styles.bodyContainer}>
        <KeyboardAvoidingView behavior='padding' >
        {loginMode?
          <SigninBox navigation={navigation}/>
        :
          <SignupBox navigation={navigation}/>
        }
        </KeyboardAvoidingView>
        </View>
        <KeyboardAvoidingView behavior='position'>
      <View styles={styles.modeSwitchContainer}>
        { loginMode ? 
          <Text style={{color: 'white'}}>New user? {'  '}  
            <Text 
              onPress={()=>{setLoginMode(!loginMode)}} 
              style={styles.returningText}>Sign up</Text> 
            {'  '} instead!
          </Text>
        :
          <Text style={{color: 'white'}}>Returning user?  {'  '} 
            <Text 
              onPress={()=>{setLoginMode(!loginMode)}} 
              style={styles.returningText}>Sign in</Text> 
            {'  '} instead!
          </Text>
        }
      </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#0085D1',
    paddingTop: '30%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  bodyContainer: {
    flex: 0.55,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'tan'
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingTop: '15%',
    paddingBottom: '10%',
    //backgroundColor: 'lightblue'
  },
  loginHeader: {
    width: '100%',
    padding: '3%',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'tan'
  },
  loginHeaderText: {
    fontSize: 24,
    color: 'white',
    paddingBottom: '5%'
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    //backgroundColor: 'pink',
    padding: '3%'
  },
  loginLabelContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  loginLabelText: {
    fontSize: 18
  },
  loginInputContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%'
  },
  loginInputBox: {
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 6,
    fontSize: 18,
    padding: '4%'
  },
  modeSwitchContainer:{
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'blue'
  },
  loginButtonRow: {
    width: '100%',
    justifyContent: 'center', 
    alignItems: 'center'
  },
  listContainer: {
    flex: 0.7, 
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', 
  },

  returningText: {
    color: '#FFD600',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  
});

export default LoginScreen;

// import { useEffect, useState } from 'react';
// import { View, Text, TextInput, StyleSheet, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
// import { Button } from '@rneui/themed';
// import { useDispatch } from 'react-redux';

// import { signIn, signUp, subscribeToAuthChanges } from '../AuthManager';
// import { addUser, subscribeToUserUpdates } from '../data/Actions';
// import LogoImage from '../components/LogoImage.js'

// function SigninBox({navigation}) {

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
  
//   return (
//     <View style={styles.loginContainer}>
//       <Text style={styles.loginHeaderText}>Sign In</Text>
//       <View style={styles.loginRow}>
//         <View style={styles.loginLabelContainer}>
//           <Text style={styles.loginLabelText}>Email: </Text>
//         </View>
//         <View style={styles.loginInputContainer}>
//           <TextInput 
//             style={styles.loginInputBox}
//             placeholder='enter email address' 
//             autoCapitalize='none'
//             placeholderTextColor="#D0D0D0" 
//             spellCheck={false}
//             onChangeText={text=>setEmail(text)}
//             value={email}
//           />
//         </View>
//       </View>
//       <View style={styles.loginRow}>
//         <View style={styles.loginLabelContainer}>
//           <Text style={styles.loginLabelText}>Password: </Text>
//         </View>
//         <View style={styles.loginInputContainer}>
//           <TextInput 
//             style={styles.loginInputBox}
//             placeholder='enter password' 
//             autoCapitalize='none'
//             placeholderTextColor="#D0D0D0" 
//             spellCheck={false}
//             secureTextEntry={true}
//             onChangeText={text=>setPassword(text)}
//             value={password}
//           />
//         </View>
//       </View>
//       <View style={styles.loginRow}>
//         <Button
//           onPress={async () => {
//             try {
//               await signIn(email, password);
//             } catch(error) {
//               Alert.alert("Sign In Error", error.message,[{ text: "OK" }])
//             }
//           }}
//         >
//           Sign In
//         </Button>  
//       </View>
//     </View>
//   );
// }


// function SignupBox({navigation}) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [displayName, setDisplayName] = useState('');

//   const dispatch = useDispatch();

//   return (
//     <View style={styles.loginContainer}>
//       <Text style={styles.loginHeaderText}>Sign Up</Text>
//       <View style={styles.loginRow}>
//         <View style={styles.loginLabelContainer}>
//           <Text style={styles.loginLabelText}>Display Name: </Text>
//         </View>
//         <View style={styles.loginInputContainer}>
//           <TextInput 
//             style={styles.loginInputBox}
//             placeholder='enter display name' 
//             placeholderTextColor="#D0D0D0" 
//             autoCapitalize='none'
//             spellCheck={false}
//             onChangeText={text=>setDisplayName(text)}
//             value={displayName}
//           />
//         </View>
//       </View>
//       <View style={styles.loginRow}>
//         <View style={styles.loginLabelContainer}>
//           <Text style={styles.loginLabelText}>Email: </Text>
//         </View>
//         <View style={styles.loginInputContainer}>
//           <TextInput 
//             style={styles.loginInputBox}
//             placeholder='enter email address' 
//             placeholderTextColor="#D0D0D0" 
//             autoCapitalize='none'
//             spellCheck={false}
//             onChangeText={text=>setEmail(text)}
//             value={email}
//           />
//         </View>
//       </View>

//       <View style={styles.loginRow}>
//         <View style={styles.loginLabelContainer}>
//           <Text style={styles.loginLabelText}>Password: </Text>
//         </View>
//         <View style={styles.loginInputContainer}>
//           <TextInput 
//             style={styles.loginInputBox}
//             placeholder='enter password' 
//             autoCapitalize='none'
//             spellCheck={false}
//             secureTextEntry={true}
//             onChangeText={text=>setPassword(text)}
//             value={password}
//           />
//         </View>
//       </View>
//       <View style={styles.loginRow}>
//         <Button
//         //style= {{backgroundColor: '#FFD600'}}
//           onPress={async () => {
//             try {
//               const newUser = await signUp(displayName, email, password);
//               // console.log('about to add', newUser);
//               dispatch(addUser(newUser));
//             } catch(error) {
//               Alert.alert("Sign Up Error", error.message,[{ text: "OK" }])
//             }
//           }}
//         >
//           Sign Up
//         </Button>  
//       </View>
//     </View>
//   );
// }

// function LoginScreen({navigation}) {

//   const [loginMode, setLoginMode] = useState(true);
//   useEffect(()=> {
//     subscribeToAuthChanges(navigation);
//   }, []);
  
//   return (
//     <View style={styles.container}>
//     <LogoImage />
//     <View style={styles.bodyContainer}>
//         <KeyboardAvoidingView behavior='padding' >
//         {loginMode?
//           <SigninBox navigation={navigation}/>
//         :
//           <SignupBox navigation={navigation}/>
//         }
//         </KeyboardAvoidingView>
//         </View>
//         <KeyboardAvoidingView behavior='position'>
//       <View styles={styles.modeSwitchContainer}>
//         { loginMode ? 
//           <Text>New user? 
//             <Text 
//               onPress={()=>{setLoginMode(!loginMode)}} 
//               style={{color: 'white'}}> Sign up </Text> 
//             instead!
//           </Text>
//         :
//           <Text>Returning user? 
//             <Text 
//               onPress={()=>{setLoginMode(!loginMode)}} 
//               style={{color: 'white'}}> Sign in </Text> 
//             instead!
//           </Text>
//         }
//       </View>
//       </KeyboardAvoidingView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: '100%',
//     backgroundColor: '#084CB6',
//     paddingTop: '15%',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//   },
//   bodyContainer: {
//     // flex,
//     justifyContent: 'center',
//     alignItems: 'center',
//     //backgroundColor: 'tan'
//   },
//   loginContainer: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     width: '100%',
//     paddingTop: '30%',
//     paddingBottom: '10%',
//     //backgroundColor: 'lightblue'
//   },
//   loginHeader: {
//     width: '100%',
//     padding: '3%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     //backgroundColor: 'tan'
//   },
//   loginHeaderText: {
//     fontSize: 24,
//     color: 'white',
//     paddingBottom: '5%'
//   },
//   loginRow: {
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     width: '100%',
//     //backgroundColor: 'pink',
//     padding: '3%'
//   },
//   loginLabelContainer: {
//     flex: 0.3,
//     justifyContent: 'center',
//     alignItems: 'flex-end'
//   },
//   loginLabelText: {
//     fontSize: 18,
//     color: 'white',
//   },
//   loginInputContainer: {
//     flex: 0.5,
//     justifyContent: 'center',
//     alignItems: 'flex-start',
//     width: '100%'
//   },
//   loginInputBox: {
//     width: '100%',
//     borderColor: 'white',
//     borderWidth: 1,
//     borderRadius: 6,
//     fontSize: 18,
//     padding: '3%',
//     color: 'white',
//   },
//   modeSwitchContainer:{
//     flex: 0.2,
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//     backgroundColor: 'pink'
//   },
//   loginButtonRow: {
//     width: '100%',
//     justifyContent: 'center', 
//     alignItems: 'center'
//   },
//   listContainer: {
//     flex: 0.7, 
//     backgroundColor: '#ccc',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '100%', 
//   },

// });

// export default LoginScreen;