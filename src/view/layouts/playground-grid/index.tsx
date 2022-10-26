import { Playground } from "../../../data";
import { Box, createStyles, DefaultProps, MantineColor, Paper, Selectors, SimpleGrid } from "@mantine/core";
import { PlaygroundCell } from "../../components";
import { useId } from "react";

interface PlaygroundGridProps extends Playground {
  onCellClick?: (position: number) => void,
  sellSize?: number,
  spacing?: number,
  color?: MantineColor,
  withPadding?: boolean,
  disabled?: boolean,
}

export const PlaygroundGridLayout = (props: PlaygroundGridProps) => {

  const {
    rank,
    data,
    sellSize = 120,
    spacing = 5,
    withPadding = false,
    onCellClick,
    color,
    disabled = false,
    ...others
  } = props

  const playgroundId = useId()

  return <Paper
    sx={(theme) => ({
      backgroundColor: theme.colorScheme == 'dark' ? theme.colors.dark[8] : theme.colors.gray[3]
    })}
    radius={'md'}
    p={withPadding ? 'xs' : 0}
    {...others}
  >
    <SimpleGrid
      cols={rank}
      spacing={spacing}
    >
      {
        data.map((cell) => <PlaygroundCell
          disabled={disabled}
            key={`${playgroundId}/${cell.position}`}
            mark={cell.mark}
            size={sellSize}
            onClick={() => {
              onCellClick && onCellClick(cell.position)
            }}
          />
        )
      }
    </SimpleGrid>
  </Paper>
}