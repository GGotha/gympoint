import React, { useState, useEffect, useMemo } from 'react';

import { Container, Time, CheckinText } from './styles';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

export default function GerenciamentoCheckins(props) {
  const index = props.index + 1;

  const formattedDate = useMemo(() => {
    return formatRelative(parseISO(props.data.createdAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [props.data.createdAt]);

  return (
    <Container>
      <CheckinText>Check-in #{index}</CheckinText>
      <Time>{formattedDate}</Time>
    </Container>
  );
}
