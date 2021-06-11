import React, { ReactElement } from 'react';
import { FlatList } from 'react-native-gesture-handler';

import { Button } from '../../components/Forms/Button';

import { categories } from '../../utils/categories';

import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  CategoryName,
  Separator,
  Footer,
} from './styles';

interface ICategoryProps {
  key: string;
  name: string;
}

interface ICategorySelectModalProps {
  category: ICategoryProps;
  setCategory: (category: ICategoryProps) => void;
  closeSelectCategory: () => void;
}

const CategorySelectModal = ({
  category,
  setCategory,
  closeSelectCategory,
}: ICategorySelectModalProps): ReactElement => {
  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <FlatList
        data={categories}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <Category
            isActive={category.key === item.key}
            onPress={() => setCategory(item)}
          >
            <Icon name={item.icon} />
            <CategoryName>{item.name}</CategoryName>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <Button onPress={closeSelectCategory} title="Selecionar" />
      </Footer>
    </Container>
  );
};

export default CategorySelectModal;
