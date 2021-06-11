import React, { ReactElement, useState } from 'react';
import { Modal } from 'react-native';

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

const Register = (): ReactElement => {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
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

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />
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

        <Button title="Enviar" />
      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelectModal
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseCategorySelectModal}
        />
      </Modal>
    </Container>
  );
};

export default Register;
