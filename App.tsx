import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import React, { ReactElement } from 'react';
import { StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { Routes } from './src/routes/index';

import theme from './src/global/styles/theme';

import { AuthProvider, useAuth } from './src/hook/auth';

export default function App(): ReactElement {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const { isUserDataLoading } = useAuth();

  if (!fontsLoaded || isUserDataLoading) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}
