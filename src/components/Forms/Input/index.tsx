import React, { ReactElement } from 'react';
import { TextInputProps } from 'react-native';
import { Controller, Control } from 'react-hook-form';

import { Container, InputSpace, Error } from './styles';

interface IInputProps extends TextInputProps {
  control: Control;
  name: string;
  error: string;
}

const Input = ({
  control,
  name,
  error,
  ...rest
}: IInputProps): ReactElement => {
  return (
    <Container>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <InputSpace onChangeText={onChange} value={value} {...rest} />
        )}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
};

export default Input;
