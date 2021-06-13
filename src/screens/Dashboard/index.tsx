import React, { ReactElement, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';

import { useTheme } from 'styled-components';
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
  LoadingContainer,
} from './styles';

interface IHighLightDataProps {
  amount: string;
  lastTransaction: string;
}

interface IHighLightDataData {
  income: IHighLightDataProps;
  outcome: IHighLightDataProps;
  balance: IHighLightDataProps;
}

export interface IDataListProps extends ITransactionCardDataProps {
  id: string;
}

const Dashboard = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(true);

  const [transactions, setTransactions] = useState<IDataListProps[]>([]);
  const [highLightData, setHighLightData] = useState<IHighLightDataData>(
    {} as IHighLightDataData,
  );

  const theme = useTheme();

  let totalIncome = 0;
  let totalOutcome = 0;

  function getLastTransactionDate(
    collection: IDataListProps[],
    type: 'positive' | 'negative',
  ) {
    const lastTransaction = new Date(
      // eslint-disable-next-line prefer-spread
      Math.max.apply(
        Math,
        collection
          .filter(transaction => transaction.type === type)
          .map(transaction => new Date(transaction.date).getTime()),
      ),
    );

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
      'pt-BR',
      { month: 'long' },
    )}`;
  }

  async function loadTransactions() {
    totalIncome = 0;
    totalOutcome = 0;

    const transactionsFromStorage = await AsyncStorage.getItem(
      '@gofinance:transactions',
    );
    const parsedTransactionsFromStorage: IDataListProps[] =
      transactionsFromStorage ? JSON.parse(transactionsFromStorage) : [];

    const formattedTransactions: IDataListProps[] =
      parsedTransactionsFromStorage.map(transaction => {
        if (transaction.type === 'positive') {
          totalIncome += Number(transaction.price);
        }
        if (transaction.type === 'negative') {
          totalOutcome += Number(transaction.price);
        }

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

    const total = totalIncome - totalOutcome;

    const lastIncomeTransaction = getLastTransactionDate(
      parsedTransactionsFromStorage,
      'positive',
    );
    const lastOutcomeTransaction = getLastTransactionDate(
      parsedTransactionsFromStorage,
      'negative',
    );
    const intervalOfIncomeAndOutcomeTransactions = `01 à ${lastOutcomeTransaction}`;

    setHighLightData({
      income: {
        amount: formatPrice(totalIncome),
        lastTransaction: lastIncomeTransaction,
      },
      outcome: {
        amount: formatPrice(totalOutcome),
        lastTransaction: lastOutcomeTransaction,
      },
      balance: {
        amount: formatPrice(total),
        lastTransaction: intervalOfIncomeAndOutcomeTransactions,
      },
    });

    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, []),
  );

  return (
    <StylesContainer>
      {isLoading ? (
        <LoadingContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadingContainer>
      ) : (
        <>
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
                  // eslint-disable-next-line no-console
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
              amount={highLightData.income.amount}
              lastTransaction={`Última entrada dia ${highLightData.income.lastTransaction}`}
              type="up"
            />
            <HighLightCard
              title="Saídas"
              amount={highLightData.outcome.amount}
              lastTransaction={`Última saída dia ${highLightData.income.lastTransaction}`}
              type="down"
            />
            <HighLightCard
              title="Total"
              amount={highLightData.balance.amount}
              lastTransaction={highLightData.balance.lastTransaction}
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
        </>
      )}
    </StylesContainer>
  );
};

export default Dashboard;
