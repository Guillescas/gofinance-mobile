import React, { ReactElement } from 'react';

import * as S from './styles';

interface IHistoryCardProps {
  color: string;
  title: string;
  amount: string;
}

const HistoryCard = ({
  color,
  title,
  amount,
}: IHistoryCardProps): ReactElement => {
  return (
    <S.Container color={color}>
      <S.Title>{title}</S.Title>
      <S.Amount>{amount}</S.Amount>
    </S.Container>
  );
};

export default HistoryCard;
