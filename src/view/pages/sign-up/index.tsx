import React from "react";
import {
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title
} from "@mantine/core";
import { useRouting } from "../../../core/hooks/use-routing";


function SignUpPage () {

  const routing = useRouting()

  const onRegisterClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    routing.go.root()
  }

  const onSignUpClick = () => {

  }

  return <Container size={420} my={40}>
    <Title align='center'>
      Регистрация
    </Title>
    <Text color='dimmed' size='sm' align='center' mt={5}>
      Уже зарегистрированы?{' '}
      <Anchor<'a'> href='signup' size='sm' onClick={onRegisterClick}>
        Войти
      </Anchor>
    </Text>
    <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
      <TextInput label='Имя' placeholder='Ваш никнейм' required mt='md' />
      <TextInput label='Имя пользователя' placeholder='Ваш никнейм' required mt='md' />
      <PasswordInput label='Пароль' placeholder='Ваш пароль' required mt='md' />
      <Button fullWidth mt='xl' onClick={onSignUpClick}>
        Зарегистрироваться
      </Button>
    </Paper>
  </Container>
}

export default SignUpPage;