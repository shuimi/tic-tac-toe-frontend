import { Button, Container, Group, Title, Text } from '@mantine/core'
import { ReactNode } from "react";
import { useStyles } from "./error.styles";
import { useRouting } from "../../../../core/hooks/use-routing";

interface ErrorLayoutProps {
  statusCode: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  backButtonTitle?: ReactNode;
  backTo?: string;
}

export const ErrorLayout = ({
  statusCode,
  title = 'You have found a secret place.',
  description = `Unfortunately, this is only a ${statusCode} page. You may have mistyped the address, or the page has been moved to another URL.`,
  backButtonTitle,
  backTo = '/'
}: ErrorLayoutProps) => {

  const { classes } = useStyles()
  const routing = useRouting()

  const goHome = () => routing.go.to(backTo)

  return <Container className={classes.root}>
    <div className={classes.label}>{statusCode}</div>
    <Title className={classes.title}>{title}</Title>
    <Text color="dimmed" size="lg" align="center" className={classes.description}>
      {description}
    </Text>
    <Group position="center">
      {backButtonTitle && <Button variant='subtle' size='md' onClick={ goHome }>
        { backButtonTitle }
      </Button> }
    </Group>
  </Container>
}