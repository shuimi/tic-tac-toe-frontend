import { Box, Center } from "@mantine/core";
import { Mark } from "../../../data";
import { Exposure0, X } from "tabler-icons-react";

interface PlaygroundCellProps {
  mark: Mark,
  size?: number,
  onClick?: () => void
}

export const PlaygroundCell = (props: PlaygroundCellProps) => {

  const {mark, size = 50, onClick} = props

  return <Box
    onClick={onClick}
    sx={(theme) => ({
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      borderRadius: theme.radius.md,
      cursor: 'pointer',
      height: size,
      width: size,
      '&:hover': {
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
      },
    })}
  >
    <Center style={{ height: size, width: size }}>
      {mark == Mark.CROSS && <X size={size * 0.65} />}
      {mark == Mark.ZERO && <Exposure0 size={size * 0.65} />}
    </Center>
  </Box>
}