import React from "react";
import {
  Anchor,
  Button,
  Container, LoadingOverlay,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useAuth } from "../../../data/hooks/http/auth.hook";
import { useForm } from "@mantine/form";
import { LoadingWrapper } from "../../layouts/loading-wrapper";


function SignInPage () {

  const {pending, login} = useAuth()

  const form = useForm({
    initialValues: {
      login: '',
      password: ''
    },
  })

  const onLoginClick = () => {
    login(form.values, () => {
      form.setErrors({
        password: 'Неверный пароль'
      })
    })
  }

  return <Container size={420} my={40}>
    <Title align='center'>
      Добро пожаловать!
    </Title>
    <Text color='dimmed' size='sm' align='center' mt={5}>
      Нет аккаунта?{' '}
      <Anchor<'a'> href='signup' size='sm'>
        Зарегистрироваться
      </Anchor>
    </Text>
    <LoadingWrapper loading={pending}>
      <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
        <form onSubmit={form.onSubmit(onLoginClick)}>
          <TextInput
            {...form.getInputProps('login')}
            label='Имя пользователя'
            placeholder='Ваш никнейм'
            required
          />
          <PasswordInput
            {...form.getInputProps('password')}
            label='Пароль'
            placeholder='Ваш пароль'
            required
            mt='md'
          />
          <Button fullWidth mt='xl' type={'submit'}>
            Войти
          </Button>
        </form>
      </Paper>
    </LoadingWrapper>
  </Container>
}

export default SignInPage;