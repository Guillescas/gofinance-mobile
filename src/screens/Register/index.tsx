import React, { ReactElement, useState } from 'react';
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../../components/Forms/Button';
import CategorySelectButton from '../../components/Forms/CategorySelectButton';
import Input from '../../components/Forms/Input';
import TransactionTypeButton from '../../components/Forms/TransactionTypeButton';

import CategorySelectModal from '../CategorySelectModal';

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from './styles';

interface IRegisterTransactionFormData {
  name: string;
  price: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  price: Yup.number()
    .positive('O valor tem de ser positivo')
    .required('O preço é obrigatório'),
});

const Register = (): ReactElement => {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSelectTransactionType = (type: 'positive' | 'negative') => {
    setTransactionType(type);
  };

  const handleOpenCategorySelectModal = () => {
    setCategoryModalOpen(true);
  };

  const handleCloseCategorySelectModal = () => {
    setCategoryModalOpen(false);
  };

  const handleRegisterTransactionFormSubmit = async (
    formData: IRegisterTransactionFormData,
  ) => {
    const newTransactionData = {
      id: String(uuid.v4()),
      name: formData.name,
      price: formData.price,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };

    try {
      const storagedData = await AsyncStorage.getItem(
        '@gofinance:transactions',
      );
      await AsyncStorage.removeItem('@gofinance:transactions');

      const formattedStoragedData = storagedData
        ? JSON.parse(storagedData)
        : [];

      const updatedStorageData = [...formattedStoragedData, newTransactionData];
      await AsyncStorage.setItem(
        '@gofinance:transactions',
        JSON.stringify(updatedStorageData),
      );

      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria',
      });

      reset();

      navigation.navigate('Listagem');
    } catch (error) {
      Alert.alert('Erro inesperado. Não foi possível cadastrar a transação');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <Input
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              error={errors.name && errors.name.message}
            />
            <Input
              name="price"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.price && errors.price.message}
            />

            <TransactionTypes>
              <TransactionTypeButton
                type="up"
                title="Entrada"
                onPress={() => handleSelectTransactionType('positive')}
                isActive={transactionType === 'positive'}
              />
              <TransactionTypeButton
                type="down"
                title="Saída"
                onPress={() => handleSelectTransactionType('negative')}
                isActive={transactionType === 'negative'}
              />
            </TransactionTypes>

            <CategorySelectButton
              title={category.name}
              onPress={() => handleOpenCategorySelectModal()}
            />
          </Fields>

          <Button
            title="Enviar"
            onPress={handleSubmit(handleRegisterTransactionFormSubmit)}
          />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelectModal
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseCategorySelectModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Register;
