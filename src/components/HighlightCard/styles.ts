import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

interface IHighLightCardTypeProp {
  type: 'up' | 'down' | 'total';
}

export const Container = styled.View<IHighLightCardTypeProp>`
  background: ${({ theme, type }) => 
    type === 'total' ?
    theme.colors.secondary :
    theme.colors.shape
  };
  
  width: ${RFValue(300)}px;
  border-radius: 8px;
  padding:
    ${RFValue(20)}px
    ${RFValue(24)}px
    ${RFValue(32)}px
  ;

  margin-right: ${RFValue(16)}px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<IHighLightCardTypeProp>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text_dark};

  color: ${({ theme, type }) => 
    type === 'total' ?
    theme.colors.shape :
    theme.colors.text_dark
  };
`;

export const Icon = styled(Feather)<IHighLightCardTypeProp>`
  font-size: ${RFValue(40)}px;

  ${({ type }) =>  type === 'up' && css`
    color: ${({ theme }) => theme.colors.success};
  `}
  ${({ type }) =>  type === 'down' && css`
    color: ${({ theme }) => theme.colors.atention};
  `}
  ${({ type }) =>  type === 'total' && css`
    color: ${({ theme }) => theme.colors.shape};
  `}
`;

export const Footer = styled.View`

`;

export const Amount = styled.Text<IHighLightCardTypeProp>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;
  color: ${({ theme, type }) => 
    type === 'total' ?
    theme.colors.shape :
    theme.colors.text_dark
  };

  margin-top: ${RFValue(24)}px;
`;

export const LastTransaction = styled.Text<IHighLightCardTypeProp>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${({ theme, type }) => 
    type === 'total' ?
    theme.colors.shape :
    theme.colors.text
  };
`;
