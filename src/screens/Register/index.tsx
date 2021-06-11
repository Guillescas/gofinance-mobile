import React, { ReactElement, useState } from 'react';
import { Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSelectTransactionType = (type: 'up' | 'down') => {
    setTransactionType(type);
  };

  const handleOpenCategorySelectModal = () => {
    setCategoryModalOpen(true);
  };

  const handleCloseCategorySelectModal = () => {
    setCategoryModalOpen(false);
  };

  const handleRegisterTransactionFormSubmit = (
    formData: IRegisterTransactionFormData,
  ) => {
    const data = {
      name: formData.name,
      price: formData.price,
      transactionType,
      category: category.key,
    };
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
              error={errors.name && errors.price.message}
            />

            <TransactionTypes>
              <TransactionTypeButton
                type="up"
                title="Entrada"
                onPress={() => handleSelectTransactionType('up')}
                isActive={transactionType === 'up'}
              />
              <TransactionTypeButton
                type="down"
                title="Saída"
                onPress={() => handleSelectTransactionType('down')}
                isActive={transactionType === 'down'}
              />
            </TransactionTypes>

            <CategorySelectButton
              title={category.name}
              onPress={() => handleOpenCategorySelectModal()}
            />
          </Fields>

          <Button
            onPress={handleSubmit(handleRegisterTransactionFormSubmit)}
            title="Enviar"
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
