import React, { ReactElement } from 'react';
import { TextInputProps } from 'react-native';

import { Container } from './styles';

type InputProps = TextInputProps;

const Input = ({ ...rest }: InputProps): ReactElement => {
  return <Container {...rest} />;
};

export default Input;
