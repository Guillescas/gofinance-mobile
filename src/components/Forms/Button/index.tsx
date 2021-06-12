import React, { ReactElement } from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Title } from './styles';

interface IButtonProps extends TouchableOpacityProps {
  title: string;
}

export function Button({ title, ...rest }: IButtonProps): ReactElement {
  return (
    <Container activeOpacity={0.8} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
