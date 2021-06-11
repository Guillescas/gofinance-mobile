import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface ITransactionProps {
  type: 'positive' | 'negative';
}

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.shape};

  border-radius: 8px;

  padding: ${RFValue(12)}px ${RFValue(16)}px;
  margin-bottom: ${RFValue(16)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
`;

export const Amount = styled.Text<ITransactionProps>`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme, type }) =>
    type === 'positive' ? theme.colors.success : theme.colors.atention};

  margin-top: ${RFValue(2)}px;
`;

export const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: ${RFValue(16)}px;
`;

export const Category = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const CategoryName = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};

  margin-left: ${RFValue(4)}px;
`;

export const Date = styled.Text``;
