import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  background: ${({ theme }) => theme.colors.primary};

  width: 100%;
  height: ${RFValue(110)}px;

  align-items: center;
  justify-content: flex-end;
  padding-bottom: ${RFValue(16)}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.shape};
`;

export const Content = styled.ScrollView`
  flex: 1;
  padding: 0 24px;
`;

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const MonthSelector = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin: 20px 0 8px;
`;

export const MonthSelectorButton = styled(BorderlessButton)``;

export const MonthSelectorButtonButtonIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
`;

export const Month = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
