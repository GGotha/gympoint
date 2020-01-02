import React from 'react';
import { Text, Image } from 'react-native';

import styles, { Container } from './styles';
import peso from '~/assets/peso.png';

export default function Header() {
  return (
    <Container>
      <Image source={peso} alt="logo" style={styles.image} />
      <Text style={styles.text}>Gympoint</Text>
    </Container>
  );
}
