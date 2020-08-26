import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, Button, ImageBackground } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AuthContext from "./components/context"
import Signup from './components/signup'
import Login from "./components/login"
import Home from './components/usershome'
import Volhome from './components/volsHome'
import Sendmessage from "./components/sendSmS"
import Logout from "./components/headerButton"

const Stack = createStackNavigator()

export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,

          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.response.token,
            role: action.response.role,
            id: action.response.id,
            exist: true,
            isValid: true
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            User: null,
            exist: true,
            isValid: true
          };
        case 'No-User':
          return {
            ...prevState,
            exist: action.response.exist

          }
        case 'LogIn-Fail':
          return {
            ...prevState,
            isValid: action.response.isValid

          }
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      role: "",
      id: "",
      exist: true,
      isValid: true
    }
  );

  React.useEffect(() => {

    const restoring = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }

      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    restoring();
    
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {

        try {
          let result = await fetch(`https://covid-volunteers.herokuapp.com/login`, {
            method: 'POST',
            headers: {

              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)


          })
          let res = await result.json()
          console.log(res);
          if (res.msg === "User doesn't exist") {
            await dispatch({ type: 'No-User', response: { exist: false } });
            console.log("user dosent exist");
          }
          else if (res.msg === "All fields are required") {

            await dispatch({ type: 'LogIn-Fail', response: { isValid: false } });

          }
          else {
            await AsyncStorage.setItem("userToken", res.token)
            await dispatch({ type: 'SIGN_IN', response: { token: res.token, role: res.user.role, id: res.user.id } });
          }
        } catch (e) {
          console.log(e);
        }


      },


      signOut: async () => {
        try {
          dispatch({ type: 'SIGN_OUT' });

        }
        catch (e) {
          console.log(e);
        }

      },


    }),
    []
  );


  return (


    <AuthContext.Provider value={{ ...authContext, id: state.id, token: state.userToken, exist: state.exist, isValid: state.isValid }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: 'purple',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}>
          {state.userToken === null ? (
            <>
              <Stack.Screen name="login" component={Login} options={{ title: 'Log-In' }} />
              <Stack.Screen name="signup" component={Signup} options={{ title: 'Sign_Up' }} />
            </>
          ) : (
              <>
                {
                  state.role === "User" ? (
                    <>
                      <Stack.Screen name="home" component={Home} options={{
                        title: 'My home',
                        headerRight: () => <Logout />
                      }}
                      />
                      <Stack.Screen name="message" component={Sendmessage} options={{ title: 'Messages' }} />
                    </>
                  ) : (
                      <>
                        <Stack.Screen name="hi" component={Volhome} options={{
                          title: 'HI-Volunteer',
                          headerRight: () => <Logout />
                        }} />
                      </>
                    )
                }
              </>
            )

          }

        </Stack.Navigator>


      </NavigationContainer>
    </AuthContext.Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
