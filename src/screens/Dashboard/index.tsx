import React, { ReactElement, useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import HighLightCard from '../../components/HighlightCard';
import {
  TransactionCard,
  ITransactionCardDataProps,
} from '../../components/TransactionCard';

import formatPrice from '../../utils/formatPrice';

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
  const [transactions, setTransactions] = useState<IDataListProps[]>([]);

  async function loadTransactions() {
    const transactionsFromStorage = await AsyncStorage.getItem(
      '@gofinance:transactions',
    );
    const parsedTransactionsFromStorage: IDataListProps[] =
      transactionsFromStorage ? JSON.parse(transactionsFromStorage) : [];

    const formattedTransactions: IDataListProps[] =
      parsedTransactionsFromStorage.map(transaction => {
        return {
          id: transaction.id,
          name: transaction.name,
          price: formatPrice(transaction.price),
          type: transaction.type,
          category: transaction.category,
          date: Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
          }).format(new Date(transaction.date)),
        };
      });

    setTransactions(formattedTransactions);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, []),
  );

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
              console.log('LogoutButtonPressed');
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
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </StylesContainer>
  );
};

export default Dashboard;
