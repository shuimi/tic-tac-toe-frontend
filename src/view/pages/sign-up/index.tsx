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
import { useAuth } from "../../../data/hooks/http/auth.hook";
import { useForm } from "@mantine/form";
import { LoadingWrapper } from "../../layouts/loading-wrapper";


function SignUpPage () {

  const routing = useRouting()

  const {pending, register} = useAuth()

  const form = useForm({
    initialValues: {
      username: '',
      name: '',
      password: ''
    },
  })

  const onGoLoginClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    routing.go.root()
  }

  const onSignUpClick = () => {
    register(form.values, () => {
      form.setErrors({
        username: 'Имя уже занято'
      })
    })
  }

  return <Container size={420} my={40}>
    <LoadingWrapper loading={pending}>
      <form onSubmit={form.onSubmit(onSignUpClick)}>
        <Title align='center'>
          Регистрация
        </Title>
        <Text color='dimmed' size='sm' align='center' mt={5}>
          Уже зарегистрированы?{' '}
          <Anchor<'a'> href='signup' size='sm' onClick={onGoLoginClick}>
            Войти
          </Anchor>
        </Text>
        <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
          <TextInput
            {...form.getInputProps('name')}
            label='Имя'
            placeholder='Ваш никнейм'
            required
            mt='md'
          />
          <TextInput
            {...form.getInputProps('username')}
            label='Имя пользователя'
            placeholder='Ваш никнейм'
            required
            mt='md'
          />
          <PasswordInput
            {...form.getInputProps('password')}
            label='Пароль'
            placeholder='Ваш пароль'
            required
            mt='md'
          />
          <Button fullWidth mt='xl' type={'submit'}>
            Зарегистрироваться
          </Button>
        </Paper>
      </form>
    </LoadingWrapper>
  </Container>
}

export default SignUpPage;