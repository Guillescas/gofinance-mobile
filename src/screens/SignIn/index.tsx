import React, { ReactElement } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import AppleIcon from '../../assets/apple-icon.svg';
import GoogleIcon from '../../assets/google-icon.svg';
import LogoIcon from '../../assets/logo.svg';

import SignInButton from '../../components/SignInSocialButton';

import * as S from './styles';

const SignIn = (): ReactElement => {
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
          <SignInButton title="Entrar com Google" svg={GoogleIcon} />
          <SignInButton title="Entrar com Apple" svg={AppleIcon} />
        </S.FooterWrapper>
      </S.Footer>
    </S.Container>
  );
};

export default SignIn;
