import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import { useAuth } from './auth';
import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Chat: { chatId: string; name?: string; avatarUrl?: string } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          elevation: 8,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: -2 },
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#9ca3af',
      }}
    >
      <Tab.Screen
        name="Scraps"
        component={require('../screens/ScrapsScreen').default}
        options={{
          tabBarIcon: ({ focused }) => <Text style={{fontSize: 22}}>{focused ? '📝' : '🗃️'}</Text>,
          tabBarLabel: 'Scraps'
        }}
      />
      <Tab.Screen
        name="Story"
        component={require('../screens/StoryScreen').default}
        options={{
          tabBarIcon: ({ focused }) => <Text style={{fontSize: 22}}>{focused ? '📸' : '🖼️'}</Text>,
          tabBarLabel: 'Stories'
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <Text style={{fontSize: 22}}>{focused ? '💬' : '📬'}</Text>,
          tabBarLabel: 'Mensagens'
        }}
      />
      <Tab.Screen
        name="Profile"
        component={require('../screens/ProfileScreen').default}
        options={{
          tabBarIcon: ({ focused }) => <Text style={{fontSize: 22}}>{focused ? '👤' : '👥'}</Text>,
          tabBarLabel: 'Perfil'
        }}
      />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  const { isSignedIn } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isSignedIn ? (
          <>
            <Stack.Screen name="Auth" component={AuthStack} />
          </>
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="Chat" component={ChatScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}
