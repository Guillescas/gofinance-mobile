import React, { ReactElement } from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Title } from './styles';

interface IButtonProps extends RectButtonProps {
  title: string;
  onPress: () => void;
}

export function Button({
  title,
  onPress,
  ...rest
}: IButtonProps): ReactElement {
  return (
    <Container onPress={onPress} activeOpacity={0.7} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
