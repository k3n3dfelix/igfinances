import { Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard } from "../../components/TransactionCard";
import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  Icon,
  User,
  UserGreeting,
  UserName,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
} from "./styles";
import { getBottomSpace } from "react-native-iphone-x-helper";

export function Dashboard() {
  const data = [
    {
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: { name: "Venda", icon: "dollar-sign" },
      date: "28/05/2023",
    },
    {
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: { name: "Venda", icon: "dollar-sign" },
      date: "28/05/2023",
    },
    {
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: { name: "Venda", icon: "dollar-sign" },
      date: "28/05/2023",
    },
    {
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: { name: "Venda", icon: "dollar-sign" },
      date: "28/05/2023",
    },
  ];

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/6686227?v=4",
              }}
            />
            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>Kened</UserName>
            </User>
          </UserInfo>
          <Icon name="power"></Icon>
        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Ultima entrada dia 13 de abril"
          type="up"
        />
        <HighlightCard
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Ultimas saidas dia 13 de abril"
          type="down"
        />
        <HighlightCard
          title="Total"
          amount="R$ 16,141,00"
          lastTransaction="01 à 16 de abril"
          type="total"
        />
      </HighlightCards>
      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={data}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: getBottomSpace() }}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
