import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface ICategoryProps {
  isActive: boolean;
}

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(110)}px;

  background: ${({ theme }) => theme.colors.primary};

  align-items: center;
  justify-content: flex-end;

  padding-bottom: ${RFValue(18)}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
`;

export const Category = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9,
})<ICategoryProps>`
  width: 100%;
  padding: ${RFValue(16)}px;

  flex-direction: row;
  align-items: center;

  background: ${({ isActive, theme }) =>
    isActive ? theme.colors.secondary_light : theme.colors.background};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  margin-right: ${RFValue(16)}px;
`;

export const CategoryName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
`;

export const Separator = styled.Text`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.colors.text};
`;

export const Footer = styled.View`
  width: 100%;
  padding: ${RFValue(24)}px;
`;
