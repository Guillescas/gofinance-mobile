import React, { ReactElement } from 'react';
import { SvgProps } from 'react-native-svg';

import * as S from './styles';

interface ISignInSocialButtonProps {
  title: string;
  svg: React.FC<SvgProps>;
  onPress: () => void;
}

const SignInSocialButton = ({
  title,
  svg: Svg,
  onPress,
  ...rest
}: ISignInSocialButtonProps): ReactElement => {
  return (
    <S.Container {...rest} onPress={onPress}>
      <S.ImageContainer>
        <Svg />
      </S.ImageContainer>

      <S.Title>{title}</S.Title>
    </S.Container>
  );
};

export default SignInSocialButton;
