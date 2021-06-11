import React, { ReactElement } from 'react';

import { Container, Category, Icon } from './styles';

interface ICategorySelectButtonProps {
  title: string;
  onPress: () => void;
}

const CategorySelectButton = ({
  title,
  onPress,
}: ICategorySelectButtonProps): ReactElement => {
  return (
    <Container onPress={onPress}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
};

export default CategorySelectButton;
