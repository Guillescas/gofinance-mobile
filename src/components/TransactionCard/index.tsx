import React, { ReactElement } from 'react';
import { categories } from '../../utils/categories';

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from './styles';

export interface ITransactionCardDataProps {
  type: 'positive' | 'negative';
  name: string;
  price: string;
  category: string;
  date: string;
}

interface ITransactionCardProps {
  data: ITransactionCardDataProps;
}

export function TransactionCard({ data }: ITransactionCardProps): ReactElement {
  const category = categories.filter(item => item.key === data.category)[0];

  return (
    <Container>
      <Title>{data.name}</Title>

      <Amount type={data.type}>
        {data.type === 'negative' && '- '}
        {data.price}
      </Amount>

      <Footer>
        <Category>
          <Icon name={category.icon} />

          <CategoryName>{category.name}</CategoryName>
        </Category>

        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}
