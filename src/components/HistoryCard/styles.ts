import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface IContainerProps {
  color: string;
}

export const Container = styled.View<IContainerProps>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 14px 24px;
  margin-bottom: 10px;

  border-radius: 4px;
  border-left-width: 4px;
  border-left-color: ${({ color }) => color};

  background: ${({ theme }) => theme.colors.shape};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(15)}px;
`;

export const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(15)}px;
`;
