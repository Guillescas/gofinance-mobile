import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;

  margin-bottom: ${RFValue(8)}px;
`;

export const InputSpace = styled(TextInput)`
  width: 100%;
  padding: 16px 18px;

  background: ${({ theme }) => theme.colors.shape};
  border-radius: ${RFValue(8)}px;

  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_dark};
`;

export const Error = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.atention};
  font-size: ${RFValue(14)}px;
`;
