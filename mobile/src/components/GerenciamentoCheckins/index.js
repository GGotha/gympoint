import React, { useEffect, useMemo } from 'react';
import { View, Text } from 'react-native';

import { Container, Time, CheckinText } from './styles';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

export default function GerenciamentoCheckins(props) {
  console.tron.log('date', props.data.createdAt);

  const formattedDate = useMemo(() => {
    return formatRelative(parseISO(props.data.createdAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [props.data.createdAt]);

  useEffect(() => {
    console.tron.log('prozada de lei:', props.data.createdAt);
  }, []);
  // console.log('prozada de lei:', props);

  return (
    <Container>
      <CheckinText>Check-in #{props.data.id}</CheckinText>
      <Time>{formattedDate}</Time>
    </Container>
  );
}
