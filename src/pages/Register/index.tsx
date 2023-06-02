import React, { useState } from "react";
import { 
  Keyboard, 
  Modal, 
  TouchableWithoutFeedback,
  Alert
 } from "react-native";

 import * as Yup from 'yup';
 import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from "react-hook-form";

import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { Button } from "../../components/Forms/Button";
import { InputForm } from "../../components/Forms/InputForm";

import { CategorySelect } from "../CategorySelect";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from "./styles";

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  amount: Yup
  .number()
  .typeError('Informe m valor numérico')
  .positive('O valor não pode ser negativo')
  .required('O valor é obrigatório')
})

export function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const { control, handleSubmit, formState: { errors} } = useForm({
    resolver: yupResolver(schema)
  });

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }
  function handleTransactionTypeSelect(type: "up" | "down") {
    setTransactionType(type);
  }

  function handleRegister(form: FormData) {

    if(!transactionType)
      return Alert.alert('Selecione o tipo da transação');
    
    if(category.key === 'category')
      return Alert.alert('Selecione a categoria');

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    };
    console.log(data);
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              control={control}
              name="name"
              placeholder="Nomes"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && String(errors.name.message)}
            />
            <InputForm
              control={control}
              name="amount"
              placeholder="Preço"
              keyboardType="numeric"
              autoCapitalize="characters"
              error={errors.amount && String(errors.amount.message)}
            />
            <TransactionsTypes>
              <TransactionTypeButton
                type="up"
                title="Income"
                isActive={transactionType === "up"}
                onPress={() => handleTransactionTypeSelect("up")}
              />
              <TransactionTypeButton
                type="down"
                title="Outcome"
                isActive={transactionType === "down"}
                onPress={() => handleTransactionTypeSelect("down")}
              />
            </TransactionsTypes>
            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>

          <Button
            title="Enviar"
            onPress={handleSubmit(handleRegister)}
          ></Button>
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
