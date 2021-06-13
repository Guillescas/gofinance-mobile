import React, { ReactElement, useState } from 'react';

import { ActivityIndicator, Alert } from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import AppleIcon from '../../assets/apple-icon.svg';
import GoogleIcon from '../../assets/google-icon.svg';
import LogoIcon from '../../assets/logo.svg';

import SignInButton from '../../components/SignInSocialButton';

import { useAuth } from '../../hook/auth';

import * as S from './styles';

const SignIn = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(false);

  const { signInWithGoogle, signInWithApple } = useAuth();
  const theme = useTheme();

  const handleSignInWithGoogle = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Erro ao conectar com a conta Google.');
    }
  };

  const handleSignInWithApple = async () => {
    try {
      setIsLoading(true);
      await signInWithApple();
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Erro ao conectar com a conta Google.');
    }
  };

  return (
    <S.Container>
      <S.Header>
        <S.TitleWrapper>
          <LogoIcon width={RFValue(120)} height={RFValue(68)} />

          <S.Title>
            Controle suas {'\n'}finanças de forma {'\n'}muito simples
          </S.Title>
        </S.TitleWrapper>

        <S.SignInTitle>
          Faça seu login com {'\n'}uma das contas abaixo
        </S.SignInTitle>
      </S.Header>

      <S.Footer>
        <S.FooterWrapper>
          <SignInButton
            title="Entrar com Google"
            svg={GoogleIcon}
            onPress={handleSignInWithGoogle}
          />
          <SignInButton
            title="Entrar com Apple"
            svg={AppleIcon}
            onPress={handleSignInWithApple}
          />
        </S.FooterWrapper>

        {isLoading && (
          <ActivityIndicator color={theme.colors.shape} size="large" />
        )}
      </S.Footer>
    </S.Container>
  );
};

export default SignIn;
