import { Text, StyleSheet, ActivityIndicator } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";

import { useTheme } from "styled-components";

import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";
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
  LogoutButton,
  LoadContainer,
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  );

  const theme = useTheme();

  // function getLastTransactionDate(collection: DataListProps[], type: 'positive' | 'negative'){

  //   const lastTransaction =
  //   Math.max.apply(Math,collection
  //     .filter(transaction => transaction.type === type)
  //     .map(transaction => new Date(transaction.date).getTime()));
  //    return Intl.DateTimeFormat("pt-BR", {
  //       day: "2-digit",
  //       month: "2-digit",
  //       year: "2-digit",
  //     }).format(new Date(lastTransaction));

  // }

  function getLastTransactionDate(
    collection: DataListProps[],
    type: "positive" | "negative"
  ) {
    const filteredTransactions = collection.filter(
      (transaction) => transaction.type === type
    );

    if (filteredTransactions.length === 0) {
      return "Nenhuma transação encontrada";
    }

    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        filteredTransactions.map((transaction) =>
          new Date(transaction.date).getTime()
        )
      )
    );
    return`${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', {month: 'long'})}`; 
  }

  async function loadTransactions() {
    const dataKey = "@igfinances:transactions";
    let transactions = [];
    try {
      const response = await AsyncStorage.getItem(dataKey);
      console.log("response", response);
      transactions = response ? JSON.parse(response) : [];
    } catch (error) {
      console.log("error", error);
    }

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        console.log("item.tamountype", item.amount);
        if (item.type === "positive") {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,
        };
      }
    );

    setTransactions(transactionsFormatted);

    const lastTransactionEntries = getLastTransactionDate(
      transactions,
      "positive"
    );
    const lastTransactionExpensives = getLastTransactionDate(
      transactions,
      "negative"
    );
    const totalInterval = `01 a ${lastTransactionExpensives}`;

    console.log("lastTransactionEntries", lastTransactionEntries);
    const total = entriesTotal - expensiveTotal;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: `Última entrada dia ${lastTransactionEntries}`,
      },
      expensives: {
        amount: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: `Última saída dia ${lastTransactionExpensives}` ,
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: totalInterval,
      },
    });

    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      try {
        loadTransactions();
      } catch (error) {
        console.log("erro", error);
      }
    }, [])
  );
  console.log("highlightData", highlightData);
  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator
            color={theme.colors.primary}
            size="large"
          ></ActivityIndicator>
        </LoadContainer>
      ) : (
        <>
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
              <LogoutButton onPress={() => {}}>
                <Icon name="power"></Icon>
              </LogoutButton>
            </UserWrapper>
          </Header>
          <HighlightCards>
            <HighlightCard
              title="Entradas"
              amount={highlightData.entries.amount}
              lastTransaction={highlightData.entries.lastTransaction}
              type="up"
            />
            <HighlightCard
              title="Saídas"
              amount={highlightData.expensives.amount}
              lastTransaction={highlightData.expensives.lastTransaction}
              type="down"
            />
            <HighlightCard
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransaction}
              type="total"
            />
          </HighlightCards>
          <Transactions>
            <Title>Listagem</Title>
            <TransactionList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
