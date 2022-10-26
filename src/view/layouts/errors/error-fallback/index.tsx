import { Button, Container, Group, Title, Text, ButtonProps, TextProps, TitleProps } from '@mantine/core'
import { ReactNode } from "react";
import { useStyles } from "./error.styles";

interface ErrorLayoutProps {
  title?: ReactNode;
  description?: ReactNode;
  buttonTitle?: ReactNode;
  onClick?: () => void;
  buttonProps?: ButtonProps;
  titleProps?: TitleProps;
  descriptionProps?: TextProps;
}

export const ErrorFallbackLayout = ({
  title = 'Template title',
  description = `Template description`,
  buttonTitle,
  onClick,
  buttonProps,
  titleProps,
  descriptionProps,
}: ErrorLayoutProps) => {

  const { classes } = useStyles()

  return <Container className={classes.root}>
    <Title className={classes.title} {...titleProps}>{title}</Title>
    <Text color="dimmed" size="lg" align="center" className={classes.description} {...descriptionProps}>
      {description}
    </Text>
    <Group position="center">
      {
        (buttonTitle || onClick) && <Button variant={'filled'} size="md" {...buttonProps} onClick={onClick}>
          {buttonTitle}
        </Button>
      }
    </Group>
  </Container>
}