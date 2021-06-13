import React, { ReactElement } from 'react';
import { SvgProps } from 'react-native-svg';

import * as S from './styles';

interface ISignInSocialButtonProps {
  title: string;
  svg: React.FC<SvgProps>;
}

const SignInSocialButton = ({
  title,
  svg: Svg,
  ...rest
}: ISignInSocialButtonProps): ReactElement => {
  return (
    <S.Container {...rest}>
      <S.ImageContainer>
        <Svg />
      </S.ImageContainer>

      <S.Title>{title}</S.Title>
    </S.Container>
  );
};

export default SignInSocialButton;
