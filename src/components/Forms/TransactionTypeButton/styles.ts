import { TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface IIconProps {
  type: 'up' | 'down';
}

interface IContainerProps {
  isActive: boolean;
  type: 'up' | 'down';
}

export const Container = styled(TouchableOpacity)<IContainerProps>`
  width: 48%;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme, isActive }) =>
    isActive ? 'transparent' : theme.colors.text};

  border-radius: ${RFValue(8)}px;

  padding: ${RFValue(16)}px;

  ${({ isActive, type }) =>
    isActive &&
    type === 'up' &&
    css`
      background: ${({ theme }) => theme.colors.success_light};
    `}
  ${({ isActive, type }) =>
    isActive &&
    type === 'down' &&
    css`
      background: ${({ theme }) => theme.colors.atention_light};
    `}
`;

export const Icon = styled(Feather)<IIconProps>`
  font-size: ${RFValue(14)}px;
  color: ${({ theme, type }) =>
    type === 'up' ? theme.colors.success : theme.colors.atention};

  margin-right: ${RFValue(12)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;
