import React, { ReactElement } from 'react';

import HighLightCard from '../../components/HighlightCard';
import {
  TransactionCard,
  ITransactionCardDataProps,
} from '../../components/TransactionCard';

import {
  StylesContainer,
  Header,
  UserWrapper,
  UserInfo,
  LogoutButton,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighLightCards,
  Transactions,
  Title,
  TransactionsList,
} from './styles';

export interface IDataListProps extends ITransactionCardDataProps {
  id: string;
}

const Dashboard = (): ReactElement => {
  const transaction: IDataListProps[] = [
    {
      id: '1',
      type: 'positive',
      title: 'Desenvolvimento de App',
      amount: 'R$ 4.000,00',
      category: {
        name: 'Job',
        icon: 'dollar-sign',
      },
      date: '13/04/2021',
    },
    {
      id: '2',
      type: 'negative',
      title: 'Comida',
      amount: 'R$ 300,00',
      category: {
        name: 'Alimentação',
        icon: 'dollar-sign',
      },
      date: '13/04/2021',
    },
    {
      id: '3',
      type: 'negative',
      title: 'Comida',
      amount: 'R$ 300,00',
      category: {
        name: 'Alimentação',
        icon: 'dollar-sign',
      },
      date: '13/04/2021',
    },
  ];

  return (
    <StylesContainer>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: 'https://avatars.githubusercontent.com/u/59893752?v=4',
              }}
            />

            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>Guilherme</UserName>
            </User>
          </UserInfo>

          <LogoutButton
            onPress={() => {
              console.log('oi');
            }}
          >
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighLightCards>
        <HighLightCard
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
          type="up"
        />
        <HighLightCard
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 13 de abril"
          type="down"
        />
        <HighLightCard
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="Última entrada dia 13 de abril"
          type="total"
        />
      </HighLightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionsList
          data={transaction}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </StylesContainer>
  );
};

export default Dashboard;
