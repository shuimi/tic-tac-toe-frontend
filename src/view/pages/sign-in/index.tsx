import React from "react";
import {
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useRouting } from "../../../core/hooks/use-routing";


function SignInPage () {

  const routing = useRouting()

  const onRegisterClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    routing.go.to('signup')
  }

  const onLoginClick = () => {

  }

  return <Container size={420} my={40}>
    <Title align='center'>
      Добро пожаловать!
    </Title>
    <Text color='dimmed' size='sm' align='center' mt={5}>
      Нет аккаунта?{' '}
      <Anchor<'a'> href='signup' size='sm' onClick={onRegisterClick}>
        Зарегистрироваться
      </Anchor>
    </Text>
    <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
      <TextInput label='Имя пользователя' placeholder='Ваш никнейм' required />
      <PasswordInput label='Пароль' placeholder='Ваш пароль' required mt='md' />
      <Button fullWidth mt='xl' onClick={onLoginClick}>
        Войти
      </Button>
    </Paper>
  </Container>
}

export default SignInPage;