/* eslint-disable import/no-duplicates */
import React, { ReactElement, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useTheme } from 'styled-components';

import { RFValue } from 'react-native-responsive-fontsize';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import HistoryCard from '../../components/HistoryCard';

import { categories } from '../../utils/categories';
import formatPrice from '../../utils/formatPrice';

import * as S from './styles';

export interface ITransactionData {
  id: string;
  type: 'positive' | 'negative';
  name: string;
  price: string;
  category: string;
  date: string;
}

interface ITotalOfCategoriesData {
  key: string;
  name: string;
  totalOfCategory: string;
  categoryColor: string;
  percent: number;
  formattedPercent: string;
  sumAllOutcomesOfCategory: number;
}

const Resume = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalOutcomeByCategories, setTotalOutcomeByCategories] = useState<
    ITotalOfCategoriesData[]
  >([]);

  const theme = useTheme();
  const bottomHeight = useBottomTabBarHeight();

  const handleChangeDate = (action: 'next' | 'prev') => {
    if (action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  };

  const loadData = async () => {
    setIsLoading(true);
    setTotalOutcomeByCategories([]);
    const transactionsFromStorage = await AsyncStorage.getItem(
      '@gofinance:transactions',
    );
    const parsedTransactionsFromStorage: ITransactionData[] =
      transactionsFromStorage ? JSON.parse(transactionsFromStorage) : [];

    const outcomes = parsedTransactionsFromStorage.filter(
      outcome =>
        outcome.type === 'negative' &&
        new Date(outcome.date).getMonth() === selectedDate.getMonth() &&
        new Date(outcome.date).getFullYear() === selectedDate.getFullYear(),
    );

    const totalOfOutcome = outcomes.reduce(
      (accumulator: number, outcome: ITransactionData) => {
        return accumulator + Number(outcome.price);
      },
      0,
    );

    const totalOutcomeOfCategory: ITotalOfCategoriesData[] = [];

    categories.forEach(category => {
      let sumAllOutcomesOfCategory = 0;

      outcomes.forEach(outcome => {
        if (outcome.category === category.key) {
          sumAllOutcomesOfCategory += Number(outcome.price);
        }
      });

      if (sumAllOutcomesOfCategory > 0) {
        const percent = (sumAllOutcomesOfCategory / totalOfOutcome) * 100;
        const formattedPercent = `${percent.toFixed(1)}%`;

        totalOutcomeOfCategory.push({
          key: category.key,
          categoryColor: category.color,
          name: category.name,
          totalOfCategory: formatPrice(sumAllOutcomesOfCategory),
          percent,
          formattedPercent,
          sumAllOutcomesOfCategory,
        });
      }
    });

    setTotalOutcomeByCategories(totalOutcomeOfCategory);
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate]),
  );

  return (
    <S.Container>
      <S.Header>
        <S.Title>Resumo</S.Title>
      </S.Header>

      {isLoading ? (
        <S.LoadingContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </S.LoadingContainer>
      ) : (
        <S.Content
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: bottomHeight,
          }}
        >
          <S.MonthSelector>
            <S.MonthSelectorButton onPress={() => handleChangeDate('prev')}>
              <S.MonthSelectorButtonButtonIcon name="chevron-left" />
            </S.MonthSelectorButton>

            <S.Month>
              {format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}
            </S.Month>

            <S.MonthSelectorButton onPress={() => handleChangeDate('next')}>
              <S.MonthSelectorButtonButtonIcon name="chevron-right" />
            </S.MonthSelectorButton>
          </S.MonthSelector>

          <S.ChartContainer>
            <VictoryPie
              data={totalOutcomeByCategories}
              colorScale={totalOutcomeByCategories.map(
                totalOutcomeByCategory => totalOutcomeByCategory.categoryColor,
              )}
              style={{
                labels: { fontSize: RFValue(16), fontWeight: 'bold' },
              }}
              x="formattedPercent"
              y="sumAllOutcomesOfCategory"
            />
          </S.ChartContainer>

          {totalOutcomeByCategories.map(totalOutcomeOfCategory => (
            <HistoryCard
              key={totalOutcomeOfCategory.key}
              color={totalOutcomeOfCategory.categoryColor}
              title={totalOutcomeOfCategory.name}
              amount={totalOutcomeOfCategory.totalOfCategory}
            />
          ))}
        </S.Content>
      )}
    </S.Container>
  );
};

export default Resume;
